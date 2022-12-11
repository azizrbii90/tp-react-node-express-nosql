const userService = require('./service')
const utils = require('../../utils')
const mongoose = require('mongoose')

const validatePassword = (password) => {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/
    return re.test(password);
}

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email);
}

const validation = async (user) => {

    if(user.email === '') {
        return 'Please provide an email address'
    
    } else if (!validateEmail(user.email)) {
        return 'Please provide a valid email address'
    
    } else {
        const data = await userService.get(user.email)
        if(data) {
            return 'Email Already Exist'

        } else if(user.password === '') {
            return 'Please Provide a Password'

        } else if (!validatePassword(user.password)) {
            return 'Please provide a valid password : length > 8 */+:! [A-Z] [a-z] [0-9]'
            
        }
        else if(user.password!==user.confirmPassword) {
            return 'Passwords do not Match'
        
        } else {
            return 'correct'
        }
    }
}

module.exports = {

    register: async (req, res) => {

        let createdUser;
        try {   
                const user = req.body   
                const status = await validation(user)
                
                if(status!=='correct') 
                    throw new Error(status)
                
                else {
                    user.password = await utils.authUtils.authUtils.argon2Hash(user.password)
                    createdUser = await userService.create(user)
                    const token = await utils.authUtils.authUtils.generateToken({ id : createdUser._id, email: createdUser.email, role: createdUser.role}, '1d')
                    
                    await utils.mailService.verificationEmail({
                            email: createdUser.email,
                            link: `${req.protocol}://${req.get('host')}/api/users/verify-account?email=${createdUser.email}&token=${token}`,
                            type: 'register'
                    })
                    res.status(201)
                    res.json({success: true, user: createdUser})        
                }
            
            } catch (err) {
                console.log(err)
                if(err.message == 'Error Sending Mail') 
                    await userService.delete(createdUser._id.toString())
                
                res.status(500).json({ success: false, error: err.message})
            }
    },

    verifyAccount: async (req, res) => {

        try {
            const email = req.query.email
            const token = req.query.token
            const valid = await utils.authUtils.authUtils.verifyToken(token)

            if(!valid) {
                await userService.delete(email)
                res.status(500).json({success: false, error: 'link is expired'})
            }

            const user = await userService.get(email)
            
            if(user.isVerified) {
                res.status(200).json({success: false, error: 'email already verified'})
            }

            user.isVerified = true
            await userService.update(user)

            await utils.mailService.welcomeEmail({email: user.email})
            res.status(200) 
            res.send("<h1>Email "+user.email+" is been Successfully verified" + '<script> setTimeout(function () {  window.location = "http://localhost:3000/"; }, 2000)</script>')
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, error: err })
        }
    },

    login: async (req, res) => {
        try {
            let user = await userService.get(req.body.email)
            if(!user) {
                res.status(500).json({success: false, message: 'wrong data'})
            } else {
                const valid = await utils.authUtils.authUtils.comparePassword(user.password, req.body.password)

                if(!valid) {
                    res.status(500).json({success: false, message: 'wrong data'})
                
                } else if(!user.isVerified) {
                    res.status(500).json({success: false, message: 'user is not verified'})
                
                } else {
                    const token = await utils.authUtils.authUtils.generateToken({id: user._id, email: user.email}, '1d')
                    res.status(200)
                    res.json({ success: true, user: user, token: token })
                }
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err })
        }
    },

    getInfoFromToken: async (req, res) => {

        try {
            const user = await userService.get(req.userEmail)
            if(!user) {
                res.status(500).json({ success: false, message: 'a problem was occured'})
            } else {
                res.status(200).json({ success: true, user: user })
            }
        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    },

    recoverPasswordRequest: async (req, res) => {
        try {
            const email = req.params.email
         
            const user = await userService.get(email)

            if(!user)
                res.status(500).json({success: false, message: 'wrong data'})

            else {
                const token = await utils.authUtils.authUtils.generateToken({ id: user._id, email: user.email}, '1d');
            try {
                await utils.mailService.verificationEmail({
                    email: user.email,
                    link: `${req.protocol}://${req.get('host')}/api/users/recover-password?email=${user.email}&token=${token}`,
                    type: 'recover-password'
                })
            } catch (e) {
                res.status(500);
                res.json({ success: false, message: 'Error Sending Email' });
            }

                res.status(200);
                res.json({ success:true, message:"Check your email to recover your password!" })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err })
        }
    },

    verifyRecoverPasswordRequest: async (req, res) => {

        try {
            const email = req.query.email
            const token = req.query.token
            const user = await userService.get(email)
            const validity = await utils.authUtils.authUtils.verifyToken(token)
            if(!validity) {
                res.status(500).json({success: false, message: 'link is expired'})
            }
            res.status(200);
            res.cookie("email", user.email, { httpOnly: false });
            res.send("<h1>You will be redirected to the recovery page</h1>" + '<script>         setTimeout(function () {  window.location = "http://localhost:3000/recover-password"; }, 2000)</script>')
        } catch (error) {
            res.status(500).json({success: false, message: 'link is expired'})

        }
    },

    recoverPassword: async (req, res) => {

        try {

            const { email, password, confirmPassword, cookie_email } = req.body;
            
            if(cookie_email !== email) {
                res.status(500).json({success: false, error: 'link is expired'})

            } else if (password !== confirmPassword) {
                    res.status(500).json({success: false, error: 'Password and Confirmation password does not match'})
                
            } else {
                let user = await userService.get( email )
                user.password = await utils.authUtils.authUtils.argon2Hash(password)
                var updatedUser = await userService.update(user)
                res.status(200);
                res.json({ success: true, user: updatedUser });
            }

        } catch (err) {
            res.status(400);
            res.json({ success: false, message: err });
        }
    },
}

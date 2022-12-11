const nodeMailer = require('nodemailer')
require('dotenv').config()

module.exports = ({ email, link, type }) => {
    return new Promise((resolve, reject) => {
        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        })

        let html =''

        if(type=='register')
            html = `please click here to verify your account <a href='${link}'>here</a>`
        else
            html =`please click here to recover your password <a href='${link}'>here</a>`

        const mailOptions = {
            to: email,
            subject: 'APP NAME', 
            html: html
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log(error)
                reject(new Error("Error Sending Mail"))
            } else {
                console.log("mail sent successfully ", JSON.stringify(info))
                resolve(info)
            }
        })
    })
}
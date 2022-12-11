const nodeMailer = require('nodemailer')
require('dotenv').config()

module.exports = ({email}) => {

    return new Promise((resolve, reject) => {

        const trasnporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        })

        const mailOptions = {
            to: email,
            subject: 'APP NAME', 
            html: `Welcome to our plateform`
        }

        trasnporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                resolve(error)
            } else {
                console.log(info)
                resolve(info)
            }
        })
    })
}
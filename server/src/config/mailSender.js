import nodeMailer from 'nodemailer'
import 'dotenv/config'
const mailSender = async (email, title, body) => {
    try {
        let transporter = nodeMailer.createTransport({
            host: process.env.HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        let response = await transporter.sendMail({
            from: process.env.SENDER_MAIL,
            to: email,
            subject: title,
            html: body
        })
        return response

    } catch (err) {
        console.error('error in sending mail',err)
    }
}

export default mailSender
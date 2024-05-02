import nodemailer from 'nodemailer';
import { config } from '../app-config/config.js';

const transporter = nodemailer.createTransport({
    host: config.host,
    // service : "",
    port: config.smtp_port,
    //secure: false,  // Use `true` for port 465, `false` for all other ports
    auth: {
        user: config.username,
        pass: config.password,
    },
});

const sendmail = async (email, subject, text) => {
    try {
        await transporter.sendMail({
            from: config.username, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: '', // html body
        });
        console.log('Email send successfull !!!');
    } catch (error) {
        console.log('email not sent'); 
        console.log(error);
        return error;
    }
};
export default sendmail;

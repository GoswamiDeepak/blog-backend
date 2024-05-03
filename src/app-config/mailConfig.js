import nodemailer from 'nodemailer';
import { config } from './config.js';
 
export const transporter = nodemailer.createTransport({
    host: config.host,
    // service : "",
    port: config.smtp_port,
    //secure: false,  // Use `true` for port 465, `false` for all other ports
    auth: {
        user: config.username,
        pass: config.password,
    },
});

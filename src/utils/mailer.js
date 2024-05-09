import bcrypt from 'bcrypt';
import { User } from '../user/user.model.js';
import { transporter } from '../app-config/mailConfig.js';
import { config } from '../app-config/config.js';

const sendmail = async (email, emailType, userId) => {
    //hashedtoken create for link
    //update in document and set verifiedtoken and verifiedTokenExpired as well as forgetpasswordToken and forgetpasswordTokenExpired
    //create option
    //send transporter.sendEmail(option)

    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        if (emailType == 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifiyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 900000,
            });
        } else if (emailType == 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 900000,
            });
        }
        const options = {
            from: 'deepakgoswamiofficial@gmail.com',
            to: email,
            subject:
                emailType === 'VERIFY'
                    ? 'Verify your email'
                    : 'Reset your password',
            html: `
            <p>Click 
            ${
                emailType === 'VERIFY'
                    ? `<a href="${config.frontend}/verifyemail?token=${hashedToken}">here</a>`
                    : `<a href="${config.frontend}/reset-password?token=${hashedToken}">here</a>`
            } 
            to ${
                emailType === 'VERIFY'
                    ? 'verify your email'
                    : 'reset your password'
            }
            or copy and paste the link below in your browser. <br> ${
                emailType === 'VERIFY'
                    ? `${config.frontend}/verifyemail?token=${hashedToken}`
                    : `${config.frontend}/reset-password?token=${hashedToken}`
            }
            </p>`,
        };
        const mailResponse = await transporter.sendMail(options);
        console.log('Email send successfull !!!');
        return mailResponse;
    } catch (error) {
        console.log(error);
        console.log('email not sent'); 
        return null;
    }
};
export default sendmail;

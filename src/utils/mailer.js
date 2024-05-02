import nodemailer from nodemailer;

const transporter = nodemailer.createTransport({
    host : "",
    // service : "",
    port : "",
    // secure : "",
    auth : {
        user : "",
        pass : "",
    }
})

const sendmail = async (email,subject,text) => {
 try {
    await transporter.sendmail({
        from : "",
        to : "",
        subject: "",
        text: ""
    })
    console.log('Email send successfull !!!');
 } catch (error) {
    console.log("email not sent");
    console.log(error);
    return error;
 }  
}
export default sendmail;
require("dotenv").config();
const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
});

module.exports.sendEmail = async (docName, email, token) => {
    await transport.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: `${docName} Shared Reports with you`,
        html: `<h2>Hello!</h2>
        <div>Dr ${docName} shared reports with you. <br/> Visit <a href=http://localhost:3000/login-pat/${token}>this link</a> to view them.</div>`,
    }).catch(err => console.log(err));
};
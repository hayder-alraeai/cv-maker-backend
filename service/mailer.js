"use strict";
const nodemailer = require("nodemailer");
const username = process.env.EMAIL_USERNAME
const password = process.env.EMAIL_PASSWORD
// async..await is not allowed in global scope, must use a wrapper
async function main(toEmail, subject, body) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: username, // generated ethereal user
      pass: password, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `Hayder Alraeai <${username}>`, // sender address
    to: toEmail, // list of receivers
    subject: subject, // Subject line
    text: body, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
module.exports = main
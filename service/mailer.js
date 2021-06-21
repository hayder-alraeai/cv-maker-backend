"use strict";
const nodemailer = require("nodemailer");
const username = process.env.EMAIL_USERNAME
const password = process.env.EMAIL_PASSWORD
// async..await is not allowed in global scope, must use a wrapper
async function main(toEmail, subject, body) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: username, // generated ethereal user
      pass: password, // generated ethereal password
    },
  });

  // send mail with defined transport object
  try{
    await transporter.sendMail({
      from: `Hayder Alraeai: <${username}>`, // sender address
      to: toEmail, // list of receivers
      subject: subject, // Subject line
      html: body, // html text body
    });
  }catch(e){
    console.log("error in sendMail function: " + e)
  }

  console.log("Message sent");

}

// main().catch(console.error);
module.exports = main
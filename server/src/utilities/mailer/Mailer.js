const nodemailer = require('nodemailer');
const ejs = require("ejs");

  var transporter = nodemailer.createTransport({
    host: process.env.MAILGUN_SMTP_SERVER,
    port: process.env.MAILGUN_SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAILGUN_SMTP_LOGIN,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });

   const sendEmail = (email, subject, html) => {
     console.log('sendEmail')
    var email = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: html
    };
    transporter.sendMail(email, function(err, info){
      if (err){
        console.log(err);
      }
      else {
        console.log('Message sent: ' + info.response);
      }
    })
  }

const sendWelcomeEmail = (user) => {
    console.log('sendWelcomeEmail')
    ejs.renderFile(__dirname + "/templates/welcome.ejs", { name: user.name }, function (err, data) {
      if (err) {
          console.log(err);
      } else {
        sendEmail(user.email, 'Welcome', data)
      }
    })
 }

 
 module.exports = {
    sendWelcomeEmail
 };
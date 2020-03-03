const nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    host: process.env.MAILGUN_SMTP_SERVER,
    port: process.env.MAILGUN_SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAILGUN_SMTP_LOGIN,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });

   const sendEmail = (email, subject, html, text) => {
     console.log('sendEmail')
    var email = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      text: text,
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
    console.log(user)
    sendEmail(user.email, 'Welcome', 'Welcome', '<p>WELCOME/p>')
 }
 
 const otherMethod = () => {
    // your method logic 
 }
 
 module.exports = {
    sendWelcomeEmail, 
    otherMethod,
 };
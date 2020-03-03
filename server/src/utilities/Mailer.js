const nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//     service: 'Mailgun',
//     auth: {
//         api_key: process.env.MAILGUN_API_KEY,
//         domain: process.env.MAILGUN_DOMAIN
//     }
//   });

  var transporter = nodemailer.createTransport({
    host: process.env.MAILGUN_SMTP_SERVER,
    port: process.env.MAILGUN_SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAILGUN_SMTP_LOGIN,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });

module.exports = {
  nodemailer,
  transporter,
};
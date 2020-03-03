const nodemailer = require('nodemailer');

console.log(process.env.MAILGUN_API_KEY)
console.log(process.env.MAILGUN_DOMAIN)

var transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
  });

module.exports = {
  nodemailer,
  transporter,
};
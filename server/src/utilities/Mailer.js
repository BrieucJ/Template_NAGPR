const nodemailer = require('nodemailer');

const {
    SENDGRID_USERNAME,
    SENDGRID_PASSWORD
} = process.env;

// Create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: SENDGRID_USERNAME,
      pass: SENDGRID_PASSWORD
    }
  });

module.exports = {
  nodemailer,
  transporter,
};
const formData = require('form-data');
const Mailgun = require('mailgun.js');
require('dotenv').config();
const sendEmail = async (recipient, subject, text, html) => {
  try {
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
    });

    const messageData = {
      from: 'Mailgun yolu ile gelen mail<metadigitalkey@gmail.com>',
      to: recipient,
      subject: subject,
      text: text,
      html: html,
    };

    const msg = await mg.messages.create(process.env.DOMAIN, messageData);
    console.log(msg); // logs response data
    return msg;
  } catch (err) {
    console.error('Error sending email:', err); // logs any error
    throw new Error('Failed to send email: ' + err.message);
  }
};

module.exports = sendEmail;

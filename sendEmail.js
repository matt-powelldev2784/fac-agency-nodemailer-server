const nodemailer = require('nodemailer')

async function sendEmail(emailBody) {
  const { name } = emailBody

  let transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SEND_IN_BLUE_EMAIL, // generated ethereal user
      pass: process.env.SEND_IN_BLUE_PASSWORD, // generated ethereal password
    },
  })

  const html = `<b>Hello ${name},</b>
    <p>Thanks for contacting Agency 20:50.</p>
    <p>One of our team will be in contact shortly.</p>
     `

  let info = await transporter.sendMail({
    from: '"Agency 20:50" <no-reply@2050.com>', // sender address
    to: 'matt.powell2784@gmail.com', // list of receivers
    subject: `Thanks for contacting Agency 20:50`, // Subject line
    text: 'Hello world?', // plain text body
    html: html, // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = { sendEmail }

'use strict'

const express = require('express')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5001

app.listen(PORT, console.log(`Server started on port ${PORT}`))

app.post('/send-email', async (req, res) => {
  try {
    await sendMail(req.body)
    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

async function sendMail() {
  let transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SEND_IN_BLUE_EMAIL, // generated ethereal user
      pass: process.env.SEND_IN_BLUE_PASSWORD, // generated ethereal password
    },
  })

  let info = await transporter.sendMail({
    from: '"Agency 20:50" <no-reply@2050.com>', // sender address
    to: 'matt.powell2784@gmail.com', // list of receivers
    subject: 'Thanks for contacting Agency 20:50', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}

// sendMail().catch(console.error)

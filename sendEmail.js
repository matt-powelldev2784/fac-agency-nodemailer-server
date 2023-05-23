var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fac.agency123@gmail.com',
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
})

var mailOptions = {
  from: 'fac.agency123@gmail.com',
  to: 'matt.powell2784@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'Wow!',
}

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error)
  } else {
    console.log('Email sent: ' + info.response)
  }
})

const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { sendEmail } = require('./sendEmail')

const app = express()
app.use(express.json())

app.use(cors())
app.options('*', cors())

const PORT = process.env.PORT || 5001

app.listen(PORT, console.log(`Server started on port ${PORT}`))

app.post('/send-email', async (req, res) => {
  const { email, name } = req.body

  if (!email) {
    return res.status(400).send({
      success: false,
      status: 400,
      error: 'Email is required',
    })
  }

  if (!name) {
    return res.status(400).send({
      success: false,
      status: 400,
      error: 'Name is required',
    })
  }

  try {
    await sendEmail(req.body)

    return res.status(200).send({
      success: true,
      status: 200,
      message: `Email sent successfully to ${email}`,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).send({
      success: false,
      status: 500,
      error: 'Failed to send email',
    })
  }
})

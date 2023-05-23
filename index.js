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
  try {
    await sendEmail(req.body)
    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

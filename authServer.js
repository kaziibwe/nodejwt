require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

// to keep the refresh token instead for storing in the db 
let refreshTokens = []

app.post('/token', (req, res) => {
  const refreshToken = refreshTokens[0];
  if (refreshToken == null) return res.sendStatus(401)


   // check wheather the refresh token is valid
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
// 
//   res.json({ accessToken: refreshTokens })

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
 console.log(refreshTokens) 
    if (err) return res.sendStatus(403)
        // if everything is okay then generate the token
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

app.post('/login', (req, res) => {
  // Authenticate User

  const username = req.body.username
  const user = { name: username }

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}



app.listen(4000, () => {
    console.log('Server listening on port 4000');
  });
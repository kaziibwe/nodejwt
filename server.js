// const express = require('express')
// const app =express()
// const jwt =require('jsonwebtoken')

// app.use(express.json())

// const posts = [
//     {
//     username:'alfred',
//     title:'posts'
// },
// {
//     username:'albert',
//     title:'posts'
// },
// {
//     username:'kyomu',
//     title:'posts'
// },
// {
//     username:'kato',
//     title:'posts'
// },
// ]

// app.get('/posts',(req, res)=>{
//     res.json(posts)
// })

// app.post('/login'(req,res)=>{
//     // authenticate user
//  const username =req.body.username 

//  const user ={name:username}

//  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//  res.json({accessToken:accessToken})
// })
// app.listen(3000)

// require('dotenv').config()
// const express = require('express');
// const app = express();
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());


// const accessTokenSecret =  process.env.ACCESS_TOKEN_SECRET; // replace with a secure secret key



// app.use(express.json())

// const posts = [
//     {
//     username:'alfred',
//     title:'posts'
// },
// {
//     username:'albert',
//     title:'posts'
// },
// {
//     username:'kyomu',
//     title:'posts'
// },
// {
//     username:'kato',
//     title:'posts'
// },
// ]

// app.get('/posts', authenticateToken, (req, res) => {
//     res.json(posts.filter(post => post.username === req.user.name))
//   })
  

// app.post('/login', (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   // Add authentication logic here
//   // For example:
//   // const user = await User.findOne({ username });
//   // if (!user || user.password !== password) {
//   //   return res.status(401).send('Invalid credentials');
//   // }

//   const user = { name: username };
//   const accessToken = jwt.sign(user, accessTokenSecret);
//   res.json({ accessToken });
// });

// // function authenticationToken(req,res, nex)=>{
// //  const authHeader = req.headers['authorization'];
// //  const token authHeader.split('')[1];
// //  Bearer TOKEN 
// // }

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401)
  
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//       console.log(err)
//       if (err) return res.sendStatus(403)
//       req.user = user
//       next()
//     })
//   }

// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });




require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
  {
  username:'alfred',
  title:'posts'
},
{
  username:'albert',
  title:'posts'
},
{
  username:'kyomu',
  title:'posts'
},
{
  username:'kato',
  title:'posts'
},
]

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(3000)
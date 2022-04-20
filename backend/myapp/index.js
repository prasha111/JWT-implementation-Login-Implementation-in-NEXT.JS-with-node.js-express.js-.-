require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
// const { JsonWebTokenError } = require('jsonwebtoken');
 const jwt = require('jsonwebtoken');

app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const posts = [
    {
        username:"prashant",
        title:"sharma"
    },
    {
        username:"rohit",
        title:"pandey"
    }
]


const port = 2000;
const logindata = [
    {
        "phone":837474747,
        "password":3884844
    }
]
console.log(logindata, "logindataa")



app.get('/',authenticateToken, (req, res) => {
  //res.end('Hello World!');
  res.json(posts.filter(post => post.username === req.user.name ))
});


app.post('/login', (req, res)=>{
    const book = req.body.phone;
    const user = req.body.phone;
    logindata.push(book);
    console.log(logindata);
    // const user = { phone:book.phone };
     const accessToken = jwt.sign(book, "d7de305aa2c915a14e097c2b6ba3c258652cee51dff49e8c94b96ec4911f89db5646dc5831cf93c38e65658830c7c750d5712a9687e5bdf0bb8c3492fd352a7f");

    console.log(req.body, "book");
    res.json({accessToken:accessToken})
     console.log(logindata, "logindata")

   


})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    console.log(authHeader, "authHeader");
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null ) return res.sendStatus(401)
    jwt.verify(token, "d7de305aa2c915a14e097c2b6ba3c258652cee51dff49e8c94b96ec4911f89db5646dc5831cf93c38e65658830c7c750d5712a9687e5bdf0bb8c3492fd352a7f", (err, book)=>{
     if (err) return res.sendStatus(403)   
    req.user = user
    next()
    })
}

app.listen(2000, () => {
    console.log("Server running on port 2000");
   });
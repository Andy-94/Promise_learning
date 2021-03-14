const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.urlencoded())

const posts = [
  {
    "title" : "json-server",
    "author" : "typicode",
    "id":1
  },
  {
    "title" : "json-server",
    "author" : "typicode",
    "id":1
  }
]
app.get('/post',(require,response)=>{
  response.send({status:0, data:posts})
})
app.post('/post',(require,response)=>{
  const {title,author} = require.body;
  const id =Date.now()
  const post ={title,author, id}
  posts.push(post)
  setTimeout(() => {
    request.send({status:0,data:post})
  }, 1000);
})
app.put('/post',(require,response)=>{
  const {title,author,id} = require.body;
  const post = posts.find(post => post.id == id)
  post.title = title;
  post.author = author;
  setTimeout(() => {
    request.send({status:0})
  }, 1000);
})
app.delete('/post',(request, response) =>{
  const {id} = request.body
  const index = posts.findIndex(post => post.id==id)
  const postArr = posts.splice(index, 1)
  res.send({status: 0, data: postArr})
})
app.get('/getProducts1', (req, res) => {
  
  setTimeout(() => {
    res.send([
      {id: 1, name: 'product1.1'},
      {id: 2, name: 'product1.2'},
      {id: 3, name: 'product1.3'}
    ])
  }, 1000 + Math.random()*2000);
  
})

app.get('/getProducts2', (req, res) => {

  setTimeout(() => {
    res.send([{
        id: 1,
        name: 'product2.1'
      },
      {
        id: 2,
        name: 'product2.2'
      },
      {
        id: 3,
        name: 'product2.3'
      }
    ])
  }, 1000 + Math.random() * 2000);

})

app.listen(4000, () => {
  console.log('server app start on port 4000')
})
const express = require("express");
const https = require("https");
const router = express.Router();
const request = require("request");

const app = express();
let Todos = null;
let users = null;

let TD1 = null;
let TD2 = null;
let TD3 = null;
let TD4 = null;
let TD5 = null;
let TD6 = null;
let TD7 = null;
let TD8 = null;
let TD9 = null;
let TD10 = null;

app.get("/todos", function(request, response){
  
    const url1 = 'https://jsonplaceholder.typicode.com/todos'
  https.get(url1, res => {
    let data = [];
  
    res.on('data', chunk => {
    data.push(chunk)
    });

    res.on('end', () => {
      Todos = JSON.parse(Buffer.concat(data));

      let MAIN_DATA = Todos.map((items)=>{
      return {
        id:items.id,
        title:items.title,
        completed:items.completed
      }
    })
    
    response.send(MAIN_DATA);
    });
    }).on('error', err => {
    console.log('Error: ', err.message);
  });
});

app.get("/users/:userId", function(request, response){
  const ID = request.params.userId;
  const url1 = 'https://jsonplaceholder.typicode.com/todos'
  https.get(url1, res => {
    let data = [];
  
    res.on('data', chunk => {
    data.push(chunk)
    });

    res.on('end', () => {
      Todos = JSON.parse(Buffer.concat(data));

      TD1 = Todos.filter(data=> data.userId==1)
      TD2 = Todos.filter(data=> data.userId==2)
      TD3 = Todos.filter(data=> data.userId==3)
      TD4 = Todos.filter(data=> data.userId==4)
      TD5 = Todos.filter(data=> data.userId==5)
      TD6 = Todos.filter(data=> data.userId==6)
      TD7 = Todos.filter(data=> data.userId==7)
      TD8 = Todos.filter(data=> data.userId==8)
      TD9 = Todos.filter(data=> data.userId==9)
      TD10 = Todos.filter(data=> data.userId==10)
      
      
    
    });
    }).on('error', err => {
    console.log('Error: ', err.message);
  });


  const url2 = 'https://jsonplaceholder.typicode.com/users'
https.get(url2,Todos, res => {
  let data = [];

  res.on('data', chunk => {
  data.push(chunk)
  });

  res.on('end', () => {
     users = JSON.parse(Buffer.concat(data));

    //  let MAIN_DATA2 = users.filter(data=>data.id==ID)
     let Main_Data = users.map((item)=>{
       return {
         id:item.id,
         name:item.name,
         email:item.email,
         phone:item.phone,
         todos: Todos.filter(data=>data.userId==item.id),
       }
     })
     
     let MAIN_DATA2 = Main_Data.filter(data=>data.id==ID)
     response.send(MAIN_DATA2);
  });
    }).on('error', err => {
    console.log('Error: ', err.message);
    });

  });

  // app.get("/users/:id", function(req, res){
  // const ID = req.params.id;
  // console.log(ID);
  // console.log('USERS',users);


  // //  let  MAIN_DATA2 = users.filter(data=>data.id==ID)
   
  //   // console.log(MAIN_DATA2);
  // })




app.listen(3000, function(){
    console.log("server is running on port 3000");
});
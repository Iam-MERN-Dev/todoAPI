const express = require("express");
const https = require("https");
const router = express.Router();
const request = require("request");

const app = express();
let Todos = null;
let users = null;


app.get("/todos", function (request, response) {
  const url1 = "https://jsonplaceholder.typicode.com/todos";
  https
    .get(url1, (res) => {
      let data = [];

      res.on("data", (chunk) => {
        data.push(chunk);
      });

      res.on("end", () => {
        Todos = JSON.parse(Buffer.concat(data));

        let MAIN_DATA = Todos.map((items) => {
          return {
            id: items.id,
            title: items.title,
            completed: items.completed,
          };
        });

        response.send(MAIN_DATA);
      });
    })
    .on("error", (err) => {
      console.log("Error: ", err.message);
    });
});

app.get("/users", function (request, response) {
  const ID = request.params.userId;
  const url1 = "https://jsonplaceholder.typicode.com/todos";
  https
    .get(url1, (res) => {
      let data = [];

      res.on("data", (chunk) => {
        data.push(chunk);
      });

      res.on("end", () => {
        Todos = JSON.parse(Buffer.concat(data));
      });
    })
    .on("error", (err) => {
      console.log("Error: ", err.message);
    });

  const url2 = "https://jsonplaceholder.typicode.com/users";
  https
    .get(url2, Todos, (res) => {
      let data = [];

      res.on("data", (chunk) => {
        data.push(chunk);
      });

      res.on("end", () => {
        users = JSON.parse(Buffer.concat(data));

        let Main_Data = users.map((item) => {
          return {
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            todos: Todos.filter((data) => data.userId == item.id),
          };
        });

        response.send(Main_Data);
      });
    })
    .on("error", (err) => {
      console.log("Error: ", err.message);
    });
});


app.get("/users/:userId", function (request, response) {
  const ID = request.params.userId;
  const url1 = "https://jsonplaceholder.typicode.com/todos";
  https
    .get(url1, (res) => {
      let data = [];

      res.on("data", (chunk) => {
        data.push(chunk);
      });

      res.on("end", () => {
        Todos = JSON.parse(Buffer.concat(data));
      });
    })
    .on("error", (err) => {
      console.log("Error: ", err.message);
    });

  const url2 = "https://jsonplaceholder.typicode.com/users";
  https
    .get(url2, Todos, (res) => {
      let data = [];

      res.on("data", (chunk) => {
        data.push(chunk);
      });

      res.on("end", () => {
        users = JSON.parse(Buffer.concat(data));

        let Main_Data = users.map((item) => {
          return {
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            todos: Todos.filter((data) => data.userId == item.id),
          };
        });

        let MAIN_DATA2 = Main_Data.filter((data) => data.id == ID);
        response.send(MAIN_DATA2);
      });
    })
    .on("error", (err) => {
      console.log("Error: ", err.message);
    });
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});

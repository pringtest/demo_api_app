const express = require("express");
const { getDynamoDB } = require("./src");

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT;

app.listen(port, function () {
  console.log(`listening on ${port}`);
});

app.get("/dynamodb", async (req, res, next) => {
  try {
    var resp = await getDynamoDB.handler();
    if (resp.statusCode == 200) {
      console.log("resp", resp)
      res.send(JSON.parse(resp.body));
    } else {
      throw resp
    }
  } catch (err) {
    console.log("err", err)
    res.status(err.statusCode).send(JSON.parse(err.body))
  }
});
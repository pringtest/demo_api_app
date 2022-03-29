const express = require("express");
var mysql = require('mysql');
const { getDynamoDB } = require("./src");

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT;
var con = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DATABASE
});
con.connect((err) => {
  if (err) {
    console.log("connect err : ", err);
  } else {
    console.log("rds connected");
  }
});

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

app.get("/rds", (req, res) => {
  con.query(`select * from ${process.env.RDS_TABLENAME}`, function (err, result, fields) {
    if (err) {
      console.log("err : ", err);
      res.status(400).send(err);
    } else {
      console.log("result : ", result);
      res.status(200).send(result);
    }
  });
});
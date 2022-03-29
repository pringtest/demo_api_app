/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-escape */

// LIBRARY
var mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

// ENVIRONMENT
const {
  RDS_HOSTNAME,
  RDS_USERNAME,
  RDS_PASSWORD,
  RDS_PORT,
  RDS_DATABASE,
  RDS_TABLENAME,
} = require('./config');

// MYSQL SERVICES
var connection = mysql.createConnection({
  host: RDS_HOSTNAME,
  user: RDS_USERNAME,
  password: RDS_PASSWORD,
  port: RDS_PORT,
  database: RDS_DATABASE
});

// GLOBAL FUNCTION
function throwError(message) {
  const payload = {
    statusCode: 400,
    message,
  };
  return payload;
}
async function errorPayload(statusCode, message) {
  const payload = {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'x-amzn-ErrorType': statusCode,
    },
    isBase64Encoded: false,
    body: JSON.stringify({
      message,
      statusCode,
    }),
  };

  return payload;
}
async function successPayload(type, input, message) {
  let body = {};
  switch (type) {
    case 'data':
      body = { data: input, statusCode: 200 };
      if (message !== undefined) {
        body.message = message;
      }
      break;
    case 'message':
      body = { message: input, statusCode: 200 };
      break;
    default:
      break;
  }

  const payload = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    isBase64Encoded: false,
    body: JSON.stringify(body),
  };

  return payload;
}

// MAIN FUNCTION
exports.handler = async (event) => {
  try {
    const sql = `select * from ${RDS_TABLENAME}`;
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        const response = await successPayload('data', result);
        return response;
      }
    });
  } catch (error) {
    const response = await errorPayload(400, error.message);
    return response;
  }
};

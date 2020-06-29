'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  // use method 'scan' from DocumentClient as a way to get all itmes
  const params = {
    TableName: "Products",
  };

  try {
    const data = await documentClient.delete(params).promise();
    responseBody = JSON.stringify(data.Items);
    statusCode = 204;
  } catch(err) {
    responseBody = `Unable to get product: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
};
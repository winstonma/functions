import fetch from "node-fetch";

const API_ENDPOINT = "https://icanhazdadjoke.com/";

exports.handler = async (event, context) => {
  const name = event.queryStringParameters && event.queryStringParameters.name;

  return fetch(API_ENDPOINT, { headers: { Accept: "application/json" } })
    .then(response => response.json())
    .then(response => {
      return name.concat(': ', response.joke)
    })
    .then(data => ({
      statusCode: 200,
      body: data
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};

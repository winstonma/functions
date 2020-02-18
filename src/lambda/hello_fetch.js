import fetch from "node-fetch";

const API_ENDPOINT = "https://icanhazdadjoke.com/";

exports.handler = async (event, context) => {
  const name = event.queryStringParameters && event.queryStringParameters.name;

  return fetch(API_ENDPOINT, { headers: { Accept: "application/json" } })
    .then(response => response.json())
    .then(response => {
      response["joke"] = name + ": " + response.joke;
      return response;
    })
    .then(data => ({
      statusCode: 200,
      body: data.joke
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};

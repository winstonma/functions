import ytdl from "ytdl-core";

exports.handler = async (event, context) => {
  let response;

  const videoID =
    event.queryStringParameters && event.queryStringParameters.videoID;

  return ytdl
    .getInfo(videoID)
    .then(response => {
      const format = ytdl.chooseFormat(response.formats, { quality: "136" });
      response.formats = format;
      delete response["related_videos"];
      delete response["player_response"];
      return {
        statusCode: 200,
        headers: {
          "content-type": "application/json",
          "cache-control": "no-cache no-store max-age=0 must-revalidate"
        },
        body: JSON.stringify(response)
      };
    })
    .catch(error => ({
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: error.message
      })
    }));
};

const s3Client = require("./S3Client");
const time = require("time");

exports.HelloWorldFunction = async (event, context, callback) => {
  const keys = await s3Client.getKeys();
  const names = keys.join(", ");
  const currentTime = new time.Date();

  callback(null, {
    statusCode: "200",
    body: `Hi ${names}  - the time on the server is ${currentTime}`,
  });
};

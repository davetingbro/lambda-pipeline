const aws = require("aws-sdk");
const s3 = new aws.S3();
const time = require("time");

exports.HelloWorldFunction = async (event, context, callback) => {
  const params = {
    Bucket: "david-ting-hello-world",
  };

  const s3Objects = (await s3.listObjectsV2(params).promise()).Contents;
  const keys = s3Objects.map((obj) => obj["Key"]);
  const names = keys.join(", ");

  const currentTime = new time.Date();

  callback(null, {
    statusCode: "200",
    body: `Hi ${names}  - the time on the server is ${currentTime}`,
  });
};

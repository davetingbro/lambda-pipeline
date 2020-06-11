const s3Client = require("./S3Client");

exports.GetPeopleFunction = async (event, context, callback) => {
  const keys = await s3Client.getKeys();
  const names = keys.join(", ");

  callback(null, {
    statusCode: "200",
    body: names,
  });
};

exports.AddToPeopleFunction = async (event, context, callback) => {};

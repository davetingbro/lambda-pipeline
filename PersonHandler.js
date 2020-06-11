const s3Client = require("./S3Client");

exports.DeletePersonFunction = async (event, context, callback) => {
  const { name } = event.pathParameters.name;
  try {
    await s3Client.delete(name);
    callback(null, { statusCode: "204" });
  } catch (error) {
    callback(null, { statusCode: "403" });
  }
};

exports.UpdatePersonFunction = async (event, context, callback) => {};

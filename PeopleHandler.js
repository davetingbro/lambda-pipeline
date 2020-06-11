const s3Client = require("./S3Client");

exports.GetPeopleFunction = async (event, context, callback) => {
  const keys = await s3Client.getKeys();
  const names = keys.join(", ");

  callback(null, {
    statusCode: "200",
    body: names,
  });
};

exports.AddToPeopleFunction = async (event, context, callback) => {
  const nameToAdd = event.body;
  const personExist = (await s3Client.getKeys()).includes(nameToAdd);

  if (personExist || nameToAdd === "")
    return callback(null, { statusCode: "202" });

  await s3Client.post(nameToAdd);
  const header = JSON.stringify({
    location: `${process.env.path}/${nameToAdd}`,
  });
  callback(null, {
    statusCode: "200",
    body: nameToAdd,
  });
};

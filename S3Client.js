const aws = require("aws-sdk");
const s3 = new aws.S3();

const BUCKET = "david-ting-hello-world";

exports.getNames = async () => {
  const params = { Bucket: BUCKET };
  const s3Objects = (await s3.listObjectsV2(params).promise()).Contents;

  return s3Objects.map((obj) => obj["Key"]);
};
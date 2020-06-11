const aws = require("aws-sdk");
const s3 = new aws.S3();

const BUCKET = "david-ting-hello-world";

exports.getKeys = async () => {
  const params = { Bucket: BUCKET };
  const s3Objects = (await s3.listObjectsV2(params).promise()).Contents;

  return s3Objects.map((obj) => obj["Key"]);
};

exports.post = async (key) => {
  const params = {
    Bucket: BUCKET,
    Key: key,
  };

  s3.putObject(params, (error, data) => {
    if (error) throw error;
  });
};

exports.delete = async (key) => {
  const params = {
    Bucket: BUCKET,
    Key: key,
  };
  s3.deleteObject(params, (error, data) => {
    if (error) throw error;
  });
};

exports.put = async (oldKey, newKey) => {
  const params = {
    Bucket: BUCKET,
    CopySource: `/${BUCKET}/${oldKey}`,
    Key: newKey,
  };

  await s3.copyObject(params, (error, data) => {
    if (error) throw error;
  });
  await s3.deleteObject({ Bucket: BUCKET, Key: oldKey }, (error, data) => {
    if (error) throw error;
  });
};

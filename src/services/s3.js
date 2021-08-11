import AWS from 'aws-sdk';

const spacesEndpoint = new AWS.Endpoint(process.env.VUE_APP_DO_SERVICE_URI);

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.VUE_APP_DO_ACCESS_KEY,
  secretAccessKey: process.env.VUE_APP_DO_SECRET_KEY,
  Bucket: process.env.VUE_APP_DO_BUCKET,
});

export const uploadFile = async (params) => {
  try {
    await s3.putObject(params).promise();
  } catch (err) {
    console.log('fetch failed', err);
  }
};

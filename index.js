import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';

const { ACCOUNT_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET } = process.env;

if (!(ACCOUNT_ID && ACCESS_KEY_ID && SECRET_ACCESS_KEY && BUCKET)) {
  process.exit(1);
}

const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

const result = await S3.send(new ListObjectsV2Command({ Bucket: BUCKET }));

console.log(result.KeyCount);

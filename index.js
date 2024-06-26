import { ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createReadStream } from 'node:fs'

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

const file = `zh-cn_windows_10_business_editions_version_22h2_updated_june_2024_x64_dvd_1139f6a3.iso`

await S3.send(new PutObjectCommand({
  Bucket: BUCKET,
  Key: file,
  Body: createReadStream(file)
}))

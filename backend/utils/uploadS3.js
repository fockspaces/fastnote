import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as dotenv from "dotenv";

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const generateFileName = (file) => {
  const timestamp = Date.now();
  return `${timestamp}-${file.originalname}`;
};

export const uploadToS3 = async (file) => {
  const fileName = generateFileName(file);

  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: fileName,
    ContentType: file.mimetype,
    ACL: "public-read", // Allow public read access to the uploaded file
  };

  await s3Client.send(new PutObjectCommand(uploadParams));

  return fileName;
};

export const generateImageUrl = async (imageName) => {
  return await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: bucketName,
      Key: imageName,
    }),
    { expiresIn: 60 }
  );
};

export const deleteFromS3 = async (imageName) => {
  const deleteParams = {
    Bucket: bucketName,
    Key: imageName,
  };

  return s3Client.send(new DeleteObjectCommand(deleteParams));
};

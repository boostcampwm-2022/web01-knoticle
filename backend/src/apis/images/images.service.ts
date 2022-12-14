import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

import { CreateImage } from '@apis/images/images.interface';

const createImage = async (dto: CreateImage) => {
  const { file } = dto;

  const ObjectStorage = new AWS.S3({
    endpoint: new AWS.Endpoint(process.env.OS_ENDPOINT),
    region: 'kr-standard',
    credentials: {
      accessKeyId: process.env.OS_ACCESS_KEY,
      secretAccessKey: process.env.OS_SECRET_KEY,
    },
  });

  const imageName = uuidv4() + '.png';
  const imagePath = `${process.env.OS_ENDPOINT}/${process.env.OS_BUCKET}/${imageName}`;

  await ObjectStorage.putObject({
    Bucket: process.env.OS_BUCKET,
    Key: imageName,
    ACL: 'public-read',
    Body: file.buffer,
    ContentType: 'image/png',
  }).promise();

  return imagePath;
};

export default {
  createImage,
};

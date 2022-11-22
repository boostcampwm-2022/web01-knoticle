import { CreateImage } from '@apis/image/image.interface';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

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

  await ObjectStorage.putObject({
    Bucket: process.env.OS_BUCKET,
    Key: imageName,
    ACL: 'public-read',
    Body: file.buffer,
    ContentType: 'image/png',
  });
  const imagePath = `${process.env.OS_ENDPOINT}/${process.env.OS_BUCKET}/${imageName}`;

  return imagePath;
};

export default {
  createImage,
};

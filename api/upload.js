// api/upload.js
import { createHandler } from '@vercel/node';
import { Storage } from '@google-cloud/storage';

const storage = new Storage();
const bucketName = process.env.BUCKET_NAME;

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const file = req.files.file;

    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(file.name);

    const blobStream = blob.createWriteStream();
    blobStream.on('finish', () => {
      res.status(200).send('File uploaded successfully');
    });
    blobStream.end(file.data);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file');
  }
};

export default createHandler(handler);

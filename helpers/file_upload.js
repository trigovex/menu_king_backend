import { v4 as uuidv4 } from 'uuid';
import { Bucket, Storage } from "@google-cloud/storage";


const FileUplaod = async (filetype, base64Data, extension) => {
  const BUCKET_NAME = process.env.BUCKET_NAME
  const BUCKET_ACCESS_URL = process.env.BUCKET_ACCESS_URL
  const uniqueId = uuidv4();
  const timestamp = Date.now(); // Get current timestamp
  const filename = `file-${timestamp}${extension}`; // Generate filename using timestamp

  try {
    const storage = new Storage({
      keyFilename: 'src/shared/utils/gcs.json', // replace this with the path to your service account key file
    });
    const bucket = storage.bucket(process.env.BUCKET_NAME);
    const file = bucket.file(`${filetype}/file-${uniqueId}${extension}`);

    // Convert base64 data to a buffer
    const buffer = Buffer.from(base64Data, 'base64');

    // Upload the buffer to GCP
    await file.save(buffer);

    // Construct the file URL
    const fileUrl = `${process.env.BUCKET_ACCESS_URL}${filetype}/file-${uniqueId}${extension}`;

    // Set the content disposition header
    const contentDisposition = `attachment; filename="${filename}"`;

    // Update the file metadata with the content disposition header
    await file.setMetadata({
      contentDisposition: contentDisposition,
    });

    return fileUrl;
  } catch (err) {
    console.error('Error occurred during file upload:', err);
  }
};


export default FileUplaod;

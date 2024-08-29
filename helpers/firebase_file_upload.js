const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket:process.env.DATABASE_URL
});

const bucket = admin.storage().bucket();

async function uploadFile(filename,base64Data,content_type,file_type) {
  // Convert base64 data to a buffer
  const fileBuffer = Buffer.from(base64Data, 'base64');
  filename=generateRandomId(20);
  const fileRef = bucket.file(filename);

  await fileRef.save(fileBuffer, {
    metadata: {
      contentType: content_type, // Specify the appropriate content type for your image
    },
  });

  const fileUrl = await fileRef.getSignedUrl({
    action: 'read',
    expires: '03-01-2500', // Adjust the expiration date as needed
  });

  return fileUrl[0];
} 

export default uploadFile;
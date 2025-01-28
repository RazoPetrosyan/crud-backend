import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { v4 as idV4 } from 'uuid';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const imageFormats = ['jpeg', 'jpg', 'png', 'webp', 'gif'];
    const videoFormats = ['mp4', 'avi', 'mov', 'mkv', 'mpeg', 'wmv'];

    const fileExtension = file.mimetype.split('/')[1];
    console.log(`File Extension: ${fileExtension}`);

    let userDefinedName = req.body.fileName || '';
    userDefinedName = userDefinedName.replace(/[^a-zA-Z0-9-_]/g, '');

    const uniqueName = `${userDefinedName || idV4()}`;

    if (imageFormats.includes(fileExtension)) {
      return {
        folder: 'uploads/images',
        format: fileExtension,
        public_id: `${uniqueName}`,
      };
    } else if (videoFormats.includes(fileExtension)) {
      return {
        folder: 'uploads/videos',
        resource_type: 'video',
        format: fileExtension,
        public_id: `${uniqueName}`,
      };
    } else {
      console.error('Unsupported file type:', file.mimetype);
      throw new Error('Unsupported file type');
    }
  },
});

const upload = multer({ storage });

export default upload;

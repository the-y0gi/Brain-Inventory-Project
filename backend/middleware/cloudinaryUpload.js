import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from '../config/cloudinary.js';

// Cloudinary setup for image 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = 'user_profile'; 
    return {
      folder: folder,
      resource_type: 'image',
    };
  },
});

//image max limit size are 5 mb
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});


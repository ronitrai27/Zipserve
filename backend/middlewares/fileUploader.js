const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => "png",
    public_id: async (req, file) => file.originalname.split(".")[0] + "",
  },
});

const cloudinaryFileUploader = multer({ storage: storage }); // telling multer to use the storage as cloudinary storage

module.exports = cloudinaryFileUploader;
// further enhancements like support for multiple file format and setting limit of file like 5mb.

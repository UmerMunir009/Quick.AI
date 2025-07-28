require('dotenv').config();
const { default: axios } = require("axios");
const cloudinary = require('cloudinary').v2;
const FormData = require('form-data');

exports.generateImage = async (prompt) => {
  const formData = new FormData();
  formData.append("prompt", prompt);

    const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
        headers: {
          'x-api-key': process.env.CLIPDROP_API_KEY,
          ...formData.getHeaders(), 
        },
        responseType: "arraybuffer",
      }
    );
    const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;
    const uploadResult = await cloudinary.uploader.upload(base64Image, {resource_type: "image"});
    
    return uploadResult.secure_url;
};

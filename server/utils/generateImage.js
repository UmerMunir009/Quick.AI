require('dotenv').config();
const { default: axios } = require("axios");

exports.generateImage = async (prompt) => {
  const formData = new FormData();
  formData.append("prompt", prompt);
  const {data}=await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
    headers:{
        'x-api-key': process.env.CLIPDROP_API_KEY,
        responseType:"arraybuffer"
    }
  })
  const base64Image=`data:image/png;base64,${Buffer.from(data,'binary').toString('base64')}`
  //now need to upload on cloudinary to make it accessible

  return response.choices[0].message.content;
};

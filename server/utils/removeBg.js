const cloudinary = require('cloudinary').v2;

exports.removeBg= async (image) => {
    const uploadResult=await cloudinary.uploader.upload(image.path,{
        transformation:[
            {
                effect: 'background_removal',
                background_removal:'remove the background'
            }
        ]
    })
    return uploadResult.secure_url;
};

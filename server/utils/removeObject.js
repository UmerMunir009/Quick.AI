const cloudinary = require('cloudinary').v2;

exports.removeObject= async (image,object) => {
    const {public_id}=await cloudinary.uploader.upload(image.path)
    const url=cloudinary.url(public_id,{
        transformation:[{
            effect:`gen_remove:${object}`
        }],
        resource_type:'image'
    })
    return url;
};

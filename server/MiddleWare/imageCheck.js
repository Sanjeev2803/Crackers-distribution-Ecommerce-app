const cloudinary = require('cloudinary').v2;

const imageCheck= async (uniqueIdentifier) => {
    try {
        // Check if the image with the unique identifier already exists in Cloudinary
        const result = await cloudinary.search
            .expression(`public_id:${uniqueIdentifier}`)
            .execute();
            console.log('Cloudinary Search Result:', result);
        return result.total_count > 0;
    } catch (error) {
        console.error('Error checking for duplicate image:', error);
        return false;
    }
};
module.exports={imageCheck}
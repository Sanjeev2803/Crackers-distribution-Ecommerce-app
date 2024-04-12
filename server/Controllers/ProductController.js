const { Seller } = require('../Db');
const { cloudinary } = require('../MiddleWare/CloudinaryUpload');
const fs = require('fs');
const { imageCheck } = require('../MiddleWare/imageCheck');
const { v4: uuidv4 } = require('uuid');

const Addproducts = async (req, res) => {
    try {
        const sellerInfo = JSON.parse(req.body.sellerObj);
        const isSellerData=await Seller.findOne({FirstName:sellerInfo.FirstName})
        // Generate a new unique identifier using uuidv4
        const uniqueIdentifier = uuidv4();

        console.log('Checking for duplicate image with identifier:', uniqueIdentifier);
        if(isSellerData!==null){
            // const moderationOptions = { type: 'upload', moderation: 'duplicate:0' };
            // const cloudinaryResult = await cloudinary.uploader(req.file.path);

            // if (cloudinaryResult.moderation[req.file.path].status === 'rejected') {
            //     console.log('Image already exists in Cloudinary. Skipping upload.');
            //     res.status(409).json({ success: false, message: 'Image already exists in Cloudinary' });
            //     return; // Stop execution if the image is a duplicate
            // }

        const cloudinaryProductUrl = await cloudinary.uploader.upload(req.file.path);
        const newProduct = {
            ProductName: sellerInfo.productName, // Ensure consistent casing
            price: sellerInfo.price,
            company: sellerInfo.company,
            description: sellerInfo.description,
            productImgUrl: cloudinaryProductUrl.url,
            Category:sellerInfo.Category
        };

        fs.unlink(req.file.path, (err) => {
            if (err) {
                throw err;
            } else {
                console.log('Image URL successfully uploaded to Cloudinary...');
                console.log('Image removed from the local folder.');
            }
        });

        // Log the details before the update
        console.log('sellerInfo:', sellerInfo);
        console.log('newProduct:', newProduct);


        const sellerData = await Seller.findOneAndUpdate(
            { FirstName: sellerInfo.FirstName }, // Update based on the correct field, assuming it's FirstName
            {
                $addToSet: {
                    Products: newProduct,
                },
            },
            { new: true, upsert: true } // Create the document if it doesn't exist
        );

        // Log the updated sellerData
        console.log('sellerData after update:', sellerData);

        res.status(200).json({ success: true, message: 'Product added successfully', products: sellerData.Products });
}
else{
    res.status(202).send({'message':'seller not enrolled!!'})
}
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
    
};
// const editProducts=async(req,res)=>{
//     console.log(req)
//     const prodObj = JSON.parse(req.body.newEditObj);
//     console.log(prodObj)
//     //from this take oldproductImgUrl and in that the public id is just before .jpg now based on that overwrite the other image from product {oldproductImgUrl ,....,ActualproductImg url } and store it in database the url of that 
// }

const editProducts = async (req, res) => {
    console.log(req.body.sellerEditObj)
     try {
        const prodObj = JSON.parse(req.body.sellerEditObj);
        console.log(prodObj);

        // Extract the public ID from the oldproductImgUrl
        const publicId = extractPublicIdFromUrl(prodObj.oldproductImgUrl);

        // Upload the new image to Cloudinary
        const cloudinaryProductUrl = await cloudinary.uploader.upload(req.file.path);

        // Update the old image in the database with the new image URL
        const updatedProduct = await Seller.findOneAndUpdate(
            {
                'Products.productImgUrl': prodObj.oldproductImgUrl,
                
            },
            {
                $set: {
                    'Products.$.productImgUrl': cloudinaryProductUrl.url,
                    'Products.$.ProductName': prodObj.newProductname,
                'Products.$.Category': prodObj.Category,
                'Products.$.price': prodObj.price,
                'Products.$.description': prodObj.description,
                },
            },
            { new: true }
        );

        // Log the details after the update
        console.log('prodObj:', prodObj);
        console.log('updatedProduct:', updatedProduct);

        // Delete the old image from Cloudinary
        await cloudinary.uploader.destroy(publicId);

        // Remove the file from the local folder
        fs.unlink(req.file.path, (err) => {
            if (err) {
                throw err;
            } else {
                console.log('New image URL successfully uploaded to Cloudinary...');
                console.log('Old image removed from Cloudinary and local folder.');
            }
       });

       res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
     console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Helper function to extract the public ID from a Cloudinary URL
// Helper function to extract the public ID from a Cloudinary URL
const extractPublicIdFromUrl = (url) => {
    const matches = url.match(/\/([^/]+?)\.[\w\d]+(?:$|\/)/);
    return matches && matches[1];
};
const urlNochangeEdit=async(req,res)=>{
    console.log(req.body)
}
const deleteProducts=async(req,res)=>{
    console.log(req.body)
    try {
        const { title, SellerName } = req.body;
    
        // Update the user's cart by removing the item with the specified productName
        const result = await Seller.updateOne(
          { FirstName: SellerName },
          { $pull: { Products: { ProductName: title } } }
        );
    const updatedProducts=await Seller.findOne({FirstName:SellerName})
        res.status(200).send({ message: 'Item deleted successfully', Products: updatedProducts.Products });
      } catch (error) {
        console.error('Error deleting item from cart:', error);
        res.status(500).send({ message: 'Internal server error' });
      }
}


module.exports = { Addproducts,editProducts,urlNochangeEdit,deleteProducts};

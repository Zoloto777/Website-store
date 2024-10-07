import productModel from "../models/productModel.js";
import fs from "fs"
import multer from "multer"
const upload = multer();
// add product item
const addProduct = async (req, res) => {
  let image_filename = `${req.file.filename}`

  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
  })

  try {
    await product.save();
    res.json({ success: true, message: "Product added" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "No product found" })
  }
}

// all product list 
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({})
    res.json({ success: true, data: products })

  }
  catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

//remove product item
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id)
    fs.unlink(`uploads/${product.image}`, () => { })

    await productModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "product removed" })
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.query; // Get product ID from URL params
    const { field, value } = req.body; // Get field and updated value from request body
    const image = req.file; // Handle the uploaded file

    // Build update object
    const updateFields = {};

    if (field && value) {
      updateFields[field] = value;
    }

    if (image) {
      // Append the image filename to the update fields
      updateFields.image = image.filename;
      const currentProduct = await productModel.findById(id)
      fs.unlink(`uploads/${currentProduct.image}`, () => { })
    }

    // Find the product by ID and update the specific field(s)
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { $set: updateFields },  // Dynamically update the fields
      { new: true }            // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: updatedProduct }); // Send back the updated product
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


export { addProduct, listProduct, removeProduct, updateProduct }


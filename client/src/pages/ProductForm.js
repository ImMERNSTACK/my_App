import React, { useState } from 'react';
import { createProduct } from '../services/Apis';

const ProductForm = () => {
  // Initializing state to store form values
  const [product, setProduct] = useState({
    id:'',
    title: '',
    price: '',
    quantity: '',
    discountPercentage: '',
    thumbnail: null, // Now stores a file object for the image
  });

  // State to store image preview URL
  const [imagePreview, setImagePreview] = useState(null);

  // Handling form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({
        ...product,
        thumbnail: file,
      });

      // Create a preview URL for the uploaded image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();

    // Calculate the total and discounted total based on input values
    const price = parseFloat(product.price);
    const quantity = parseInt(product.quantity, 10);
    const discountPercentage = parseFloat(product.discountPercentage);

    const total = price * quantity;
    const discountedTotal = total - (total * discountPercentage) / 100;


    // Create the product object (you can send this to an API or save it)
 const formData = new FormData();
    formData.append('id',Number.parseInt(Math.random()*10000));
    formData.append('title', product.title);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('total',total);
    formData.append('discountPercentage', discountPercentage);
    formData.append('discountedTotal', discountedTotal);
    formData.append('thumbnail', product.thumbnail);
    const token = localStorage.getItem("userdbtoken");
    // For now, we will log the product to the console
    if(token){
    const response = await createProduct(formData,{ Authorization: `Bearer ${token}` });
    console.log(response);
    }
    


    // Reset the form
    setProduct({
      title: '',
      price: '',
      quantity: '',
      discountPercentage: '',
      thumbnail: null,
    });
    setImagePreview(null);
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        {/* Product Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Product Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Product Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Product Quantity */}
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>

        {/* Discount Percentage */}
        <div className="mb-3">
          <label htmlFor="discountPercentage" className="form-label">Discount Percentage</label>
          <input
            type="number"
            className="form-control"
            id="discountPercentage"
            name="discountPercentage"
            value={product.discountPercentage}
            onChange={handleChange}
            required
          />
        </div>

        {/* Product Thumbnail Image Upload */}
        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">Upload Thumbnail Image</label>
          <input
            type="file"
            className="form-control"
            id="thumbnail"
            name="thumbnail"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-3">
            <label className="form-label">Image Preview</label>
            <img src={imagePreview} alt="Preview" className="img-fluid" style={{ maxWidth: '300px' }} />
          </div>
        )}

        <button type="submit" className="btn btn-primary" style={{width:'50%',alignSelf:'flex-end'}}>Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
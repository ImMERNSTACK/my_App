const Product = require("../model/product");

//http://localhost:4000/products/create
exports.createProduct =async (req,res)=>{
   const {id,title,price,quantity,total,discountPercentage,discountedTotal}=req.body;
   console.log(req.file)
   const photo = req.file ? req.file.path : null;
   
   if(!id||!title || !price || !quantity || !total || !discountPercentage || !discountedTotal || !photo){
    return res.status(400).json({ message: 'All fields are required' });
   }
   try {
    const existingProduct = await Product.findOne({ id:id });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product id already in use' });
    }
    const newProduct = new Product({
      id,
      title,
      price,
      quantity,
      total,
      discountPercentage,
      discountedTotal,
      thumbnail:photo,
    });
   
    await newProduct.save();

   res.status(201).json({
    message: 'Product registered successfully',
    product: newProduct
  });
   } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
   }
}

exports.productSaveInbulk=async (req,res)=>{
     try {
        await Product.insertMany(req.body.products);
        return res.status(200).json({message: "All product saved..."});     
     } catch (error) {
        return res.status(500).json({error:"Internal Server Error"});
     }
}

//http://localhost:4000/products/get_all
exports.getallProducts=async (req,res)=>{
    try {
        const product = await Product.find();
        return res.status(200).json({product});
    } catch (error) {
        return response.status(500).json({message:"Internal server Error"});
    }
}

//http://localhost:4000/products/product
exports.getProductById = (req, res) => {
    let Id = req.body.id;
    console.log('Product ID:', Id);
    Product.findOne({_id:Id})
      .then(result => {
        if (!result) {
          console.error('Product not found for ID:', Id);
          return res.status(404).json({ error: 'Product not found' });
        }
        console.log('Product found:', result);
        return res.status(200).json({ product: result });
      })
      .catch(err => {
        console.error('Database query failed:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      });
  };
  

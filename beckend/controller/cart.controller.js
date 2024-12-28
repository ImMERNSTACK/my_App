const users = require("../model/userSchema")

//http://localhost:4000/add-to-cart
exports.addToCart = async (req,res)=>{
    console.log('req.body', req.body);
        const isUpdate = await users.updateOne({_id:req.body.userId},{
            $addToSet:{ cart : req.body.productId}
        });
        if(isUpdate.modifiedCount > 0){           
            return res.status(200).json({message:"Product Added to cart successfully"})    
        }else{
            return res.status(401).json({message:"No products Added"});
        }
}

//http://localhost:4000/get-cart
exports.getCart = async (req, res) => {
    const { userId } = req.body;  // Destructure userId from req.body
  
    try {
      // Find the user by userId and populate the cart field (assuming cart is a reference to another collection)
      const user = await users.findOne({ _id: userId }).populate('cart');
  
      if (user) {
        return res.status(200).json({ message: "Get cart success", data: user });
      } else {
        return res.status(404).json({ message: "User not found" });  // Return 404 if user is not found
      }
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });  // Return error details for debugging
    }
  };

// http://localhost:4000/remove-from-cart
exports.removeFromCart = async (req, res) => {
    console.log('req.body', req.body);
    if (!req.body.userId || !req.body.productId) {
        return res.status(400).json({ message: "User ID and Product ID are required" });
    }
    try {
        const isUpdate = await users.updateOne(
            { _id: req.body.userId },
            {
                $pull: { cart: req.body.productId }
            }
        );
        if (isUpdate.modifiedCount > 0) {
            return res.status(200).json({ message: "Product removed from cart successfully" });
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error("Error removing product from cart:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

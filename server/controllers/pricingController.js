import Product from '../models/Product.js';





export const getDynamicPrice = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    //  Input validation
    if (!productId || !quantity) {
      return res.status(400).json({ message: "Please provide productId and quantity." });
    }

    //  Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    //  Determine user role
    const userRole = req.user.role;

    //  Get base price based on role
    let basePrice = product.prices[userRole] || product.prices.enduser;
    console.log("Base Price:", basePrice);

    //  Calculate quantity-based discount
    let discountPercent = 0;

    if (product.quantityDiscounts && product.quantityDiscounts.length > 0) {
      for (const discount of product.quantityDiscounts) {
        console.log("Checking discount range:", discount);
        console.log("Quantity:", quantity);

        if (quantity >= discount.minQty && quantity <= discount.maxQty) {
          discountPercent = discount.discountPercent;
          console.log("Discount matched:", discountPercent);
          break;
        }
      }
    }

    //  Calculate final price
    const finalPrice = basePrice * (1 - discountPercent / 100);

    //  Response
    res.status(200).json({
      productId,
      role: userRole,
      quantity,
      basePrice,
      discountPercent,
      finalPrice
    });
  } catch (err) {
    console.error("Get dynamic price error:", err);
    res.status(500).json({ message: "Failed to calculate price." });
  }
};
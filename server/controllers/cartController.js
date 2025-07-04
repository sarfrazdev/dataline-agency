import Cart from "../models/cart.js";
import Product from "../models/Product.js";
import { getDynamicPrice } from "./productController.js";





export const getCart = async (req, res) => {
  try {
    const userRole = req.user.role || 'enduser';

    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: 'items.product',
      select: 'name image images prices brand stock quantityBasedPrices',
    });

    if (!cart) {
      return res.status(200).json({ items: [], totalAmount: 0 });
    }

    const items = cart.items
      .filter(item => item.product) 
      .map(item => {
        const product = item.product;
        const quantity = item.quantity;

        const dynamicPrice = getDynamicPrice(quantity, product.quantityBasedPrices, product.prices?.[userRole] || 0);

        return {
          _id: item._id,
          product,
          quantity,
          price: dynamicPrice,
          subtotal: quantity * dynamicPrice,
        };
      });

    const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);

    res.status(200).json({ items, totalAmount });
  } catch (error) {
    console.error('Cart fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

//  Add to cart

export const addToCart = async (req, res) => {
  const { productId, quantity, price } = req.body;
  const userId = req.user._id;
  const userRole = req.user.role || 'enduser';

  try {
    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Use provided price or fallback to product.prices[userRole]
    const itemPrice = price || product.prices?.[userRole] || 0;
    if (itemPrice === 0) {
      return res.status(400).json({ message: 'Invalid product price' });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].price = itemPrice; // Update price
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: itemPrice,
        image: product.image,
      });
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
};
//  Update cart item quantity
export const updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (cart) {
    const item = cart.items.id(itemId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
};

//  Remove from cart
export const removeFromCart = async (req, res) => {
  const { itemId } = req.params;
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
};
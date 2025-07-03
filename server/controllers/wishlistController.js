// controllers/wishlistController.js
import User from '../models/User.js';
import Product from '../models/Product.js';

//  Get wishlist
// export const getWishlist = async (req, res) => {
//   try {
//    //console.log('req.user:', req.user);
//     const user = await User.findById(req.user._id).populate('wishlist');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ wishlist: user.wishlist });
//   } catch (err) {
//     console.error('Error fetching wishlist:', err);
//     res.status(500).json({ message: 'Failed to fetch wishlist' });
//   }
// };

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Convert image paths to full URLs just like getAllProducts
    const wishlistWithUrls = user.wishlist.map(product => {
      const productObj = product.toObject();

      const imageUrls = (productObj.images || []).map(img => {
        if (img.startsWith('http')) return img;

        const filename = img.replace(/^.*[\\/]/, '');
        return `${req.protocol}://${req.get('host')}/uploads/products/${filename}`;
      });

      return {
        ...productObj,
        images: imageUrls
      };
    });

    res.status(200).json({ wishlist: wishlistWithUrls });

  } catch (err) {
    console.error('Error fetching wishlist:', err);
    res.status(500).json({ message: 'Failed to fetch wishlist' });
  }
};


//  Add to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID missing' });
    }

    // Optional: Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Avoid duplicate wishlist entries
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    // Populate for updated wishlist response
    await user.populate('wishlist');

    res.status(200).json({ wishlist: user.wishlist });
  } catch (err) {
    console.error('Error adding to wishlist:', err);
    res.status(500).json({ message: 'Failed to add to wishlist' });
  }
};

//  Remove from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID missing' });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove product from wishlist
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId
    );

    await user.save();

    // Populate for updated wishlist response
    await user.populate('wishlist');

    res.status(200).json({ wishlist: user.wishlist });
  } catch (err) {
    console.error('Error removing from wishlist:', err);
    res.status(500).json({ message: 'Failed to remove from wishlist' });
  }
};

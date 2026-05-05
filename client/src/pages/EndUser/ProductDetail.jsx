import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH, BASE_URL } from "../../utils/apiPath";
import { toast } from "react-hot-toast";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import NavLayout from "../../components/auth/NavLayout";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [selectedQty, setSelectedQty] = useState("");
  const [activeSlabIndex, setActiveSlabIndex] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get(
          `${BASE_URL}${API_PATH.PRODUCTS.GET_ONE(id)}`
        );
        setProduct(data);
        setActiveImage(data.images?.[0] || "");
        autoSelectSlab(data, 1);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ===== ZOOM HANDLERS =====

  // Desktop
  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center",
      transform: "scale(1)",
    });
  };

  // Mobile
  const handleTouchMove = (e) => {
    const touch = e.touches[0];

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((touch.clientX - left) / width) * 100;
    const y = ((touch.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleTouchEnd = () => {
    setZoomStyle({
      transformOrigin: "center",
      transform: "scale(1)",
    });
  };

  // ===== LOGIC =====

  const handleQuantityChange = (value) => {
    if (value === "") {
      setSelectedQty("");
      setActiveSlabIndex(null);
      return;
    }

    if (!/^\d+$/.test(value)) return;

    let qty = Number(value);

    if (qty > product.stock) {
      toast.error("Cannot exceed available stock");
      qty = product.stock;
    }

    setSelectedQty(qty.toString());
    autoSelectSlab(product, qty);
  };

  const getBasePrice = () => {
    if (!product) return 0;
    if (!user || user.role === "enduser") return product.prices?.enduser || 0;
    if (user.role === "reseller") return product.prices?.reseller || 0;
    if (user.role === "distributor") return product.prices?.distributor || 0;
    return product.prices?.enduser || 0;
  };

  const autoSelectSlab = (productData, quantity) => {
    const slabs = productData.quantityBasedPrices || [];
    const index = slabs.findIndex(
      (slab) =>
        quantity >= slab.minQty &&
        (!slab.maxQty || quantity <= slab.maxQty)
    );
    setActiveSlabIndex(index !== -1 ? index : null);
  };

  const handleAddToCart = async () => {
    if (product.stock <= 0) return toast.error("Out of stock");
    if (!selectedQty || Number(selectedQty) < 1)
      return toast.error("Enter quantity");

    try {
      const res = await axiosInstance.post(
        `${BASE_URL}${API_PATH.CART.ADD}`,
        {
          productId: product._id,
          quantity: Number(selectedQty),
        }
      );
      if (res.status === 200) toast.success("Added to cart");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add");
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const res = await axiosInstance.post(
        `${BASE_URL}${API_PATH.WISHLIST.ADD}`,
        { productId: product._id }
      );
      if (res.status === 200) toast.success("Added to wishlist");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          url: window.location.href,
        });
      } catch {
        toast.error("Share failed");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied");
    }
  };

  const basePrice = getBasePrice();
  const selectedSlab = product?.quantityBasedPrices?.[activeSlabIndex];
  const finalPrice = selectedSlab?.price || basePrice;

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <NavLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-10">

          {/* LEFT: IMAGE */}
          <div>
            <div
              className="relative h-96 bg-white rounded-xl overflow-hidden border"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={activeImage}
                alt=""
                className="w-full h-full object-contain transition-transform duration-300"
                style={{
                  ...zoomStyle,
                  transform: zoomStyle.transform || "scale(1)",
                }}
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4 flex-wrap">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveImage(img)}
                  className={`h-20 w-20 object-cover cursor-pointer border rounded ${
                    activeImage === img ? "border-cyan-500" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: INFO */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>

            <p className="text-cyan-600 text-2xl font-bold">
              ₹{finalPrice}
            </p>

            <input
              type="number"
              value={selectedQty}
              onChange={(e) => handleQuantityChange(e.target.value)}
              placeholder="qty"
              className="border p-2 w-24 text-xl font-medum "
            />

            <div className="flex gap-3 items-center">
              <button
                onClick={handleAddToCart}
                className="bg-cyan-500 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <ShoppingCart size={16} /> Add to cart
              </button>

              <button onClick={handleAddToWishlist}>
                <Heart />
              </button>

              <button onClick={handleShare}>
                <Share2 />
              </button>
            </div>

            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </NavLayout>
  );
};

export default ProductDetail;
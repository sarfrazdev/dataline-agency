
export const calculateDynamicPrice = (product, userRole, quantity) => {
  //  Base price based on user role
  const basePrice = product.prices[userRole] || product.prices.enduser;


  let discountPercent = 0;

  //  Check quantity-based discounts (if set in product)
  if (product.quantityDiscounts && product.quantityDiscounts.length > 0) {
    for (const rule of product.quantityDiscounts) {
      if (quantity >= rule.minQty && quantity <= rule.maxQty) {
        discountPercent = rule.discountPercent;
        break;
      }
    }
  }

  //  Final price calculation
  const finalPrice = basePrice * (1 - discountPercent / 100);

  return {
    basePrice,
    discountPercent,
    finalPrice
  };
};

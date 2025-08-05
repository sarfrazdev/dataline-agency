
 //export const BASE_URL = 'http://localhost:8000/api';
export const BASE_URL = 'https://api.dataline.co.in/api';


export const API_PATH = {
  // 🔐 Auth
  AUTH: {
    LOGIN: '/auth/login',
    ADMIN_LOGIN: '/auth/admin/login',
    GET_USER: '/auth/me',
    REGISTER: {
      ENDUSER: '/auth/register/enduser',
      RESELLER: '/auth/register/reseller',
      DISTRIBUTOR: '/auth/register/distributor',
    },
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    FIND_ID: '/auth/find-id',
  },

  // 🛍️ Products
  PRODUCTS: {
    GET_ALL: '/products',
    GET_ONE: (id) => `/products/${id}`,
    CREATE: '/products/create',
    UPDATE: (id) => `/products/${id}`,
    DELETE: (id) => `/products/${id}`,
  },

  // 🛒 Cart
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: (itemId) => `/cart/update/${itemId}`,
    REMOVE: (itemId) => `/cart/remove/${itemId}`,
  },

  // 💖 Wishlist
  WISHLIST: {
    GET: '/wishlist/get',
    ADD: '/wishlist/add',
    REMOVE: '/wishlist/remove',
  },

  // 📦 Orders
  ORDERS: {
    CREATE: '/orders',
    VERIFY_PAYMENT: '/orders/verify',
    GET_USER_ORDERS: '/orders',
    GET_RESELLER_ORDERS: '/reseller/orders',
    GET_DISTRIBUTOR_ORDERS: '/distributor/orders',
    GET_ALL: '/admin/orders',
    CANCEL_ORDERS: (orderId) => `/orders/cancel/${orderId}`,
    UPDATE_STATUS: (orderId) => `/dashboard/${orderId}/status`,
       DELETE_BILL: (id) => `/orders/bill/${id}`,
  },

  // 👤 Enduser Admin Panel
  ENDUSER_ADMIN: {
    GET_ORDERS: '/enduser/orders',
    GET_NOTIFICATIONS: '/enduser/notifications',
    UPDATE_PROFILE: '/enduser/profile',
    UPDATE_ORDER_STATUS: (orderId) => `/dashboard/${orderId}/status`,
    UPLOAD_BILL: (orderId) => `/orders/bill/${orderId}`,
  },

  // 👤 Reseller Admin Panel
  RESELLER_ADMIN: {
    GET_ORDERS: '/reseller/orders',
    GET_NOTIFICATIONS: '/reseller/notifications',
    UPDATE_PROFILE: '/reseller/profile',
    UPDATE_ORDER_STATUS: (orderId) => `/dashboard/${orderId}/status`,
  },

  // 👤 Distributor Admin Panel
  DISTRIBUTOR_ADMIN: {
      GET_DASHBOARD: '/dashboard/distributor',
    GET_ORDERS: '/distributor/orders',
    GET_PRODUCTS: '/distributor/products',
    GET_NOTIFICATIONS: '/distributor/notifications',
    UPDATE_PROFILE: '/distributor/profile',
     UPDATE_ORDER_STATUS: (orderId) => `/dashboard/${orderId}/status`,
  },

  // 💳 Payment
  PAYMENT: {
    CREATE_ORDER: '/orders',
    VERIFY: '/orders/verify',
   UPDATE_PAYMENT_STATUS: (id) => `/dashboard/orders/${id}/payment`, 

  },

  // 📣 Notifications
  NOTIFICATIONS: {
    CREATE: '/notifications/create',
    GET_ALL: '/notifications',
    GET_RESELLER: '/reseller/notifications',
    GET_DISTRIBUTOR: '/distributor/notifications',
  },

  // 💰 Pricing
  PRICING: {
    CALCULATE: '/pricing/calculate',
  },

  // ⭐ Reviews
  REVIEWS: {
    CREATE: '/reviews/create',
    DELETE: (reviewId) => `/reviews/${reviewId}`,
  },

  // 👥 Super Admin (Users Management)
  USERS: {
    GET_ALL: '/admin/users',
    DELETE: (id) => `/admin/users/${id}`,
  },

  // 🖥️ Admin Panels Routing
  ADMIN_PANEL: {
    SUPER_ADMIN: '/dashboard/super-admin',
    RESELLER_ADMIN: '/dashboard/reseller',
    DISTRIBUTOR_ADMIN: '/dashboard/distributor',
    ENDUSER_ADMIN: '/dashboard/user',
  },

  // 📈 Analytics & Reports
  ANALYTICS: {
    GET_DASHBOARD: '/admin/analytics',
  },

  // 📁 File Uploads
  FILES: {
    UPLOAD_IMAGE: '/files/upload',
}
};

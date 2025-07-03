
export const ROLES = {
  SUPERADMIN: 'superadmin',
  ENDUSER_ADMIN: 'enduser-admin',
  RESELLER_ADMIN: 'reseller-admin',
  DISTRIBUTOR_ADMIN: 'distributor-admin',
  ENDUSER: 'enduser',
  RESELLER: 'reseller',
  DISTRIBUTOR: 'distributor'
};

export const ORDER_STATUS = {
  PLACED: 'placed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed'
};

export const ERROR_MESSAGES = {
  SERVER_ERROR: 'Internal server error',
  UNAUTHORIZED: 'Not authorized to access this resource',
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Bad request'
};

export const NOTIFICATION_TYPES = {
  OFFER: 'offer',
  ALERT: 'alert',
  REMINDER: 'reminder'
};

export const DEFAULT_PAGE_SIZE = 10; 
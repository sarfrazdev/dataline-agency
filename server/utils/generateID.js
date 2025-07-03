import User from '../models/User.js'; 

export const generateId = async (type) => {
  const prefixes = {
    reseller: 'RES-',
    distributor: 'DIST-',
   
  };

  if (!prefixes[type]) {
    throw new Error('Invalid ID type. Use "reseller", "distributor".');
  }

  const prefix = prefixes[type];
  const field = {
    reseller: 'resellerId',
    distributor: 'distributorId',

  }[type];

  let uniqueId;
  let isUnique = false;
  const maxAttempts = 10;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
 
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    uniqueId = `${prefix}${randomNum}`;


    const existingUser = await User.findOne({ [field]: uniqueId });
    if (!existingUser) {
      isUnique = true;
      break;
    }
  }

  if (!isUnique) {
    throw new Error(`Failed to generate unique ${type} ID after ${maxAttempts} attempts`);
  }

  return uniqueId;
};


import Shipment from "../models/shipment.js";

// export const createShipment = async (req, res) => {
//     try {
//         if (!req.user || !req.user._id) {
//             return res.status(401).json({ error: "Authentication required" });
//         }

//         const shipment = new Shipment({
//             ...req.body,
//             user: req.user._id, // Ensure this is set
//             userRole: req.body.userRole || 'enduser'
//         });
//         console.log('Headers:', req.headers); // Check if Authorization header exists
//         console.log('User:', req.user); // Check if user is populated
    
//         await shipment.save();
//         res.status(201).json({ message: 'Shipment details saved', shipment });
//     } catch (error) {
//         console.error('Shipment Error:', error);
//         res.status(500).json({ error: error.message });
//     }
// };
export const getMyShipment = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const shipment = await Shipment.findOne({ user: req.user._id });
        if (!shipment) {
            return res.status(404).json({ message: 'No saved shipment found.' });
        }

        res.status(200).json({ shippingInfo: shipment });
    } catch (err) {
        console.error('Shipment Fetch Error:', err);
        res.status(500).json({ message: 'Server error fetching shipment info.' });
    }
};

// export const createShipment = async (req, res) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(401).json({ error: "Authentication required" });
//     }

//     // ✅ Prevent duplicate _id if accidentally sent from frontend
//     const { _id, ...shipmentData } = req.body;

//     const shipment = new Shipment({
//       ...shipmentData,
//       user: req.user._id,
//       userRole: req.body.userRole || 'enduser',
//     });

//     console.log('Headers:', req.headers);
//     console.log('User:', req.user);

//     await shipment.save();
//     res.status(201).json({ message: 'Shipment details saved', shipment });
//   } catch (error) {
//     console.error('Shipment Error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };


export const createShipment = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // Remove _id if sent from frontend accidentally
    const { _id, ...shipmentData } = req.body;

    // Create new shipment document
    const shipment = new Shipment({
      ...shipmentData,
      user: req.user._id,
      userRole: req.body.userRole || 'enduser',
    });

    console.log('📦 Shipment creation by:', req.user.email);
    console.log('📦 Data:', shipmentData);

    await shipment.save();

    res.status(201).json({ message: 'Shipment details saved', shipment });
  } catch (error) {
    console.error('❌ Shipment Error:', error);
    res.status(500).json({ error: error.message });
  }
};

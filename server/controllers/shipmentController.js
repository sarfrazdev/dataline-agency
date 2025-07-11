import Shipment from "../models/shipment.js";

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

//     // Remove _id if sent from frontend accidentally
//     const { _id, ...shipmentData } = req.body;

//     // Create new shipment document
//     const shipment = new Shipment({
//       ...shipmentData,
//       user: req.user._id,
//       userRole: req.body.userRole || 'enduser',
//     });

//     // console.log('📦 Shipment creation by:', req.user.email);
//     // console.log('📦 Data:', shipmentData);

//     await shipment.save();

//     res.status(201).json({ message: 'Shipment details saved', shipment });
//   } catch (error) {
//     console.error('❌ Shipment Error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };


export const createShipment = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // Remove _id if sent accidentally
    const { _id, ...shipmentData } = req.body;

    // Check if shipment already exists for the user
    const existingShipment = await Shipment.findOne({ user: req.user._id });

    if (existingShipment) {
      // Update the existing one
      existingShipment.set(shipmentData);
      await existingShipment.save();

      return res.status(200).json({
        message: 'Shipment info updated successfully',
        shipment: existingShipment,
      });
    }

    // Create new shipment
    const newShipment = new Shipment({
      ...shipmentData,
      user: req.user._id,
      userRole: req.body.userRole || 'enduser',
    });

    await newShipment.save();

    return res.status(201).json({
      message: 'Shipment created successfully',
      shipment: newShipment,
    });

  } catch (error) {
    console.error('❌ Shipment Save Error:', error);
    res.status(500).json({ error: error.message });
  }
};

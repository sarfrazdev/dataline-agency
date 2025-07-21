import transporter from "../config/emailConfig.js"
import dotenv from 'dotenv';
dotenv.config();

export const sendAdminOrderEmail = async (user, order, products = []) => {
  try {
    const role = user.role?.toLowerCase() || 'enduser';

    const roleBasedAdmin = {
      enduser: process.env.ENDUSER_ADMIN_EMAIL,
      reseller: process.env.RESELLER_ADMIN_EMAIL,
      distributor: process.env.DISTRIBUTOR_ADMIN_EMAIL
    };

    const targetAdminEmail = roleBasedAdmin[role] || process.env.SUPER_ADMIN_EMAIL;
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;

    // ✅ Debug logs
    console.log("📤 Calling sendAdminOrderEmail...");
    console.log("👤 User:", user?.email);
    console.log("📦 Order ID:", order?._id);
    console.log("📨 Sending email to:", [targetAdminEmail, ...(targetAdminEmail !== superAdminEmail ? [superAdminEmail] : [])]);

    const shipping = order.shippingInfo || {};

    const productRows = products.map((item, index) => `
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px;">${index + 1}</td>
        <td style="padding: 8px;">${item.name}</td>
        <td style="padding: 8px;">${item.quantity}</td>
        <td style="padding: 8px;">₹${item.price.toFixed(2)}</td>
        <td style="padding: 8px;">₹${item.total.toFixed(2)}</td>
      </tr>
    `).join('');

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto;">
        <h2 style="text-align: center; color: #2e86de;">🧾 New Order Placed</h2>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>

        <h3>👤 Customer Details</h3>
        <p><strong>Name:</strong> ${user.name || 'N/A'}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${shipping.phone || 'N/A'}</p>
        <p><strong>Role:</strong> ${user.role}</p>

        <h3>🏢 Company Info</h3>
        <p><strong>Business Name:</strong> ${shipping.businessName || 'N/A'}</p>
        <p><strong>GST No:</strong> ${shipping.gstNumber || 'N/A'}</p>
        <p><strong>Company Address:</strong> ${shipping.companyAddress || 'N/A'}</p>

        <h3>📦 Shipping Address</h3>
        <p>${shipping.address || ''}, ${shipping.city || ''}, ${shipping.state || ''} - ${shipping.pincode || ''}</p>

        <h3>🛍️ Ordered Items</h3>
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #ccc;">
          <thead>
            <tr style="background-color: #f4f4f4;">
              <th style="padding: 8px;">#</th>
              <th style="padding: 8px;">Product</th>
              <th style="padding: 8px;">Qty</th>
              <th style="padding: 8px;">Unit Price</th>
              <th style="padding: 8px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
          </tbody>
        </table>

        <h3 style="text-align: right;">💰 Total: ₹${order.totalAmount.toFixed(2)}</h3>
        <p><strong>Payment Method:</strong> ${order.paymentMethod || 'N/A'}</p>

        <p style="margin-top: 30px;">Regards,<br/>Hubnet Team</p>
      </div>
    `;

    // 📧 Send to both role admin & superadmin
    const toEmails = [targetAdminEmail];
    if (targetAdminEmail !== superAdminEmail) {
      toEmails.push(superAdminEmail);
    }

    await transporter.sendMail({
      from: `"Order Alert" <${process.env.SMTP_USER}>`,
      to: toEmails,
      subject: `🛒 New Order from ${user.name || 'Unknown'} (${user.role || 'enduser'})`,
      html: emailHTML
    });

    console.log("✅ Email sent successfully!");

  } catch (err) {
    console.error('❌ Error sending order email:', err);
  }
};

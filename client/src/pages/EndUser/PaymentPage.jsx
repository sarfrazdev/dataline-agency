import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { BASE_URL } from '../../utils/apiPath';
import NavLayout from '../../components/auth/NavLayout';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { shippingInfo } = location.state || {};
  const userRole = localStorage.getItem('role') || 'enduser';
  const [proofFile, setProofFile] = useState(null);

  useEffect(() => {
    if (!shippingInfo) {
      toast.error('Missing shipping info.');
      navigate('/checkout');
    }
  }, [shippingInfo, navigate]);

  const handleRazorpayPayment = async () => {
    try {
      toast.loading('Creating order...');
      const { data } = await axiosInstance.post(`${BASE_URL}/orders`, { shippingInfo });
      const { orderId, razorpayOrderId, amount, currency, keyId } = data;

      const options = {
        key: keyId,
        amount: amount.toString(),
        currency,
        name: 'Dataline',
        description: 'Order Payment',
        order_id: razorpayOrderId,
        handler: async function (response) {
          await axiosInstance.post(`${BASE_URL}/payment/verify`, {
            orderId,
            paymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });
          toast.dismiss();
          toast.success('Payment successful!');
          navigate('/orders');
        },
        prefill: {
          name: shippingInfo.fullName,
          email: '',
          contact: shippingInfo.phone
        },
        theme: { color: '#22d3ee' }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      toast.dismiss();
      toast.error('Failed to initiate Razorpay');
      console.error(err);
    }
  };

  const submitManualOrder = async () => {
    if (!proofFile) return toast.error('Upload payment proof');

    try {
      toast.loading('Submitting manual order...');
      const formData = new FormData();
      formData.append('paymentProof', proofFile);
      formData.append('data', JSON.stringify({ shippingInfo }));

      await axiosInstance.post(`${BASE_URL}/orders/manual`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.dismiss();
      toast.success('Order placed! Awaiting confirmation');
      navigate('/orders');
    } catch (err) {
      toast.dismiss();
      toast.error('Manual order failed');
      console.error(err);
    }
  };

  if (!shippingInfo) return null;

  return (
  <NavLayout>
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-cyan-50 px-4 py-12">
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
        Complete Payment
      </h1>

      {/* ENDUSER */}
      {userRole === 'enduser' && (
        <div className="space-y-6">

          {/* Bank Card */}
          <div className="bg-gray-50 border rounded-xl p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 border-l-4 border-teal-500 pl-2">
              Bank Transfer
            </h2>

            <ul className="text-sm text-gray-700 space-y-1 mb-4">
              <li><strong>A/C Holder:</strong> Dataline Agencies</li>
              <li><strong>Bank:</strong> ICICI BANK</li>
              <li><strong>Account No:</strong> 625905052227</li>
              <li><strong>IFSC:</strong> ICIC0006259</li>
              <li><strong>Branch:</strong> Exhibition Road</li>
            </ul>

            {/* Upload */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600">
                Upload Payment Proof (jpg/png/pdf)
              </label>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => setProofFile(e.target.files[0])}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* CTA */}
            <button
              onClick={submitManualOrder}
              className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow hover:scale-[1.02] transition"
            >
              Submit Bank Transfer
            </button>
          </div>
        </div>
      )}

      {/* RESELLER / DISTRIBUTOR */}
      {['reseller', 'distributor'].includes(userRole) && (
        <div className="space-y-6">

          <div className="bg-gray-50 border rounded-xl p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 border-l-4 border-teal-500 pl-2">
              Bank Details
            </h2>

            <ul className="text-sm text-gray-700 space-y-1 mb-4">
              <li><strong>A/C Holder:</strong> Dataline Agencies</li>
              <li><strong>Bank:</strong> ICICI BANK</li>
              <li><strong>Account No:</strong> 625905052227</li>
              <li><strong>IFSC:</strong> ICIC0006259</li>
              <li><strong>Branch:</strong> Exhibition Road</li>
            </ul>

            {/* Upload */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600">
                Upload Payment Proof (jpg/png/pdf)
              </label>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => setProofFile(e.target.files[0])}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* CTA */}
            <button
              onClick={submitManualOrder}
              className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow hover:scale-[1.02] transition"
            >
              Submit Order
            </button>
          </div>
        </div>
      )}

    </div>
  </div>
</NavLayout>
  );
};

export default PaymentPage;
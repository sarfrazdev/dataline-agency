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
      formData.append('proof', proofFile);
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
      <div className="max-w-xl mx-auto mt-12 bg-[#151518] p-6 rounded-lg shadow-lg text-white">
        <h1 className="text-2xl font-bold text-cyan-400 mb-4">Complete Payment</h1>

        {/* ✅ Razorpay + Manual for Enduser */}
        {userRole === 'enduser' && (
          <>
            <button
              onClick={handleRazorpayPayment}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg mb-6"
            >
              Pay with Razorpay
            </button>

            <div className="border border-gray-600 p-4 rounded">
              <h2 className="text-lg font-semibold text-cyan-300 mb-2">Bank Transfer Option (Alternative)</h2>
              <ul className="text-sm mb-4 space-y-1">
                <li><strong>A/C Holder:</strong> Dataline Agencies</li>
                <li><strong>Bank:</strong> ICICI BANK</li>
                <li><strong>Acc No:</strong> 625905052227</li>
                <li><strong>IFSC:</strong> ICIC0006259</li>
                <li><strong>Branch:</strong> EXHIBITION ROAD</li>
              </ul>
              <label className="block mb-2 text-sm">Upload Payment Proof (jpg/png/pdf)</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => setProofFile(e.target.files[0])}
                className="bg-[#1e1e24] border border-gray-600 rounded px-4 py-2 w-full text-white"
              />
              <button
                onClick={submitManualOrder}
                className="mt-4 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded"
              >
                Submit Bank Transfer
              </button>
            </div>
          </>
        )}

        {/* ✅ Only Bank Transfer for Reseller/Distributor */}
        {['reseller', 'distributor'].includes(userRole) && (
          <div>
            <h2 className="text-lg font-semibold text-cyan-300 mb-2">Bank Details</h2>
            <ul className="text-sm mb-4 space-y-1">
              <li><strong>A/C Holder:</strong> Dataline Agencies</li>
              <li><strong>Bank:</strong> ICICI BANK</li>
              <li><strong>Acc No:</strong> 625905052227</li>
              <li><strong>IFSC:</strong> ICIC0006259</li>
              <li><strong>Branch:</strong> EXHIBITION ROAD</li>
            </ul>

            <label className="block mb-2 text-sm">Upload Payment Proof (jpg/png/pdf)</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => setProofFile(e.target.files[0])}
              className="bg-[#1e1e24] border border-gray-600 rounded px-4 py-2 w-full text-white"
            />
            <button
              onClick={submitManualOrder}
              className="mt-4 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded"
            >
              Submit Order
            </button>
          </div>
        )}
      </div>
    </NavLayout>
  );
};

export default PaymentPage;
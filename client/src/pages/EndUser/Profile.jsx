import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import NavLayout from '../../components/auth/NavLayout';
import { API_PATH, BASE_URL } from '../../utils/apiPath';
import {
  User, Mail, Shield, BadgeDollarSign, BadgePercent
} from 'lucide-react';

const Profiles = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const { data } = await axiosInstance.get(`${BASE_URL}${API_PATH.AUTH.GET_USER}`);
      setProfile(data.user);
      setLoading(false);
    } catch (err) {
      console.error('Profile load error:', err);
      toast.error('Failed to load profile');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <NavLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <span className="text-lg text-gray-600 animate-pulse">Loading profile...</span>
        </div>
      </NavLayout>
    );
  }

  if (!profile) {
    return (
      <NavLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <span className="text-lg text-gray-600">No profile data found.</span>
        </div>
      </NavLayout>
    );
  }

  return (
    <NavLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10">
        <div className="max-w-4xl mx-auto px-4">

          {/* Header Card */}
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-2xl rounded-3xl"></div>

            <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${profile.name}&background=2563eb&color=fff`}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full shadow-lg ring-4 ring-white"
                />
              </div>

              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-sm text-gray-500 mt-1 capitalize">{profile.role}</p>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-6">

            <ProfileField label="Name" value={profile.name} Icon={User} />
            <ProfileField label="Email" value={profile.email} Icon={Mail} />
            <ProfileField label="Role" value={profile.role} Icon={Shield} />

            {profile.resellerId && (
              <ProfileField label="Reseller ID" value={profile.resellerId} Icon={BadgeDollarSign} />
            )}

            {profile.distributorId && (
              <ProfileField label="Distributor ID" value={profile.distributorId} Icon={BadgePercent} />
            )}

          </div>

        </div>
      </div>
    </NavLayout>
  );
};


// 🔥 Premium Field Row
const ProfileField = ({ label, value, Icon }) => (
  <div className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-none">

    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md">
        <Icon className="w-5 h-5" />
      </div>

      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-base font-semibold text-gray-900">{value}</p>
      </div>
    </div>

  </div>
);

export default Profiles;
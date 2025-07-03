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
        <div className="flex justify-center items-center min-h-[60vh] text-white">
          <span className="text-lg animate-pulse">Loading profile...</span>
        </div>
      </NavLayout>
    );
  }

  if (!profile) {
    return (
      <NavLayout>
        <div className="flex justify-center items-center min-h-[60vh] text-white">
          <span className="text-lg">No profile data found.</span>
        </div>
      </NavLayout>
    );
  }

  return (
    <NavLayout>
      <div className="container mx-auto px-4 py-8 text-white max-w-4xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-500 rounded-2xl shadow-lg p-8 text-center mb-10">
          <div className="flex justify-center mb-4">
            <img
              src={`https://ui-avatars.com/api/?name=${profile.name}&background=0D8ABC&color=fff`}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="text-sm text-white/80 mt-1 capitalize">{profile.role}</p>
        </div>

        {/* Profile Card */}
        <div className="bg-[#1e1e1e] p-6 md:p-8 rounded-2xl shadow-xl space-y-6">
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
    </NavLayout>
  );
};

// Reusable Profile Field Component
const ProfileField = ({ label, value, Icon }) => (
  <div className="flex items-start gap-4">
    <div className="bg-teal-600 p-2 rounded-lg">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  </div>
);

export default Profiles;

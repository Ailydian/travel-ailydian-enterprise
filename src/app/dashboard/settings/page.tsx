'use client';

import React, { useState } from 'react';
import {
  useProfileSettings,
  useUpdateProfileSettings,
  usePaymentSettings,
  useUpdatePaymentSettings,
  useSecuritySettings,
} from '@/hooks/useDashboardHooks';
import {
  User,
  Home,
  Bell,
  CreditCard,
  Shield,
  Save,
  Upload,
  Edit,
  Trash2,
  Plus,
  Check,
  X,
  Lock,
  Smartphone,
  Mail,
  Eye,
  EyeOff
} from 'lucide-react';

// Tab Button Component
interface TabButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
        isActive
          ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
          : 'text-gray-600 hover:bg-gray-50 border-2 border-transparent'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

// Profile Tab Component
const ProfileTab: React.FC = () => {
  const { data: profile } = useProfileSettings();
  const { mutate: updateProfile } = useUpdateProfileSettings();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate host with 5+ years of experience in hospitality.',
    location: 'San Francisco, CA',
    languages: ['English', 'Spanish'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your personal information</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {formData.name.charAt(0)}
          </div>
          <div>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-medium mb-2"
            >
              <Upload className="w-4 h-4" />
              Upload Photo
            </button>
            <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size 5MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            disabled={!isEditing}
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>

        {isEditing && (
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

// Properties Tab Component
const PropertiesTab: React.FC = () => {
  const properties = [
    { id: '1', name: 'Beachfront Villa', location: 'Malibu, CA', status: 'Active' },
    { id: '2', name: 'Mountain Cabin', location: 'Aspen, CO', status: 'Active' },
    { id: '3', name: 'City Apartment', location: 'New York, NY', status: 'Active' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">My Properties</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your property listings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          <Plus className="w-4 h-4" />
          Add Property
        </button>
      </div>

      <div className="space-y-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-lg">
                {property.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{property.name}</h4>
                <p className="text-sm text-gray-500">{property.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                {property.status}
              </span>
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Notifications Tab Component
const NotificationsTab: React.FC = () => {
  const [settings, setSettings] = useState({
    emailBookings: true,
    emailMessages: true,
    emailReviews: true,
    emailReports: false,
    pushBookings: true,
    pushMessages: true,
    smsEnabled: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage how you receive notifications</p>
      </div>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Notifications
          </h3>
          <div className="space-y-3">
            {[
              { key: 'emailBookings' as const, label: 'New Bookings', desc: 'Get notified when you receive a new booking' },
              { key: 'emailMessages' as const, label: 'New Messages', desc: 'Receive email alerts for new guest messages' },
              { key: 'emailReviews' as const, label: 'Reviews', desc: 'Get notified when guests leave reviews' },
              { key: 'emailReports' as const, label: 'Weekly Reports', desc: 'Receive weekly performance summaries' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleToggle(item.key)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings[item.key] ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      settings[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Push Notifications */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Push Notifications
          </h3>
          <div className="space-y-3">
            {[
              { key: 'pushBookings' as const, label: 'Booking Updates', desc: 'Real-time booking notifications' },
              { key: 'pushMessages' as const, label: 'Messages', desc: 'Instant message alerts' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleToggle(item.key)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings[item.key] ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      settings[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
          <Save className="w-4 h-4" />
          Save Notification Settings
        </button>
      </div>
    </div>
  );
};

// Payments Tab Component
const PaymentsTab: React.FC = () => {
  const { data: paymentSettings } = usePaymentSettings();
  const { mutate: updatePaymentSettings } = useUpdatePaymentSettings();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Payment Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your payout methods and schedule</p>
      </div>

      <div className="space-y-6">
        {/* Bank Account */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Account</h3>
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">No bank account connected</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Add Bank Account
            </button>
          </div>
        </div>

        {/* Payout Schedule */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payout Schedule</h3>
          <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Accounts</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">PayPal</p>
                  <p className="text-sm text-gray-500">Not connected</p>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                Connect
              </button>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Stripe</p>
                  <p className="text-sm text-gray-500">Not connected</p>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Security Tab Component
const SecurityTab: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your account security</p>
      </div>

      <div className="space-y-6">
        {/* Change Password */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Update Password
            </button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                  twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
          {twoFactorEnabled && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900 mb-3">
                Scan this QR code with your authenticator app to enable 2FA
              </p>
              <div className="w-48 h-48 bg-white border-2 border-blue-300 rounded-lg mx-auto flex items-center justify-center">
                <Smartphone className="w-12 h-12 text-gray-400" />
              </div>
            </div>
          )}
        </div>

        {/* Active Sessions */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Chrome on MacBook Pro</p>
                <p className="text-sm text-gray-500">San Francisco, CA • Last active: Just now</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                Current
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Settings Component
const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'properties' | 'notifications' | 'payments' | 'security'>('profile');

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'properties' as const, label: 'Properties', icon: <Home className="w-5 h-5" /> },
    { id: 'notifications' as const, label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'payments' as const, label: 'Payments', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'security' as const, label: 'Security', icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black neon-text-strong mb-6" style={{ color: 'var(--tx-1)' }}>
        Settings
      </h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl p-3">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  label={tab.label}
                  icon={tab.icon}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'properties' && <PropertiesTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'payments' && <PaymentsTab />}
          {activeTab === 'security' && <SecurityTab />}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

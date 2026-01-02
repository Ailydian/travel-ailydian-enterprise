import React, { useState } from 'react';
import {
  User,
  Building2,
  CreditCard,
  Bell,
  Shield,
  FileText,
  Camera,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  X,
  Save,
  Eye,
  EyeOff,
  Download,
  Smartphone,
  Lock,
  Key,
  History,
  Globe,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle2,
  XCircle } from 'lucide-react';

// Mock user data
const mockUserData = {
  profile: {
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    phone: '+90 532 123 45 67',
    avatar: null,
    businessName: 'Premium Rent A Car',
    taxNumber: '1234567890',
    taxOffice: 'Kadıköy',
    address: 'Atatürk Cad. No:123 Kadıköy/İstanbul'
  },
  business: {
    operatingHours: {
      monday: { open: '09:00', close: '18:00', enabled: true },
      tuesday: { open: '09:00', close: '18:00', enabled: true },
      wednesday: { open: '09:00', close: '18:00', enabled: true },
      thursday: { open: '09:00', close: '18:00', enabled: true },
      friday: { open: '09:00', close: '18:00', enabled: true },
      saturday: { open: '10:00', close: '16:00', enabled: true },
      sunday: { open: '', close: '', enabled: false }
    },
    serviceAreas: ['Kadıköy', 'Beşiktaş', 'Şişli', 'Bakırköy'],
    autoAccept: false,
    minRentalDays: 1,
    maxRentalDays: 30,
    cancellationPolicy: '24h'
  },
  payment: {
    bankName: 'Garanti BBVA',
    iban: 'TR12 3456 7890 1234 5678 9012 34',
    accountHolder: 'Ahmet Yılmaz',
    invoiceEmail: 'ahmet.yilmaz@example.com',
    taxRate: 18
  },
  notifications: {
    email: {
      newBooking: true,
      bookingCancellation: true,
      paymentReceived: true,
      newReview: true,
      marketing: false
    },
    sms: {
      newBooking: true,
      bookingCancellation: true,
      paymentReceived: false
    },
    push: {
      newBooking: true,
      bookingCancellation: true,
      newMessage: true,
      newReview: true
    }
  },
  security: {
    twoFactorEnabled: false,
    lastPasswordChange: '2024-11-15',
    loginHistory: [
    { date: '2024-01-15 14:30', location: 'Istanbul, Turkey', device: 'Chrome on MacOS', ip: '192.168.1.1' },
    { date: '2024-01-14 09:15', location: 'Istanbul, Turkey', device: 'Safari on iPhone', ip: '192.168.1.2' },
    { date: '2024-01-13 16:45', location: 'Istanbul, Turkey', device: 'Chrome on MacOS', ip: '192.168.1.1' }]

  }
};

type TabType = 'account' | 'business' | 'payment' | 'notifications' | 'security' | 'legal';

interface Toast {
  id: number;
  type: 'success' | 'error' | 'warning';
  message: string;
}

export default function VehicleOwnerSettings() {
  const [activeTab, setActiveTab] = useState<TabType>('account');
  const [profileData, setProfileData] = useState(mockUserData.profile);
  const [businessData, setBusinessData] = useState(mockUserData.business);
  const [paymentData, setPaymentData] = useState(mockUserData.payment);
  const [notificationData, setNotificationData] = useState(mockUserData.notifications);
  const [securityData, setSecurityData] = useState(mockUserData.security);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<string>('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const addToast = (type: 'success' | 'error' | 'warning', message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const handleSaveProfile = () => {
    addToast('success', 'Profil bilgileri başarıyla güncellendi');
  };

  const handleSaveBusiness = () => {
    addToast('success', 'İşletme bilgileri başarıyla güncellendi');
  };

  const handleSavePayment = () => {
    addToast('success', 'Ödeme bilgileri başarıyla güncellendi');
  };

  const handleSaveNotifications = () => {
    addToast('success', 'Bildirim tercihleri başarıyla güncellendi');
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      addToast('error', 'Yeni şifreler eşleşmiyor');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      addToast('error', 'Şifre en az 8 karakter olmalıdır');
      return;
    }
    addToast('success', 'Şifreniz başarıyla değiştirildi');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowModal(false);
  };

  const handleToggle2FA = () => {
    setSecurityData((prev) => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled
    }));
    addToast('success', `İki faktörlü doğrulama ${!securityData.twoFactorEnabled ? 'etkinleştirildi' : 'devre dışı bırakıldı'}`);
  };

  const tabs = [
  { id: 'account' as TabType, label: 'Hesap Bilgileri', icon: User },
  { id: 'business' as TabType, label: 'İşletme', icon: Building2 },
  { id: 'payment' as TabType, label: 'Ödeme', icon: CreditCard },
  { id: 'notifications' as TabType, label: 'Bildirimler', icon: Bell },
  { id: 'security' as TabType, label: 'Güvenlik', icon: Shield },
  { id: 'legal' as TabType, label: 'Yasal', icon: FileText }];


  return (
    <div className="min-h-screen bg-white/10 backdrop-blur-xl border border-white/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2" style={{ color: '#000000' }}>
            Ayarlar
          </h1>
          <p className="text-lg" style={{ color: '#666666' }}>
            Hesabınızı ve tercihlerinizi yönetin
          </p>
        </div>

        {/* Toast Container */}
        {toasts.length > 0 &&
        <div className="fixed top-6 right-6 z-50 space-y-3">
            {toasts.map((toast) =>
          <div
            key={toast.id}
            className="rounded-xl p-4 shadow-lg border-2 flex items-center gap-3 min-w-[300px] animate-slide-in"
            style={{
              backgroundColor: 'var(--lydian-text-inverse)',
              borderColor: toast.type === 'success' ? 'var(--lydian-success)' : toast.type === 'error' ? 'var(--lydian-secondary)' : 'var(--lydian-warning)'
            }}>

                {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-purple-400" />}
                {toast.type === 'error' && <XCircle className="w-5 h-5 text-gray-400" />}
                {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-blue-400" />}
                <span className="flex-1 font-medium" style={{ color: '#000000' }}>{toast.message}</span>
                <button onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}>
                  <X className="w-4 h-4" style={{ color: '#666666' }} />
                </button>
              </div>
          )}
          </div>
        }

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl border-2 shadow-sm mb-6" style={{ borderColor: 'var(--lydian-border)' }}>
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-6 py-4 font-bold whitespace-nowrap transition-all border-b-4"
                  style={{
                    color: isActive ? 'var(--lydian-success-hover)' : '#666666',
                    borderBottomColor: isActive ? 'var(--lydian-success-hover)' : 'transparent',
                    background: isActive ? 'rgba(5, 150, 105, 0.05)' : 'transparent'
                  }}>

                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>);

            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl border-2 shadow-sm p-8" style={{ borderColor: 'var(--lydian-border)' }}>
          {/* Account Tab */}
          {activeTab === 'account' &&
          <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>Profil Bilgileri</h2>

                {/* Profile Photo */}
                <div className="mb-6">
                  <label className="block font-medium mb-3" style={{ color: '#666666' }}>Profil Fotoğrafı</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, var(--lydian-success-hover), var(--lydian-success))' }}>
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, var(--lydian-success-hover), var(--lydian-success))',
                    color: 'white'
                  }}>
                      <Camera className="w-5 h-5" />
                      <span>Fotoğraf Yükle</span>
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium mb-2" style={{ color: '#666666' }}>Ad Soyad</label>
                    <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: 'var(--lydian-border)' }} />

                  </div>
                  <div>
                    <label className="block font-medium mb-2" style={{ color: '#666666' }}>E-posta</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#666666' }} />
                      <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2"
                      style={{ borderColor: 'var(--lydian-border)' }} />

                    </div>
                  </div>
                  <div>
                    <label className="block font-medium mb-2" style={{ color: '#666666' }}>Telefon</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#666666' }} />
                      <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2"
                      style={{ borderColor: 'var(--lydian-border)' }} />

                    </div>
                  </div>
                  <div>
                    <label className="block font-medium mb-2" style={{ color: '#666666' }}>İşletme Adı</label>
                    <input
                    type="text"
                    value={profileData.businessName}
                    onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: 'var(--lydian-border)' }} />

                  </div>
                  <div>
                    <label className="block font-medium mb-2" style={{ color: '#666666' }}>Vergi Numarası</label>
                    <input
                    type="text"
                    value={profileData.taxNumber}
                    onChange={(e) => setProfileData({ ...profileData, taxNumber: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: 'var(--lydian-border)' }} />

                  </div>
                  <div>
                    <label className="block font-medium mb-2" style={{ color: '#666666' }}>Vergi Dairesi</label>
                    <input
                    type="text"
                    value={profileData.taxOffice}
                    onChange={(e) => setProfileData({ ...profileData, taxOffice: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: 'var(--lydian-border)' }} />

                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-medium mb-2" style={{ color: '#666666' }}>Adres</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5" style={{ color: '#666666' }} />
                      <textarea
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      rows={3}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2"
                      style={{ borderColor: 'var(--lydian-border)' }} />

                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, var(--lydian-success-hover), var(--lydian-success))',
                    color: 'white',
                    boxShadow: '0 0 20px rgba(5, 150, 105, 0.3)'
                  }}>

                    <Save className="w-5 h-5" />
                    <span>Kaydet</span>
                  </button>
                </div>
              </div>
            </div>
          }

          {/* Business Tab */}
          {activeTab === 'business' &&
          <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>İşletme Ayarları</h2>

                {/* Operating Hours */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#000000' }}>
                    <Clock className="w-5 h-5" />
                    Çalışma Saatleri
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(businessData.operatingHours).map(([day, hours]) => {
                    const dayNames: Record<string, string> = {
                      monday: 'Pazartesi',
                      tuesday: 'Salı',
                      wednesday: 'Çarşamba',
                      thursday: 'Perşembe',
                      friday: 'Cuma',
                      saturday: 'Cumartesi',
                      sunday: 'Pazar'
                    };
                    return (
                      <div key={day} className="flex items-center gap-4 p-4 rounded-xl border-2" style={{ borderColor: 'var(--lydian-border)' }}>
                          <input
                          type="checkbox"
                          checked={hours.enabled}
                          onChange={(e) => setBusinessData({
                            ...businessData,
                            operatingHours: {
                              ...businessData.operatingHours,
                              [day]: { ...hours, enabled: e.target.checked }
                            }
                          })}
                          className="w-5 h-5 rounded"
                          style={{ accentColor: 'var(--lydian-success-hover)' }} />

                          <span className="w-32 font-medium" style={{ color: '#000000' }}>{dayNames[day]}</span>
                          <input
                          type="time"
                          value={hours.open}
                          disabled={!hours.enabled}
                          onChange={(e) => setBusinessData({
                            ...businessData,
                            operatingHours: {
                              ...businessData.operatingHours,
                              [day]: { ...hours, open: e.target.value }
                            }
                          })}
                          className="px-3 py-2 rounded-lg border-2"
                          style={{ borderColor: 'var(--lydian-border)' }} />

                          <span style={{ color: '#666666' }}>-</span>
                          <input
                          type="time"
                          value={hours.close}
                          disabled={!hours.enabled}
                          onChange={(e) => setBusinessData({
                            ...businessData,
                            operatingHours: {
                              ...businessData.operatingHours,
                              [day]: { ...hours, close: e.target.value }
                            }
                          })}
                          className="px-3 py-2 rounded-lg border-2"
                          style={{ borderColor: 'var(--lydian-border)' }} />

                        </div>);

                  })}
                  </div>
                </div>

                {/* Service Areas */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#000000' }}>
                    <MapPin className="w-5 h-5" />
                    Hizmet Verilen Bölgeler
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {businessData.serviceAreas.map((area, idx) =>
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                    style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', color: 'var(--lydian-success-hover)' }}>

                        {area}
                        <button onClick={() => setBusinessData({
                      ...businessData,
                      serviceAreas: businessData.serviceAreas.filter((_, i) => i !== idx)
                    })}>
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                  )}
                  </div>
                  <input
                  type="text"
                  placeholder="Yeni bölge ekle..."
                  className="w-full px-4 py-3 rounded-xl border-2"
                  style={{ borderColor: 'var(--lydian-border)' }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        setBusinessData({
                          ...businessData,
                          serviceAreas: [...businessData.serviceAreas, value]
                        });
                        e.currentTarget.value = '';
                      }
                    }
                  }} />

                </div>

                {/* Rental Policies */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#000000' }}>
                    <Calendar className="w-5 h-5" />
                    Kiralama Politikaları
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl border-2" style={{ borderColor: 'var(--lydian-border)' }}>
                      <div>
                        <p className="font-bold mb-1" style={{ color: '#000000' }}>Otomatik Onay</p>
                        <p className="text-sm" style={{ color: '#666666' }}>Rezervasyonları otomatik olarak onayla</p>
                      </div>
                      <button
                      onClick={() => setBusinessData({ ...businessData, autoAccept: !businessData.autoAccept })}
                      className="relative w-14 h-8 rounded-full transition-colors"
                      style={{ backgroundColor: businessData.autoAccept ? 'var(--lydian-success-hover)' : 'var(--lydian-border)' }}>

                        <div
                        className="absolute top-1 w-6 h-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full transition-transform"
                        style={{ transform: businessData.autoAccept ? 'translateX(24px)' : 'translateX(4px)' }} />

                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium mb-2" style={{ color: '#666666' }}>Min. Kiralama Süresi (gün)</label>
                        <input
                        type="number"
                        min="1"
                        value={businessData.minRentalDays}
                        onChange={(e) => setBusinessData({ ...businessData, minRentalDays: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl border-2"
                        style={{ borderColor: 'var(--lydian-border)' }} />

                      </div>
                      <div>
                        <label className="block font-medium mb-2" style={{ color: '#666666' }}>Max. Kiralama Süresi (gün)</label>
                        <input
                        type="number"
                        min="1"
                        value={businessData.maxRentalDays}
                        onChange={(e) => setBusinessData({ ...businessData, maxRentalDays: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl border-2"
                        style={{ borderColor: 'var(--lydian-border)' }} />

                      </div>
                    </div>

                    <div>
                      <label className="block font-medium mb-2" style={{ color: '#666666' }}>İptal Politikası</label>
                      <select
                      value={businessData.cancellationPolicy}
                      onChange={(e) => setBusinessData({ ...businessData, cancellationPolicy: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2"
                      style={{ borderColor: 'var(--lydian-border)' }}>

                        <option value="24h">24 saat öncesine kadar ücretsiz</option>
                        <option value="48h">48 saat öncesine kadar ücretsiz</option>
                        <option value="72h">72 saat öncesine kadar ücretsiz</option>
                        <option value="strict">Katı - İade yok</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                  onClick={handleSaveBusiness}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, var(--lydian-success-hover), var(--lydian-success))',
                    color: 'white',
                    boxShadow: '0 0 20px rgba(5, 150, 105, 0.3)'
                  }}>

                    <Save className="w-5 h-5" />
                    <span>Kaydet</span>
                  </button>
                </div>
              </div>
            </div>
          }

          {/* Payment Tab */}
          {activeTab === 'payment' &&
          <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>Ödeme Bilgileri</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block font-medium mb-2" style={{ color: '#666666' }}>Banka Adı</label>
                    <input
                    type="text"
                    value={paymentData.bankName}
                    onChange={(e) => setPaymentData({ ...paymentData, bankName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: 'var(--lydian-border)' }} />

                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-medium mb-2" style={{ color: '#666666' }}>IBAN</label>
                    <input
                    type="text"
                    value={paymentData.iban}
                    onChange={(e) => setPaymentData({ ...paymentData, iban: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: 'var(--lydian-border)' }}
                    placeholder="TR00 0000 0000 0000 0000 0000 00" />

                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-medium mb-2" style={{ color: '#666666' }}>Hesap Sahibi</label>
                    <input
                    type="text"
                    value={paymentData.accountHolder}
                    onChange={(e) => setPaymentData({ ...paymentData, accountHolder: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: 'var(--lydian-border)' }} />

                  </div>
                  <div>
                    <label className="block font-medium mb-2" style={{ color: '#666666' }}>Fatura E-postası</label>
                    <input
                    type="email"
                    value={paymentData.invoiceEmail}
                    onChange={(e) => setPaymentData({ ...paymentData, invoiceEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: 'var(--lydian-border)' }} />

                  </div>
                  <div>
                    <label className="block font-medium mb-2" style={{ color: '#666666' }}>KDV Oranı (%)</label>
                    <input
                    type="number"
                    value={paymentData.taxRate}
                    onChange={(e) => setPaymentData({ ...paymentData, taxRate: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: 'var(--lydian-border)' }} />

                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)' }}>
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 mt-0.5" style={{ color: 'var(--lydian-success-hover)' }} />
                    <div>
                      <p className="font-bold mb-1" style={{ color: 'var(--lydian-success-hover)' }}>Ödeme Güvenliği</p>
                      <p className="text-sm" style={{ color: '#666666' }}>
                        Tüm ödemeler güvenli bir şekilde işlenir. Banka bilgileriniz şifrelenerek saklanır.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                  onClick={handleSavePayment}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, var(--lydian-success-hover), var(--lydian-success))',
                    color: 'white',
                    boxShadow: '0 0 20px rgba(5, 150, 105, 0.3)'
                  }}>

                    <Save className="w-5 h-5" />
                    <span>Kaydet</span>
                  </button>
                </div>
              </div>
            </div>
          }

          {/* Notifications Tab */}
          {activeTab === 'notifications' &&
          <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>Bildirim Tercihleri</h2>

                {/* Email Notifications */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#000000' }}>
                    <Mail className="w-5 h-5" />
                    E-posta Bildirimleri
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(notificationData.email).map(([key, value]) => {
                    const labels: Record<string, string> = {
                      newBooking: 'Yeni rezervasyon',
                      bookingCancellation: 'Rezervasyon iptali',
                      paymentReceived: 'Ödeme alındı',
                      newReview: 'Yeni değerlendirme',
                      marketing: 'Pazarlama e-postaları'
                    };
                    return (
                      <div key={key} className="flex items-center justify-between p-4 rounded-xl border-2" style={{ borderColor: 'var(--lydian-border)' }}>
                          <span className="font-medium" style={{ color: '#000000' }}>{labels[key]}</span>
                          <button
                          onClick={() => setNotificationData({
                            ...notificationData,
                            email: { ...notificationData.email, [key]: !value }
                          })}
                          className="relative w-14 h-8 rounded-full transition-colors"
                          style={{ backgroundColor: value ? 'var(--lydian-success-hover)' : 'var(--lydian-border)' }}>

                            <div
                            className="absolute top-1 w-6 h-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full transition-transform"
                            style={{ transform: value ? 'translateX(24px)' : 'translateX(4px)' }} />

                          </button>
                        </div>);

                  })}
                  </div>
                </div>

                {/* SMS Notifications */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#000000' }}>
                    <Smartphone className="w-5 h-5" />
                    SMS Bildirimleri
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(notificationData.sms).map(([key, value]) => {
                    const labels: Record<string, string> = {
                      newBooking: 'Yeni rezervasyon',
                      bookingCancellation: 'Rezervasyon iptali',
                      paymentReceived: 'Ödeme alındı'
                    };
                    return (
                      <div key={key} className="flex items-center justify-between p-4 rounded-xl border-2" style={{ borderColor: 'var(--lydian-border)' }}>
                          <span className="font-medium" style={{ color: '#000000' }}>{labels[key]}</span>
                          <button
                          onClick={() => setNotificationData({
                            ...notificationData,
                            sms: { ...notificationData.sms, [key]: !value }
                          })}
                          className="relative w-14 h-8 rounded-full transition-colors"
                          style={{ backgroundColor: value ? 'var(--lydian-success-hover)' : 'var(--lydian-border)' }}>

                            <div
                            className="absolute top-1 w-6 h-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full transition-transform"
                            style={{ transform: value ? 'translateX(24px)' : 'translateX(4px)' }} />

                          </button>
                        </div>);

                  })}
                  </div>
                </div>

                {/* Push Notifications */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#000000' }}>
                    <Bell className="w-5 h-5" />
                    Anlık Bildirimler
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(notificationData.push).map(([key, value]) => {
                    const labels: Record<string, string> = {
                      newBooking: 'Yeni rezervasyon',
                      bookingCancellation: 'Rezervasyon iptali',
                      newMessage: 'Yeni mesaj',
                      newReview: 'Yeni değerlendirme'
                    };
                    return (
                      <div key={key} className="flex items-center justify-between p-4 rounded-xl border-2" style={{ borderColor: '#E5E7EB' }}>
                          <span className="font-medium" style={{ color: '#000000' }}>{labels[key]}</span>
                          <button
                          onClick={() => setNotificationData({
                            ...notificationData,
                            push: { ...notificationData.push, [key]: !value }
                          })}
                          className="relative w-14 h-8 rounded-full transition-colors"
                          style={{ backgroundColor: value ? 'var(--lydian-success-hover)' : '#E5E7EB' }}>

                            <div
                            className="absolute top-1 w-6 h-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full transition-transform"
                            style={{ transform: value ? 'translateX(24px)' : 'translateX(4px)' }} />

                          </button>
                        </div>);

                  })}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                  onClick={handleSaveNotifications}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, var(--lydian-success-hover), var(--lydian-success))',
                    color: 'white',
                    boxShadow: '0 0 20px rgba(5, 150, 105, 0.3)'
                  }}>

                    <Save className="w-5 h-5" />
                    <span>Kaydet</span>
                  </button>
                </div>
              </div>
            </div>
          }

          {/* Security Tab */}
          {activeTab === 'security' &&
          <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>Güvenlik Ayarları</h2>

                {/* Change Password */}
                <div className="mb-8 p-6 rounded-xl border-2" style={{ borderColor: '#E5E7EB' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold mb-1" style={{ color: '#000000' }}>Şifre Değiştir</h3>
                      <p className="text-sm" style={{ color: '#666666' }}>
                        Son değişiklik: {securityData.lastPasswordChange}
                      </p>
                    </div>
                    <button
                    onClick={() => {
                      setModalAction('password');
                      setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, var(--lydian-success-hover), var(--lydian-success))',
                      color: 'white'
                    }}>

                      <Key className="w-5 h-5" />
                      <span>Şifre Değiştir</span>
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="mb-8 p-6 rounded-xl border-2" style={{ borderColor: '#E5E7EB' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold mb-1" style={{ color: '#000000' }}>İki Faktörlü Doğrulama</h3>
                      <p className="text-sm" style={{ color: '#666666' }}>
                        Hesabınıza ekstra güvenlik katmanı ekleyin
                      </p>
                    </div>
                    <button
                    onClick={handleToggle2FA}
                    className="relative w-14 h-8 rounded-full transition-colors"
                    style={{ backgroundColor: securityData.twoFactorEnabled ? 'var(--lydian-success-hover)' : '#E5E7EB' }}>

                      <div
                      className="absolute top-1 w-6 h-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full transition-transform"
                      style={{ transform: securityData.twoFactorEnabled ? 'translateX(24px)' : 'translateX(4px)' }} />

                    </button>
                  </div>
                </div>

                {/* Login History */}
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#000000' }}>
                    <History className="w-5 h-5" />
                    Giriş Geçmişi
                  </h3>
                  <div className="space-y-3">
                    {securityData.loginHistory.map((login, idx) =>
                  <div key={idx} className="p-4 rounded-xl border-2" style={{ borderColor: '#E5E7EB' }}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-bold" style={{ color: '#000000' }}>{login.device}</p>
                            <p className="text-sm" style={{ color: '#666666' }}>{login.date}</p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex items-center gap-4 text-sm" style={{ color: '#666666' }}>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {login.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            {login.ip}
                          </span>
                        </div>
                      </div>
                  )}
                  </div>
                </div>
              </div>
            </div>
          }

          {/* Legal Tab */}
          {activeTab === 'legal' &&
          <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>Yasal Dökümanlar</h2>

              <div className="space-y-4">
                <div className="p-6 rounded-xl border-2 hover:border-green-500 transition-all cursor-pointer" style={{ borderColor: '#E5E7EB' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, var(--lydian-success-hover), var(--lydian-success))' }}>
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1" style={{ color: '#000000' }}>Kullanım Koşulları</h3>
                        <p className="text-sm" style={{ color: '#666666' }}>Platform kullanım şartları ve koşulları</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                  style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', color: 'var(--lydian-success-hover)' }}>
                      <Eye className="w-5 h-5" />
                      <span>Görüntüle</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-xl border-2 hover:border-green-500 transition-all cursor-pointer" style={{ borderColor: '#E5E7EB' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, var(--lydian-success-hover), #10B981)' }}>
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1" style={{ color: '#000000' }}>Gizlilik Politikası</h3>
                        <p className="text-sm" style={{ color: '#666666' }}>Verileriniz nasıl korunur ve kullanılır</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                  style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', color: 'var(--lydian-success-hover)' }}>
                      <Eye className="w-5 h-5" />
                      <span>Görüntüle</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-xl border-2 hover:border-green-500 transition-all cursor-pointer" style={{ borderColor: '#E5E7EB' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #059669, #10B981)' }}>
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1" style={{ color: '#000000' }}>KVKK Aydınlatma Metni</h3>
                        <p className="text-sm" style={{ color: '#666666' }}>Kişisel verilerin korunması hakkında bilgi</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                  style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                      <Eye className="w-5 h-5" />
                      <span>Görüntüle</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-xl border-2 hover:border-green-500 transition-all cursor-pointer" style={{ borderColor: '#E5E7EB' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #059669, #10B981)' }}>
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1" style={{ color: '#000000' }}>Araç Kiralama Sözleşmesi</h3>
                        <p className="text-sm" style={{ color: '#666666' }}>Standart kiralama sözleşmesi şablonu</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                  style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                      <Download className="w-5 h-5" />
                      <span>İndir</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-xl border-2 hover:border-green-500 transition-all cursor-pointer" style={{ borderColor: '#E5E7EB' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #059669, #10B981)' }}>
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1" style={{ color: '#000000' }}>Ödeme Şartları</h3>
                        <p className="text-sm" style={{ color: '#666666' }}>Ödeme koşulları ve komisyon bilgileri</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                  style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                      <Eye className="w-5 h-5" />
                      <span>Görüntüle</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      {/* Password Change Modal */}
      {showModal && modalAction === 'password' &&
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-md w-full" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>Şifre Değiştir</h3>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2" style={{ color: '#666666' }}>Mevcut Şifre</label>
                <div className="relative">
                  <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2"
                  style={{ borderColor: '#E5E7EB' }} />

                  <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2">

                    {showCurrentPassword ? <EyeOff className="w-5 h-5" style={{ color: '#666666' }} /> : <Eye className="w-5 h-5" style={{ color: '#666666' }} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2" style={{ color: '#666666' }}>Yeni Şifre</label>
                <div className="relative">
                  <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2"
                  style={{ borderColor: '#E5E7EB' }} />

                  <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2">

                    {showNewPassword ? <EyeOff className="w-5 h-5" style={{ color: '#666666' }} /> : <Eye className="w-5 h-5" style={{ color: '#666666' }} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2" style={{ color: '#666666' }}>Yeni Şifre (Tekrar)</label>
                <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2"
                style={{ borderColor: '#E5E7EB' }} />

              </div>

              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)' }}>
                <p className="text-sm" style={{ color: '#666666' }}>
                  Şifreniz en az 8 karakter uzunluğunda olmalı ve büyük harf, küçük harf ve rakam içermelidir.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
              onClick={() => {
                setShowModal(false);
                setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
              }}
              className="flex-1 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 border-2"
              style={{ borderColor: '#E5E7EB', color: '#666666' }}>

                İptal
              </button>
              <button
              onClick={handleChangePassword}
              className="flex-1 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #059669, #10B981)',
                color: 'white',
                boxShadow: '0 0 20px rgba(5, 150, 105, 0.3)'
              }}>

                Değiştir
              </button>
            </div>
          </div>
        </div>
      }
    </div>);

}
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveMap, { MapLocation } from '../maps/InteractiveMap';
import { 
  PricingEngine, 
  ReservationManager, 
  PaymentProcessor, 
  CouponManager,
  BookingRequest, 
  PricingResult, 
  ReservationData,
  PaymentRequest
} from '../../lib/pricingEngine';
import { Tour, Hotel } from '../../data/turkeyTourismData';

interface BookingFormProps {
  item: Tour | Hotel;
  itemType: 'tour' | 'hotel';
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  passportNumber?: string;
  specialRequirements?: string[];
}

interface BookingFormData extends BookingRequest {
  customerInfo: CustomerFormData;
  pickupLocation?: MapLocation;
  roomType?: string;
  couponCode?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  item,
  itemType,
  isOpen,
  onClose,
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    itemId: item.id,
    itemType,
    checkInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 hafta sonra
    checkOutDate: itemType === 'hotel' ? new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) : undefined,
    adultsCount: 2,
    childrenCount: 0,
    specialRequests: [],
    customerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      nationality: 'TR',
      specialRequirements: []
    }
  });

  const [pricing, setPricing] = useState<PricingResult | null>(null);
  const [reservation, setReservation] = useState<ReservationData | null>(null);
  const [couponDiscount, setCouponDiscount] = useState({ isValid: false, discount: 0, message: '' });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedPickupLocation, setSelectedPickupLocation] = useState<MapLocation | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'bank_transfer' | 'paypal'>('credit_card');

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardHolderName: ''
  });

  const [billingAddress, setBillingAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'TR'
  });

  // Fiyat hesaplama
  useEffect(() => {
    if (formData.checkInDate && formData.adultsCount > 0) {
      const basePrice = itemType === 'tour' ? 
        (item as Tour).price.adult * formData.adultsCount + 
        (item as Tour).price.child * formData.childrenCount :
        (item as Hotel).price.min; // Hotel için oda tipine göre ayarlanacak

      const bookingRequest: BookingRequest = {
        itemId: formData.itemId,
        itemType: formData.itemType,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        adultsCount: formData.adultsCount,
        childrenCount: formData.childrenCount,
        roomType: formData.roomType
      };

      const pricingResult = PricingEngine.calculateDynamicPrice(basePrice, bookingRequest);
      setPricing(pricingResult);
    }
  }, [formData, item, itemType]);

  // Kupon kontrolü
  useEffect(() => {
    if (formData.couponCode && pricing) {
      const couponResult = CouponManager.validateCoupon(
        formData.couponCode,
        pricing.finalPrice,
        itemType,
        item.id
      );
      setCouponDiscount(couponResult);
    } else {
      setCouponDiscount({ isValid: false, discount: 0, message: '' });
    }
  }, [formData.couponCode, pricing, itemType, item.id]);

  const totalPrice = pricing ? pricing.finalPrice - couponDiscount.discount : 0;

  const handleInputChange = (field: keyof BookingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomerInfoChange = (field: keyof CustomerFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      customerInfo: { ...prev.customerInfo, [field]: value }
    }));
  };

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePickupLocationSelect = (location: MapLocation | null) => {
    setSelectedPickupLocation(location);
    setFormData(prev => ({ ...prev, pickupLocation: location || undefined }));
  };

  const handlePayment = async () => {
    if (!pricing) return;

    setIsProcessingPayment(true);

    try {{/* <-- Buraya kadar olan kısım doğru */}
      // Önce rezervasyonu oluştur
      const bookingRequest: BookingRequest = {
        itemId: formData.itemId,
        itemType: formData.itemType,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        adultsCount: formData.adultsCount,
        childrenCount: formData.childrenCount,
        roomType: formData.roomType,
        specialRequests: formData.specialRequests
      };

      const newReservation = ReservationManager.createReservation(
        bookingRequest,
        formData.customerInfo,
        { ...pricing, finalPrice: totalPrice }
      );

      // Ödeme talebini hazırla
      const paymentRequest: PaymentRequest = {
        reservationId: newReservation.id,
        amount: totalPrice,
        currency: 'TRY',
        method: paymentMethod,
        cardInfo: paymentMethod === 'credit_card' ? cardInfo : undefined,
        billingAddress
      };

      // Ödemeyi işle
      const paymentResult = await PaymentProcessor.processPayment(paymentRequest);

      if (paymentResult.success) {
        // Rezervasyon durumunu güncelle
        newReservation.paymentInfo = {
          ...newReservation.paymentInfo,
          status: 'completed',
          transactionId: paymentResult.transactionId,
          paymentDate: new Date()
        };
        newReservation.status = 'confirmed';

        setReservation(newReservation);
        setCurrentStep(4); // Başarı sayfasına geç
      } else {
        alert(`Ödeme hatası: ${paymentResult.errorMessage}`);
      }
    } catch (error) {
      console.error('Ödeme işlemi hatası:', error);
      alert('Ödeme işlemi sırasında bir hata oluştu.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const getLocationData = (): MapLocation[] => {
    const locations: MapLocation[] = [];
    
    if ('location' in item) {
      // Hotel
      locations.push({
        lat: item.location.coordinates.lat,
        lng: item.location.coordinates.lng,
        name: item.name,
        type: 'hotel',
        address: item.location.address.tr
      });
    }

    if (selectedPickupLocation) {
      locations.push(selectedPickupLocation);
    }

    return locations;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Rezervasyon Detayları
            </h2>

            {/* Tarih seçimi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {itemType === 'tour' ? 'Tur Tarihi' : 'Giriş Tarihi'}
                </label>
                <input
                  type="date"
                  value={formData.checkInDate.toISOString().split('T')[0]}
                  onChange={(e) => handleInputChange('checkInDate', new Date(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 [color-scheme:light]"
                  style={{ colorScheme: 'light' }}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {itemType === 'hotel' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Çıkış Tarihi
                  </label>
                  <input
                    type="date"
                    value={formData.checkOutDate?.toISOString().split('T')[0] || ''}
                    onChange={(e) => handleInputChange('checkOutDate', new Date(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 [color-scheme:light]"
                    style={{ colorScheme: 'light' }}
                    min={formData.checkInDate.toISOString().split('T')[0]}
                  />
                </div>
              )}
            </div>

            {/* Kişi sayısı */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yetişkin Sayısı
                </label>
                <select
                  value={formData.adultsCount}
                  onChange={(e) => handleInputChange('adultsCount', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Çocuk Sayısı
                </label>
                <select
                  value={formData.childrenCount}
                  onChange={(e) => handleInputChange('childrenCount', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {[0, 1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Oda tipi seçimi (Sadece otel için) */}
            {itemType === 'hotel' && 'roomTypes' in item && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Oda Tipi
                </label>
                <div className="space-y-3">
                  {item.roomTypes.map((room, index) => (
                    <div
                      key={index}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.roomType === room.name.tr
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleInputChange('roomType', room.name.tr)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{room.name.tr}</h3>
                          <p className="text-sm text-gray-600">
                            {room.size}m² • {room.capacity} kişi • {room.amenities.join(', ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-blue-600">
                            {room.price} TL
                          </span>
                          <p className="text-xs text-gray-500">gecelik</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pickup lokasyonu (Sadece tur için) */}
            {itemType === 'tour' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Alınacak Nokta (İsteğe Bağlı)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowMap(!showMap)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {showMap ? 'Haritayı Gizle' : 'Haritada Seç'}
                  </button>
                </div>

                {selectedPickupLocation && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-green-800">📍 {selectedPickupLocation.name}</p>
                        <p className="text-sm text-green-600">{selectedPickupLocation.address}</p>
                      </div>
                      <button
                        onClick={() => handlePickupLocationSelect(null)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                )}

                {showMap && (
                  <div className="mt-4">
                    <InteractiveMap
                      height="300px"
                      showPickupOption={true}
                      customPickupLocation={selectedPickupLocation}
                      onPickupLocationChange={handlePickupLocationSelect}
                      locations={getLocationData()}
                      center={[41.0082, 28.9784]}
                      zoom={11}
                      className="rounded-lg overflow-hidden"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Kupon kodu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İndirim Kuponu (İsteğe Bağlı)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Kupon kodunuzu girin"
                  value={formData.couponCode || ''}
                  onChange={(e) => handleInputChange('couponCode', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {couponDiscount.message && (
                <p className={`text-sm mt-1 ${couponDiscount.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {couponDiscount.message}
                </p>
              )}
            </div>

            {/* Fiyat özeti */}
            {pricing && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Fiyat Detayları</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Temel Fiyat:</span>
                    <span>{pricing.basePrice} TL</span>
                  </div>
                  {pricing.breakdown.seasonalAdjustment !== 0 && (
                    <div className="flex justify-between">
                      <span>Sezonsal Ayarlama:</span>
                      <span className={pricing.breakdown.seasonalAdjustment > 0 ? 'text-red-600' : 'text-green-600'}>
                        {pricing.breakdown.seasonalAdjustment > 0 ? '+' : ''}{pricing.breakdown.seasonalAdjustment} TL
                      </span>
                    </div>
                  )}
                  {pricing.breakdown.advanceBookingDiscount > 0 && (
                    <div className="flex justify-between">
                      <span>Erken Rezervasyon İndirimi:</span>
                      <span className="text-green-600">-{pricing.breakdown.advanceBookingDiscount} TL</span>
                    </div>
                  )}
                  {couponDiscount.isValid && (
                    <div className="flex justify-between">
                      <span>Kupon İndirimi:</span>
                      <span className="text-green-600">-{couponDiscount.discount} TL</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>KDV (%18):</span>
                    <span>{pricing.breakdown.taxes} TL</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Toplam:</span>
                    <span className="text-blue-600">{totalPrice} TL</span>
                  </div>
                </div>
              </div>
            )}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Kişisel Bilgiler
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerInfo.firstName}
                  onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soyad *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerInfo.lastName}
                  onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta Adresi *
              </label>
              <input
                type="email"
                required
                value={formData.customerInfo.email}
                onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon Numarası *
              </label>
              <input
                type="tel"
                required
                placeholder="+90 555 123 45 67"
                value={formData.customerInfo.phone}
                onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Uyruğunuz
              </label>
              <select
                value={formData.customerInfo.nationality}
                onChange={(e) => handleCustomerInfoChange('nationality', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="TR">Türkiye</option>
                <option value="US">Amerika Birleşik Devletleri</option>
                <option value="DE">Almanya</option>
                <option value="FR">Fransa</option>
                <option value="GB">Birleşik Krallık</option>
                <option value="RU">Rusya</option>
                <option value="OTHER">Diğer</option>
              </select>
            </div>

            {formData.customerInfo.nationality !== 'TR' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pasaport Numarası
                </label>
                <input
                  type="text"
                  value={formData.customerInfo.passportNumber || ''}
                  onChange={(e) => handleCustomerInfoChange('passportNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Özel İstekleriniz
              </label>
              <textarea
                rows={3}
                placeholder="Herhangi bir özel isteğiniz varsa buraya yazabilirsiniz..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Ödeme Bilgileri
            </h2>

            {/* Ödeme yöntemi seçimi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Ödeme Yöntemi
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { id: 'credit_card', label: '💳 Kredi Kartı', desc: 'Visa, MasterCard, American Express' },
                  { id: 'bank_transfer', label: '🏦 Banka Transferi', desc: 'EFT/Havale ile ödeme' },
                  { id: 'paypal', label: '💰 PayPal', desc: 'Güvenli PayPal ile ödeme' }
                ].map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod(method.id as any)}
                  >
                    <div className="text-center">
                      <div className="font-semibold">{method.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{method.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kredi kartı bilgileri */}
            {paymentMethod === 'credit_card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kart Üzerindeki İsim
                  </label>
                  <input
                    type="text"
                    value={cardInfo.cardHolderName}
                    onChange={(e) => setCardInfo(prev => ({ ...prev, cardHolderName: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kart Numarası
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardInfo.cardNumber}
                    onChange={(e) => setCardInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ay
                    </label>
                    <select
                      value={cardInfo.expiryMonth}
                      onChange={(e) => setCardInfo(prev => ({ ...prev, expiryMonth: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Ay</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                          {String(i + 1).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yıl
                    </label>
                    <select
                      value={cardInfo.expiryYear}
                      onChange={(e) => setCardInfo(prev => ({ ...prev, expiryYear: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Yıl</option>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() + i;
                        return (
                          <option key={year} value={String(year)}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      value={cardInfo.cvv}
                      onChange={(e) => setCardInfo(prev => ({ ...prev, cvv: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Fatura adresi */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Fatura Adresi</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={billingAddress.fullName}
                  onChange={(e) => setBillingAddress(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres
                </label>
                <input
                  type="text"
                  value={billingAddress.addressLine1}
                  onChange={(e) => setBillingAddress(prev => ({ ...prev, addressLine1: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şehir
                  </label>
                  <input
                    type="text"
                    value={billingAddress.city}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İl/Eyalet
                  </label>
                  <input
                    type="text"
                    value={billingAddress.state}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Posta Kodu
                  </label>
                  <input
                    type="text"
                    value={billingAddress.postalCode}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Sipariş özeti */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Sipariş Özeti</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">{typeof item.name === 'string' ? item.name : item.name.tr}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    {formData.adultsCount} yetişkin
                    {formData.childrenCount > 0 && `, ${formData.childrenCount} çocuk`}
                  </span>
                  <span>{formData.checkInDate.toLocaleDateString('tr-TR')}</span>
                </div>
                {selectedPickupLocation && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>📍 Alınacak Nokta:</span>
                    <span>{selectedPickupLocation.name}</span>
                  </div>
                )}
                <hr />
                <div className="flex justify-between text-xl font-bold text-blue-600">
                  <span>Toplam Tutar:</span>
                  <span>{totalPrice} TL</span>
                </div>
              </div>
            </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Rezervasyon Tamamlandı!
              </h2>
              <p className="text-gray-600 mb-6">
                Rezervasyonunuz başarıyla oluşturuldu. Onay e-postası gönderildi.
              </p>
            </div>

            {reservation && (
              <div className="bg-blue-50 p-6 rounded-lg max-w-md mx-auto">
                <h3 className="font-semibold mb-4">Rezervasyon Detayları</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Rezervasyon Kodu:</span>
                    <span className="font-bold">{reservation.confirmationCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Müşteri:</span>
                    <span>{reservation.customerInfo.firstName} {reservation.customerInfo.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tarih:</span>
                    <span>{reservation.bookingRequest.checkInDate.toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Toplam Tutar:</span>
                    <span className="font-bold">{reservation.pricingResult.finalPrice} TL</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                📄 Yazdır
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Kapat
              </button>
            </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.checkInDate && formData.adultsCount > 0;
      case 2:
        return formData.customerInfo.firstName && 
               formData.customerInfo.lastName && 
               formData.customerInfo.email && 
               formData.customerInfo.phone;
      case 3:
        return billingAddress.fullName && 
               billingAddress.city && 
               (paymentMethod !== 'credit_card' || 
                (cardInfo.cardNumber && cardInfo.cvv && cardInfo.cardHolderName));
      default:
        return true;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div className={`bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${className}`} onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h1 className="text-xl font-bold">Rezervasyon</h1>
                <p className="text-sm text-gray-500">{typeof item.name === 'string' ? item.name : item.name.tr}</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Progress steps */}
            {currentStep < 4 && (
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  {[
                    { step: 1, label: 'Detaylar' },
                    { step: 2, label: 'Kişisel Bilgiler' },
                    { step: 3, label: 'Ödeme' }
                  ].map(({ step, label }) => (
                    <div
                      key={step}
                      className={`flex items-center ${
                        step < 3 ? 'flex-1' : ''
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                          currentStep >= step
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {step}
                      </div>
                      <div className="ml-3">
                        <p className={`text-sm font-medium ${
                          currentStep >= step ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          {label}
                        </p>
                      </div>
                      {step < 3 && (
                        <div className={`flex-1 h-px mx-4 ${
                          currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {renderStepContent()}
            </div>

            {/* Footer */}
            {currentStep < 4 && (
              <div className="flex items-center justify-between p-6 border-t border-gray-200">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Geri
                </button>

                <div className="flex-1 text-center">
                  {pricing && (
                    <span className="text-lg font-bold text-blue-600">
                      Toplam: {totalPrice} TL
                    </span>
                  )}
                </div>

                {currentStep === 3 ? (
                  <button
                    onClick={handlePayment}
                    disabled={!canProceedToNext() || isProcessingPayment}
                    className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isProcessingPayment ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                        İşleniyor...
                      </>
                    ) : (
                      '💳 Ödemeyi Tamamla'
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleNextStep}
                    disabled={!canProceedToNext()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Devam Et →
                  </button>
                )}
              </div>
            )}
            </div>
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingForm;
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CreditCard, Calendar, Users, MapPin } from 'lucide-react';
import { BOOKING_STEPS, PAYMENT_METHODS } from '@/lib/mock-data';

interface BookingFlowProps {
  item: any;
  type: 'flight' | 'hotel' | 'car' | 'restaurant' | 'tour';
  onClose: () => void;
}

export default function BookingFlow({ item, type, onClose }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(BOOKING_STEPS.DETAILS);
  const [bookingData, setBookingData] = useState({
    passengers: 1,
    checkIn: '',
    checkOut: '',
    specialRequests: '',
    contactInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    paymentMethod: 'credit',
    cardInfo: {
      number: '',
      expiry: '',
      cvv: '',
      name: ''
    }
  });

  const steps = [
    { id: BOOKING_STEPS.DETAILS, name: 'Detaylar', icon: Users },
    { id: BOOKING_STEPS.PAYMENT, name: 'Ödeme', icon: CreditCard },
    { id: BOOKING_STEPS.CONFIRMATION, name: 'Onay', icon: Check }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  const nextStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const prevStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleBookingSubmit = () => {
    // Simulate booking process
    alert('Rezervasyon başarıyla tamamlandı! Onay e-postası gönderildi.');
    onClose();
  };

  const getItemTitle = () => {
    switch (type) {
      case 'flight':
        return `${item.from} → ${item.to}`;
      case 'hotel':
        return item.name;
      case 'car':
        return `${item.brand} ${item.model}`;
      case 'restaurant':
        return item.name;
      case 'tour':
        return item.name;
      default:
        return 'Rezervasyon';
    }
  };

  const getItemSubtitle = () => {
    switch (type) {
      case 'flight':
        return `${item.airline} - ${item.departure}`;
      case 'hotel':
        return item.location;
      case 'car':
        return `${item.company} - ${item.location}`;
      case 'restaurant':
        return `${item.cuisine} - ${item.location}`;
      case 'tour':
        return `${item.duration} - ${item.location}`;
      default:
        return '';
    }
  };

  return (
    <div className=\"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4\">
      <div className=\"bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto\">
        {/* Header */}
        <div className=\"bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl\">
          <div className=\"flex items-center justify-between mb-4\">
            <button
              onClick={onClose}
              className=\"text-white/80 hover:text-white transition-colors\"
            >
              <ArrowLeft className=\"h-6 w-6\" />
            </button>
            <h2 className=\"text-2xl font-bold\">Rezervasyon</h2>
            <div className=\"w-6\" />
          </div>
          
          {/* Steps */}
          <div className=\"flex items-center justify-center space-x-4\">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = getCurrentStepIndex() > index;
              
              return (
                <div key={step.id} className=\"flex items-center\">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${\n                    isActive ? 'bg-white text-blue-600 border-white' :\n                    isCompleted ? 'bg-green-500 border-green-500 text-white' :\n                    'border-white/50 text-white/50'\n                  }`}>
                    {isCompleted ? <Check className=\"h-5 w-5\" /> : <Icon className=\"h-5 w-5\" />}
                  </div>
                  <span className={`ml-2 font-medium ${\n                    isActive ? 'text-white' : 'text-white/70'\n                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <ArrowRight className=\"h-4 w-4 mx-4 text-white/50\" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className=\"p-6\">
          {/* Item Summary */}
          <div className=\"bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6\">
            <div className=\"flex items-center justify-between\">
              <div>
                <h3 className=\"text-lg font-semibold text-gray-900 dark:text-white\">
                  {getItemTitle()}
                </h3>
                <p className=\"text-gray-600 dark:text-gray-400\">
                  {getItemSubtitle()}
                </p>
              </div>
              <div className=\"text-right\">
                <div className=\"text-2xl font-bold text-blue-600\">
                  {item.currency || '₺'}{item.price?.toLocaleString()}
                </div>
                {item.originalPrice && (
                  <div className=\"text-sm text-gray-500 line-through\">
                    {item.currency || '₺'}{item.originalPrice?.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Step Content */}
          {currentStep === BOOKING_STEPS.DETAILS && (
            <div className=\"space-y-6\">
              <h3 className=\"text-xl font-semibold text-gray-900 dark:text-white mb-4\">
                Rezervasyon Detayları
              </h3>
              
              {/* Date Selection */}
              {(type === 'hotel' || type === 'car') && (
                <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                  <div>
                    <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                      Giriş Tarihi
                    </label>
                    <input
                      type=\"date\"
                      className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white\"
                      value={bookingData.checkIn}
                      onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                      Çıkış Tarihi
                    </label>
                    <input
                      type=\"date\"
                      className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white\"
                      value={bookingData.checkOut}
                      onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {/* Passengers/Guests */}
              <div>
                <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                  {type === 'flight' ? 'Yolcu Sayısı' : type === 'hotel' ? 'Misafir Sayısı' : 'Kişi Sayısı'}
                </label>
                <select
                  className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white\"
                  value={bookingData.passengers}
                  onChange={(e) => setBookingData({...bookingData, passengers: parseInt(e.target.value)})}
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} Kişi</option>
                  ))}
                </select>
              </div>

              {/* Contact Information */}
              <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                <div>
                  <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                    Ad
                  </label>
                  <input
                    type=\"text\"
                    className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white\"
                    value={bookingData.contactInfo.firstName}
                    onChange={(e) => setBookingData({
                      ...bookingData, 
                      contactInfo: {...bookingData.contactInfo, firstName: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                    Soyad
                  </label>
                  <input
                    type=\"text\"
                    className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white\"
                    value={bookingData.contactInfo.lastName}
                    onChange={(e) => setBookingData({
                      ...bookingData, 
                      contactInfo: {...bookingData.contactInfo, lastName: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                    E-posta
                  </label>
                  <input
                    type=\"email\"
                    className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white\"
                    value={bookingData.contactInfo.email}
                    onChange={(e) => setBookingData({
                      ...bookingData, 
                      contactInfo: {...bookingData.contactInfo, email: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                    Telefon
                  </label>
                  <input
                    type=\"tel\"
                    className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white\"
                    value={bookingData.contactInfo.phone}
                    onChange={(e) => setBookingData({
                      ...bookingData, 
                      contactInfo: {...bookingData.contactInfo, phone: e.target.value}
                    })}
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                  Özel İstekler
                </label>
                <textarea
                  rows={3}
                  className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white\"
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                  placeholder=\"Varsa özel isteklerinizi buraya yazabilirsiniz...\"
                />
              </div>
            </div>
          )}

          {currentStep === BOOKING_STEPS.PAYMENT && (
            <div className=\"space-y-6\">
              <h3 className=\"text-xl font-semibold text-gray-900 dark:text-white mb-4\">
                Ödeme Bilgileri
              </h3>
              
              {/* Payment Methods */}
              <div>
                <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3\">
                  Ödeme Yöntemi
                </label>
                <div className=\"grid grid-cols-2 md:grid-cols-3 gap-3\">
                  {PAYMENT_METHODS.map(method => (
                    <button
                      key={method.id}
                      onClick={() => setBookingData({...bookingData, paymentMethod: method.id})}
                      className={`p-3 border-2 rounded-lg flex items-center justify-center space-x-2 transition-colors ${\n                        bookingData.paymentMethod === method.id\n                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'\n                          : 'border-gray-300 hover:border-blue-300'\n                      }`}
                    >
                      <span className=\"text-2xl\">{method.icon}</span>
                      <span className=\"text-sm font-medium\">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Information */}
              {bookingData.paymentMethod === 'credit' && (
                <div className=\"space-y-4\">
                  <div>
                    <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                      Kart Üzerindeki İsim
                    </label>
                    <input
                      type=\"text\"
                      className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white\"
                      value={bookingData.cardInfo.name}
                      onChange={(e) => setBookingData({
                        ...bookingData, 
                        cardInfo: {...bookingData.cardInfo, name: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                      Kart Numarası
                    </label>
                    <input
                      type=\"text\"
                      placeholder=\"**** **** **** ****\"
                      className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white\"
                      value={bookingData.cardInfo.number}
                      onChange={(e) => setBookingData({
                        ...bookingData, 
                        cardInfo: {...bookingData.cardInfo, number: e.target.value}
                      })}
                    />
                  </div>
                  <div className=\"grid grid-cols-2 gap-4\">
                    <div>
                      <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                        Son Kullanma Tarihi
                      </label>
                      <input
                        type=\"text\"
                        placeholder=\"MM/YY\"
                        className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white\"
                        value={bookingData.cardInfo.expiry}
                        onChange={(e) => setBookingData({
                          ...bookingData, 
                          cardInfo: {...bookingData.cardInfo, expiry: e.target.value}
                        })}
                      />
                    </div>
                    <div>
                      <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                        CVV
                      </label>
                      <input
                        type=\"text\"
                        placeholder=\"***\"
                        className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white\"
                        value={bookingData.cardInfo.cvv}
                        onChange={(e) => setBookingData({
                          ...bookingData, 
                          cardInfo: {...bookingData.cardInfo, cvv: e.target.value}
                        })}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === BOOKING_STEPS.CONFIRMATION && (
            <div className=\"space-y-6 text-center\">
              <div className=\"bg-green-50 dark:bg-green-900/30 rounded-lg p-6\">
                <Check className=\"h-16 w-16 text-green-500 mx-auto mb-4\" />
                <h3 className=\"text-2xl font-bold text-green-700 dark:text-green-400 mb-2\">
                  Rezervasyon Hazır!
                </h3>
                <p className=\"text-gray-600 dark:text-gray-400\">
                  Rezervasyonunuz onaylanmaya hazır. Aşağıdaki detayları kontrol edin.
                </p>
              </div>

              <div className=\"text-left bg-gray-50 dark:bg-gray-700 rounded-lg p-4\">
                <h4 className=\"font-semibold mb-2\">Rezervasyon Özeti:</h4>
                <div className=\"space-y-1 text-sm\">
                  <div>Ürün: {getItemTitle()}</div>
                  <div>İsim: {bookingData.contactInfo.firstName} {bookingData.contactInfo.lastName}</div>
                  <div>E-posta: {bookingData.contactInfo.email}</div>
                  <div>Telefon: {bookingData.contactInfo.phone}</div>
                  {bookingData.checkIn && <div>Giriş: {bookingData.checkIn}</div>}
                  {bookingData.checkOut && <div>Çıkış: {bookingData.checkOut}</div>}
                  <div>Kişi Sayısı: {bookingData.passengers}</div>
                  <div className=\"text-lg font-bold text-blue-600 mt-2\">
                    Toplam: {item.currency || '₺'}{(item.price * bookingData.passengers).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className=\"bg-gray-50 dark:bg-gray-700 px-6 py-4 rounded-b-2xl\">
          <div className=\"flex items-center justify-between\">
            <div>
              {getCurrentStepIndex() > 0 && (
                <button
                  onClick={prevStep}
                  className=\"flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors\"
                >
                  <ArrowLeft className=\"h-4 w-4 mr-2\" />
                  Geri
                </button>
              )}
            </div>
            <div className=\"text-right\">
              <div className=\"text-lg font-bold text-gray-900 dark:text-white\">
                Toplam: {item.currency || '₺'}{(item.price * bookingData.passengers).toLocaleString()}
              </div>
            </div>
            <div>
              {currentStep === BOOKING_STEPS.CONFIRMATION ? (
                <button
                  onClick={handleBookingSubmit}
                  className=\"bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold\"
                >
                  Rezervasyonu Tamamla
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className=\"bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center\"
                >
                  İleri
                  <ArrowRight className=\"h-4 w-4 ml-2\" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
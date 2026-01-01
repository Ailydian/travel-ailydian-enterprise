import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface BookingConfirmationEmailProps {
  userName: string;
  bookingId: string;
  bookingType: 'hotel' | 'rental' | 'tour' | 'transfer' | 'vehicle';
  propertyName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: string;
  currency: string;
  confirmationUrl: string;
  propertyImage?: string;
  address?: string;
  language?: 'en' | 'tr' | 'ru';
}

const translations = {
  en: {
    preview: 'Booking Confirmation - Travel.Ailydian',
    heading: 'Booking Confirmed!',
    hello: 'Hello',
    confirmed: "Your booking has been confirmed! We're excited for your upcoming trip.",
    bookingDetails: 'Booking Details',
    bookingId: 'Booking ID',
    property: 'Property',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Guests',
    total: 'Total',
    address: 'Address',
    whatNext: "What's Next?",
    step1: "📧 You'll receive a reminder email 24 hours before check-in",
    step2: '📱 Download your booking details from your dashboard',
    step3: '💬 Contact the property if you have any questions',
    viewBooking: 'View Booking Details',
    needHelp: 'Need Help?',
    support: 'Our 24/7 support team is here to assist you.',
    footer: '© 2024 Travel.Ailydian.com - Your AI-Powered Travel Companion',
  },
  tr: {
    preview: 'Rezervasyon Onayı - Travel.Ailydian',
    heading: 'Rezervasyon Onaylandı!',
    hello: 'Merhaba',
    confirmed: 'Rezervasyonunuz onaylandı! Yaklaşan seyahatiniz için heyecanlıyız.',
    bookingDetails: 'Rezervasyon Detayları',
    bookingId: 'Rezervasyon Numarası',
    property: 'Tesis',
    checkIn: 'Giriş',
    checkOut: 'Çıkış',
    guests: 'Misafir',
    total: 'Toplam',
    address: 'Adres',
    whatNext: 'Sırada Ne Var?',
    step1: '📧 Girişten 24 saat önce hatırlatma e-postası alacaksınız',
    step2: '📱 Rezervasyon detaylarınızı panelinizden indirebilirsiniz',
    step3: '💬 Sorularınız varsa tesis ile iletişime geçin',
    viewBooking: 'Rezervasyon Detaylarını Görüntüle',
    needHelp: 'Yardıma mı ihtiyacınız var?',
    support: '7/24 destek ekibimiz size yardımcı olmak için burada.',
    footer: '© 2024 Travel.Ailydian.com - AI Destekli Seyahat Yardımcınız',
  },
  ru: {
    preview: 'Подтверждение бронирования - Travel.Ailydian',
    heading: 'Бронирование подтверждено!',
    hello: 'Здравствуйте',
    confirmed: 'Ваше бронирование подтверждено! Мы рады вашей предстоящей поездке.',
    bookingDetails: 'Детали бронирования',
    bookingId: 'Номер бронирования',
    property: 'Объект',
    checkIn: 'Заезд',
    checkOut: 'Выезд',
    guests: 'Гостей',
    total: 'Итого',
    address: 'Адрес',
    whatNext: 'Что дальше?',
    step1: '📧 Вы получите напоминание за 24 часа до заезда',
    step2: '📱 Загрузите детали бронирования из панели управления',
    step3: '💬 Свяжитесь с объектом, если у вас есть вопросы',
    viewBooking: 'Посмотреть детали бронирования',
    needHelp: 'Нужна помощь?',
    support: 'Наша служба поддержки 24/7 готова помочь вам.',
    footer: '© 2024 Travel.Ailydian.com - Ваш AI-помощник в путешествиях',
  },
};

export const BookingConfirmationEmail: React.FC<
  Readonly<BookingConfirmationEmailProps>
> = ({
  userName = 'Traveler',
  bookingId,
  bookingType,
  propertyName,
  checkInDate,
  checkOutDate,
  guests,
  totalPrice,
  currency = 'USD',
  confirmationUrl,
  propertyImage,
  address,
  language = 'en',
}) => {
  const t = translations[language];

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img
              src="https://holiday.ailydian.com/logo.png"
              width="150"
              height="50"
              alt="Travel.Ailydian"
              style={logo}
            />
          </Section>

          {/* Success Badge */}
          <Section style={badgeSection}>
            <Text style={badge}>✓</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>{t.heading}</Heading>

            <Text style={text}>
              {t.hello} <strong>{userName}</strong>,
            </Text>

            <Text style={text}>{t.confirmed}</Text>

            {/* Property Image */}
            {propertyImage && (
              <Section style={imageSection}>
                <Img
                  src={propertyImage}
                  width="100%"
                  alt={propertyName}
                  style={propertyImg}
                />
              </Section>
            )}

            {/* Booking Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={h2}>
                {t.bookingDetails}
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>{t.bookingId}:</Column>
                <Column style={detailValue}>
                  <strong>{bookingId}</strong>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>{t.property}:</Column>
                <Column style={detailValue}>{propertyName}</Column>
              </Row>

              {address && (
                <Row style={detailRow}>
                  <Column style={detailLabel}>{t.address}:</Column>
                  <Column style={detailValue}>{address}</Column>
                </Row>
              )}

              <Row style={detailRow}>
                <Column style={detailLabel}>{t.checkIn}:</Column>
                <Column style={detailValue}>{checkInDate}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>{t.checkOut}:</Column>
                <Column style={detailValue}>{checkOutDate}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>{t.guests}:</Column>
                <Column style={detailValue}>{guests}</Column>
              </Row>

              <Hr style={hr} />

              <Row style={totalRow}>
                <Column style={detailLabel}>
                  <strong>{t.total}:</strong>
                </Column>
                <Column style={totalValue}>
                  <strong>
                    {currency} {totalPrice}
                  </strong>
                </Column>
              </Row>
            </Section>

            {/* Next Steps */}
            <Section style={stepsSection}>
              <Heading as="h2" style={h2}>
                {t.whatNext}
              </Heading>
              <Text style={stepText}>{t.step1}</Text>
              <Text style={stepText}>{t.step2}</Text>
              <Text style={stepText}>{t.step3}</Text>
            </Section>

            {/* CTA Button */}
            <Section style={buttonSection}>
              <Button style={button} href={confirmationUrl}>
                {t.viewBooking}
              </Button>
            </Section>

            {/* Support */}
            <Hr style={hr} />
            <Text style={supportText}>
              <strong>{t.needHelp}</strong>
              <br />
              {t.support}
            </Text>
          </Section>

          {/* Copyright */}
          <Text style={copyright}>{t.footer}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default BookingConfirmationEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const logoSection = {
  padding: '32px 20px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const badgeSection = {
  textAlign: 'center' as const,
  margin: '16px 0',
};

const badge = {
  backgroundColor: '#10b981',
  color: '#ffffff',
  fontSize: '48px',
  fontWeight: '700',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
};

const content = {
  padding: '0 48px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '32px',
  fontWeight: '700',
  lineHeight: '1.3',
  margin: '16px 0',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '24px 0 16px',
};

const text = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
};

const imageSection = {
  margin: '24px 0',
};

const propertyImg = {
  borderRadius: '12px',
  width: '100%',
  height: 'auto',
};

const detailsSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
};

const detailRow = {
  marginBottom: '12px',
};

const detailLabel = {
  color: '#737373',
  fontSize: '14px',
  width: '40%',
  verticalAlign: 'top',
};

const detailValue = {
  color: '#1a1a1a',
  fontSize: '14px',
  width: '60%',
  verticalAlign: 'top',
};

const totalRow = {
  marginTop: '16px',
};

const totalValue = {
  color: '#2563eb',
  fontSize: '18px',
  width: '60%',
  verticalAlign: 'top',
};

const stepsSection = {
  margin: '32px 0',
};

const stepText = {
  color: '#404040',
  fontSize: '15px',
  lineHeight: '1.8',
  margin: '8px 0',
};

const buttonSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 40px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '24px 0',
};

const supportText = {
  color: '#525252',
  fontSize: '14px',
  lineHeight: '1.6',
  textAlign: 'center' as const,
};

const copyright = {
  color: '#a3a3a3',
  fontSize: '12px',
  lineHeight: '1.5',
  textAlign: 'center' as const,
  margin: '0 48px',
};

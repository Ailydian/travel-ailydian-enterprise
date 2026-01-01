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

interface BookingReminderEmailProps {
  userName: string;
  bookingId: string;
  propertyName: string;
  checkInDate: string;
  checkInTime?: string;
  address: string;
  confirmationUrl: string;
  language?: 'en' | 'tr' | 'ru';
}

const translations = {
  en: {
    preview: 'Your trip is tomorrow! - Travel.Ailydian',
    heading: 'Your Trip is Tomorrow!',
    hello: 'Hello',
    reminder: "This is a friendly reminder that your check-in is scheduled for tomorrow. We hope you're excited!",
    checkInInfo: 'Check-in Information',
    property: 'Property',
    checkIn: 'Check-in Date',
    time: 'Check-in Time',
    address: 'Address',
    preparation: 'Before You Go',
    tip1: '✓ Check weather forecast and pack accordingly',
    tip2: '✓ Have your booking confirmation ready',
    tip3: '✓ Verify check-in instructions from the property',
    tip4: '✓ Plan your route to the property',
    viewBooking: 'View Booking Details',
    contact: 'Need to contact the property?',
    contactInfo: 'You can find contact details in your booking confirmation.',
    enjoy: 'Have a wonderful trip!',
    footer: '© 2024 Travel.Ailydian.com',
  },
  tr: {
    preview: 'Seyahatiniz yarın! - Travel.Ailydian',
    heading: 'Seyahatiniz Yarın!',
    hello: 'Merhaba',
    reminder: 'Girişinizin yarın olduğunu hatırlatmak istedik. Umarız heyecanlısınızdır!',
    checkInInfo: 'Giriş Bilgileri',
    property: 'Tesis',
    checkIn: 'Giriş Tarihi',
    time: 'Giriş Saati',
    address: 'Adres',
    preparation: 'Gitmeden Önce',
    tip1: '✓ Hava durumunu kontrol edin ve ona göre hazırlanın',
    tip2: '✓ Rezervasyon onayınızı hazır bulundurun',
    tip3: '✓ Tesisten gelen giriş talimatlarını doğrulayın',
    tip4: '✓ Tesise olan rotanızı planlayın',
    viewBooking: 'Rezervasyon Detaylarını Görüntüle',
    contact: 'Tesis ile iletişime mi geçmeniz gerekiyor?',
    contactInfo: 'İletişim bilgilerini rezervasyon onayınızda bulabilirsiniz.',
    enjoy: 'İyi yolculuklar!',
    footer: '© 2024 Travel.Ailydian.com',
  },
  ru: {
    preview: 'Ваша поездка завтра! - Travel.Ailydian',
    heading: 'Ваша поездка завтра!',
    hello: 'Здравствуйте',
    reminder: 'Напоминаем, что ваш заезд запланирован на завтра. Надеемся, вы в предвкушении!',
    checkInInfo: 'Информация о заезде',
    property: 'Объект',
    checkIn: 'Дата заезда',
    time: 'Время заезда',
    address: 'Адрес',
    preparation: 'Перед поездкой',
    tip1: '✓ Проверьте прогноз погоды и собирайтесь соответственно',
    tip2: '✓ Имейте при себе подтверждение бронирования',
    tip3: '✓ Проверьте инструкции по заезду от объекта',
    tip4: '✓ Спланируйте маршрут до объекта',
    viewBooking: 'Посмотреть детали бронирования',
    contact: 'Нужно связаться с объектом?',
    contactInfo: 'Вы можете найти контактную информацию в подтверждении бронирования.',
    enjoy: 'Приятной поездки!',
    footer: '© 2024 Travel.Ailydian.com',
  },
};

export const BookingReminderEmail: React.FC<Readonly<BookingReminderEmailProps>> = ({
  userName = 'Traveler',
  bookingId,
  propertyName,
  checkInDate,
  checkInTime = '15:00',
  address,
  confirmationUrl,
  language = 'en',
}) => {
  const t = translations[language];

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src="https://holiday.ailydian.com/logo.png"
              width="150"
              height="50"
              alt="Travel.Ailydian"
              style={logo}
            />
          </Section>

          <Section style={content}>
            <Heading style={h1}>{t.heading}</Heading>

            <Text style={text}>
              {t.hello} <strong>{userName}</strong>,
            </Text>

            <Text style={text}>{t.reminder}</Text>

            <Section style={detailsSection}>
              <Heading as="h2" style={h2}>
                {t.checkInInfo}
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>{t.property}:</Column>
                <Column style={detailValue}>{propertyName}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>{t.checkIn}:</Column>
                <Column style={detailValue}>{checkInDate}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>{t.time}:</Column>
                <Column style={detailValue}>{checkInTime}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>{t.address}:</Column>
                <Column style={detailValue}>{address}</Column>
              </Row>
            </Section>

            <Section style={tipsSection}>
              <Heading as="h2" style={h2}>
                {t.preparation}
              </Heading>
              <Text style={tipText}>{t.tip1}</Text>
              <Text style={tipText}>{t.tip2}</Text>
              <Text style={tipText}>{t.tip3}</Text>
              <Text style={tipText}>{t.tip4}</Text>
            </Section>

            <Section style={buttonSection}>
              <Button style={button} href={confirmationUrl}>
                {t.viewBooking}
              </Button>
            </Section>

            <Hr style={hr} />
            <Text style={contactText}>
              <strong>{t.contact}</strong>
              <br />
              {t.contactInfo}
            </Text>

            <Text style={footer}>{t.enjoy}</Text>
          </Section>

          <Text style={copyright}>{t.footer}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default BookingReminderEmail;

// Styles (similar to booking confirmation)
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
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

const detailsSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  border: '2px solid #fbbf24',
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

const tipsSection = {
  margin: '32px 0',
};

const tipText = {
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

const contactText = {
  color: '#525252',
  fontSize: '14px',
  lineHeight: '1.6',
  textAlign: 'center' as const,
};

const footer = {
  color: '#737373',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '32px 0 16px',
  textAlign: 'center' as const,
};

const copyright = {
  color: '#a3a3a3',
  fontSize: '12px',
  lineHeight: '1.5',
  textAlign: 'center' as const,
  margin: '0 48px',
};

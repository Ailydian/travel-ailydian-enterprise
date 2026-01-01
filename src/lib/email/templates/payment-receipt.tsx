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

interface PaymentReceiptEmailProps {
  userName: string;
  receiptId: string;
  bookingId: string;
  propertyName: string;
  paymentDate: string;
  paymentMethod: string;
  subtotal: string;
  taxes: string;
  fees: string;
  total: string;
  currency: string;
  receiptUrl: string;
  language?: 'en' | 'tr' | 'ru';
}

const translations = {
  en: {
    preview: 'Payment Receipt - Travel.Ailydian',
    heading: 'Payment Receipt',
    hello: 'Hello',
    received: 'We have received your payment. Thank you for your booking!',
    receiptDetails: 'Receipt Details',
    receiptId: 'Receipt ID',
    bookingId: 'Booking ID',
    property: 'Property',
    date: 'Payment Date',
    method: 'Payment Method',
    breakdown: 'Payment Breakdown',
    subtotal: 'Subtotal',
    taxes: 'Taxes & Fees',
    serviceFees: 'Service Fees',
    total: 'Total Paid',
    downloadReceipt: 'Download Receipt',
    questions: 'Questions about this payment?',
    support: 'Contact our support team for assistance.',
    footer: '© 2024 Travel.Ailydian.com',
  },
  tr: {
    preview: 'Ödeme Makbuzu - Travel.Ailydian',
    heading: 'Ödeme Makbuzu',
    hello: 'Merhaba',
    received: 'Ödemenizi aldık. Rezervasyonunuz için teşekkür ederiz!',
    receiptDetails: 'Makbuz Detayları',
    receiptId: 'Makbuz Numarası',
    bookingId: 'Rezervasyon Numarası',
    property: 'Tesis',
    date: 'Ödeme Tarihi',
    method: 'Ödeme Yöntemi',
    breakdown: 'Ödeme Dökümü',
    subtotal: 'Ara Toplam',
    taxes: 'Vergiler ve Harçlar',
    serviceFees: 'Hizmet Bedeli',
    total: 'Ödenen Toplam',
    downloadReceipt: 'Makbuzu İndir',
    questions: 'Bu ödeme hakkında sorularınız mı var?',
    support: 'Yardım için destek ekibimizle iletişime geçin.',
    footer: '© 2024 Travel.Ailydian.com',
  },
  ru: {
    preview: 'Квитанция об оплате - Travel.Ailydian',
    heading: 'Квитанция об оплате',
    hello: 'Здравствуйте',
    received: 'Мы получили ваш платеж. Спасибо за бронирование!',
    receiptDetails: 'Детали квитанции',
    receiptId: 'Номер квитанции',
    bookingId: 'Номер бронирования',
    property: 'Объект',
    date: 'Дата платежа',
    method: 'Способ оплаты',
    breakdown: 'Разбивка платежа',
    subtotal: 'Промежуточный итог',
    taxes: 'Налоги и сборы',
    serviceFees: 'Сервисные сборы',
    total: 'Всего оплачено',
    downloadReceipt: 'Скачать квитанцию',
    questions: 'Вопросы об этом платеже?',
    support: 'Свяжитесь с нашей службой поддержки.',
    footer: '© 2024 Travel.Ailydian.com',
  },
};

export const PaymentReceiptEmail: React.FC<Readonly<PaymentReceiptEmailProps>> = ({
  userName = 'Traveler',
  receiptId,
  bookingId,
  propertyName,
  paymentDate,
  paymentMethod,
  subtotal,
  taxes,
  fees,
  total,
  currency = 'USD',
  receiptUrl,
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

            <Text style={text}>{t.received}</Text>

            <Section style={detailsSection}>
              <Heading as="h2" style={h2}>
                {t.receiptDetails}
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>{t.receiptId}:</Column>
                <Column style={detailValue}>
                  <strong>{receiptId}</strong>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>{t.bookingId}:</Column>
                <Column style={detailValue}>{bookingId}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>{t.property}:</Column>
                <Column style={detailValue}>{propertyName}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>{t.date}:</Column>
                <Column style={detailValue}>{paymentDate}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>{t.method}:</Column>
                <Column style={detailValue}>{paymentMethod}</Column>
              </Row>
            </Section>

            <Section style={breakdownSection}>
              <Heading as="h2" style={h2}>
                {t.breakdown}
              </Heading>

              <Row style={breakdownRow}>
                <Column style={breakdownLabel}>{t.subtotal}</Column>
                <Column style={breakdownValue}>
                  {currency} {subtotal}
                </Column>
              </Row>

              <Row style={breakdownRow}>
                <Column style={breakdownLabel}>{t.taxes}</Column>
                <Column style={breakdownValue}>
                  {currency} {taxes}
                </Column>
              </Row>

              <Row style={breakdownRow}>
                <Column style={breakdownLabel}>{t.serviceFees}</Column>
                <Column style={breakdownValue}>
                  {currency} {fees}
                </Column>
              </Row>

              <Hr style={hr} />

              <Row style={totalRow}>
                <Column style={totalLabel}>
                  <strong>{t.total}</strong>
                </Column>
                <Column style={totalValue}>
                  <strong>
                    {currency} {total}
                  </strong>
                </Column>
              </Row>
            </Section>

            <Section style={buttonSection}>
              <Button style={button} href={receiptUrl}>
                {t.downloadReceipt}
              </Button>
            </Section>

            <Hr style={hr} />
            <Text style={supportText}>
              <strong>{t.questions}</strong>
              <br />
              {t.support}
            </Text>
          </Section>

          <Text style={copyright}>{t.footer}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default PaymentReceiptEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
};

const container = {
  backgroundColor: 'var(--lydian-text-inverse)',
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

const breakdownSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f0fdf4',
  borderRadius: '8px',
  border: '1px solid #86efac',
};

const breakdownRow = {
  marginBottom: '12px',
};

const breakdownLabel = {
  color: '#404040',
  fontSize: '14px',
  width: '60%',
};

const breakdownValue = {
  color: '#404040',
  fontSize: '14px',
  width: '40%',
  textAlign: 'right' as const,
};

const totalRow = {
  marginTop: '16px',
};

const totalLabel = {
  color: '#1a1a1a',
  fontSize: '18px',
  width: '60%',
};

const totalValue = {
  color: '#16a34a',
  fontSize: '20px',
  width: '40%',
  textAlign: 'right' as const,
};

const buttonSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: 'var(--lydian-info-hover)',
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
  borderColor: 'var(--lydian-border)',
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

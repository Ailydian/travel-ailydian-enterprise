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
} from '@react-email/components';
import * as React from 'react';

interface PasswordResetEmailProps {
  userName: string;
  resetUrl: string;
  expiresIn?: string;
  language?: 'en' | 'tr' | 'ru';
}

const translations = {
  en: {
    preview: 'Reset Your Password - Travel.Ailydian',
    heading: 'Password Reset Request',
    hello: 'Hello',
    request: 'We received a request to reset your password. Click the button below to create a new password.',
    notYou: "If you didn't request this, you can safely ignore this email.",
    expires: 'This link will expire in',
    resetButton: 'Reset Password',
    security: 'Security Tips',
    tip1: '• Never share your password with anyone',
    tip2: '• Use a strong, unique password',
    tip3: '• Enable two-factor authentication',
    manual: 'Or copy and paste this URL into your browser:',
    footer: '© 2024 Travel.Ailydian.com',
  },
  tr: {
    preview: 'Şifrenizi Sıfırlayın - Travel.Ailydian',
    heading: 'Şifre Sıfırlama İsteği',
    hello: 'Merhaba',
    request: 'Şifrenizi sıfırlamak için bir istek aldık. Yeni bir şifre oluşturmak için aşağıdaki butona tıklayın.',
    notYou: 'Bu isteği siz yapmadıysanız, bu e-postayı güvenle yok sayabilirsiniz.',
    expires: 'Bu bağlantı şu süre içinde geçersiz olacak:',
    resetButton: 'Şifreyi Sıfırla',
    security: 'Güvenlik İpuçları',
    tip1: '• Şifrenizi asla kimseyle paylaşmayın',
    tip2: '• Güçlü ve benzersiz bir şifre kullanın',
    tip3: '• İki faktörlü kimlik doğrulamayı etkinleştirin',
    manual: 'Veya bu URL\'yi tarayıcınıza kopyalayıp yapıştırın:',
    footer: '© 2024 Travel.Ailydian.com',
  },
  ru: {
    preview: 'Сброс пароля - Travel.Ailydian',
    heading: 'Запрос на сброс пароля',
    hello: 'Здравствуйте',
    request: 'Мы получили запрос на сброс вашего пароля. Нажмите кнопку ниже, чтобы создать новый пароль.',
    notYou: 'Если вы не запрашивали это, можете спокойно проигнорировать это письмо.',
    expires: 'Эта ссылка истечет через',
    resetButton: 'Сбросить пароль',
    security: 'Советы по безопасности',
    tip1: '• Никогда не делитесь своим паролем',
    tip2: '• Используйте надежный уникальный пароль',
    tip3: '• Включите двухфакторную аутентификацию',
    manual: 'Или скопируйте и вставьте этот URL в браузер:',
    footer: '© 2024 Travel.Ailydian.com',
  },
};

export const PasswordResetEmail: React.FC<Readonly<PasswordResetEmailProps>> = ({
  userName = 'User',
  resetUrl,
  expiresIn = '1 hour',
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

            <Text style={text}>{t.request}</Text>

            <Section style={buttonSection}>
              <Button style={button} href={resetUrl}>
                {t.resetButton}
              </Button>
            </Section>

            <Text style={expiryText}>
              {t.expires} <strong>{expiresIn}</strong>
            </Text>

            <Hr style={hr} />

            <Text style={warningText}>{t.notYou}</Text>

            <Section style={securitySection}>
              <Heading as="h2" style={h2}>
                {t.security}
              </Heading>
              <Text style={tipText}>{t.tip1}</Text>
              <Text style={tipText}>{t.tip2}</Text>
              <Text style={tipText}>{t.tip3}</Text>
            </Section>

            <Hr style={hr} />

            <Text style={manualText}>{t.manual}</Text>
            <Text style={urlText}>{resetUrl}</Text>
          </Section>

          <Text style={copyright}>{t.footer}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default PasswordResetEmail;

// Styles
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

const buttonSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#dc2626',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 40px',
};

const expiryText = {
  color: '#737373',
  fontSize: '14px',
  textAlign: 'center' as const,
  margin: '16px 0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const warningText = {
  color: '#525252',
  fontSize: '14px',
  lineHeight: '1.6',
  textAlign: 'center' as const,
  backgroundColor: '#fef3c7',
  padding: '16px',
  borderRadius: '8px',
  border: '1px solid #fbbf24',
};

const securitySection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
};

const tipText = {
  color: '#404040',
  fontSize: '14px',
  lineHeight: '1.8',
  margin: '8px 0',
};

const manualText = {
  color: '#737373',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '24px 0 8px',
};

const urlText = {
  color: '#2563eb',
  fontSize: '12px',
  textAlign: 'center' as const,
  wordBreak: 'break-all' as const,
  padding: '12px',
  backgroundColor: '#f8fafc',
  borderRadius: '4px',
};

const copyright = {
  color: '#a3a3a3',
  fontSize: '12px',
  lineHeight: '1.5',
  textAlign: 'center' as const,
  margin: '0 48px',
};

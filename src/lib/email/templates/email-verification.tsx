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

interface EmailVerificationProps {
  userName: string;
  verificationUrl: string;
  verificationCode?: string;
  expiresIn?: string;
  language?: 'en' | 'tr' | 'ru';
}

const translations = {
  en: {
    preview: 'Verify Your Email - Travel.Ailydian',
    heading: 'Verify Your Email Address',
    hello: 'Hello',
    intro: "Thanks for signing up! Please verify your email address to activate your account and start exploring the world with Travel.Ailydian.",
    verifyButton: 'Verify Email Address',
    orCode: 'Or enter this verification code:',
    expires: 'This verification link will expire in',
    alreadyVerified: 'Already verified?',
    login: 'You can log in to your account.',
    notYou: "Didn't create an account?",
    ignore: 'If you didn\'t create an account, you can safely ignore this email.',
    footer: '© 2024 Travel.Ailydian.com',
  },
  tr: {
    preview: 'E-postanızı Doğrulayın - Travel.Ailydian',
    heading: 'E-posta Adresinizi Doğrulayın',
    hello: 'Merhaba',
    intro: 'Kaydolduğunuz için teşekkürler! Hesabınızı aktifleştirmek ve Travel.Ailydian ile dünyayı keşfetmeye başlamak için lütfen e-posta adresinizi doğrulayın.',
    verifyButton: 'E-postayı Doğrula',
    orCode: 'Veya bu doğrulama kodunu girin:',
    expires: 'Bu doğrulama bağlantısı şu süre içinde geçersiz olacak:',
    alreadyVerified: 'Zaten doğruladınız mı?',
    login: 'Hesabınıza giriş yapabilirsiniz.',
    notYou: 'Bir hesap oluşturmadınız mı?',
    ignore: 'Bir hesap oluşturmadıysanız, bu e-postayı güvenle yok sayabilirsiniz.',
    footer: '© 2024 Travel.Ailydian.com',
  },
  ru: {
    preview: 'Подтвердите Email - Travel.Ailydian',
    heading: 'Подтвердите адрес электронной почты',
    hello: 'Здравствуйте',
    intro: 'Спасибо за регистрацию! Пожалуйста, подтвердите свой адрес электронной почты, чтобы активировать учетную запись и начать исследовать мир с Travel.Ailydian.',
    verifyButton: 'Подтвердить Email',
    orCode: 'Или введите этот код подтверждения:',
    expires: 'Эта ссылка для подтверждения истечет через',
    alreadyVerified: 'Уже подтвердили?',
    login: 'Вы можете войти в свой аккаунт.',
    notYou: 'Не создавали аккаунт?',
    ignore: 'Если вы не создавали аккаунт, можете спокойно проигнорировать это письмо.',
    footer: '© 2024 Travel.Ailydian.com',
  },
};

export const EmailVerificationEmail: React.FC<Readonly<EmailVerificationProps>> = ({
  userName = 'Traveler',
  verificationUrl,
  verificationCode,
  expiresIn = '24 hours',
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

            <Text style={text}>{t.intro}</Text>

            <Section style={buttonSection}>
              <Button style={button} href={verificationUrl}>
                {t.verifyButton}
              </Button>
            </Section>

            {verificationCode && (
              <>
                <Text style={orText}>{t.orCode}</Text>
                <Section style={codeSection}>
                  <Text style={code}>{verificationCode}</Text>
                </Section>
              </>
            )}

            <Text style={expiryText}>
              {t.expires} <strong>{expiresIn}</strong>
            </Text>

            <Hr style={hr} />

            <Section style={infoSection}>
              <Text style={infoText}>
                <strong>{t.alreadyVerified}</strong>
                <br />
                {t.login}
              </Text>
              <Text style={infoText}>
                <strong>{t.notYou}</strong>
                <br />
                {t.ignore}
              </Text>
            </Section>
          </Section>

          <Text style={copyright}>{t.footer}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailVerificationEmail;

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
  backgroundColor: 'var(--lydian-success)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 40px',
};

const orText = {
  color: '#737373',
  fontSize: '14px',
  textAlign: 'center' as const,
  margin: '24px 0 16px',
};

const codeSection = {
  backgroundColor: '#f8fafc',
  border: '2px dashed #cbd5e1',
  borderRadius: '8px',
  padding: '24px',
  margin: '16px 0',
  textAlign: 'center' as const,
};

const code = {
  color: '#1a1a1a',
  fontSize: '32px',
  fontWeight: '700',
  letterSpacing: '8px',
  fontFamily: 'monospace',
  margin: '0',
};

const expiryText = {
  color: '#737373',
  fontSize: '14px',
  textAlign: 'center' as const,
  margin: '16px 0',
};

const hr = {
  borderColor: 'var(--lydian-border)',
  margin: '32px 0',
};

const infoSection = {
  margin: '24px 0',
};

const infoText = {
  color: '#525252',
  fontSize: '14px',
  lineHeight: '1.6',
  textAlign: 'center' as const,
  margin: '16px 0',
};

const copyright = {
  color: '#a3a3a3',
  fontSize: '12px',
  lineHeight: '1.5',
  textAlign: 'center' as const,
  margin: '0 48px',
};

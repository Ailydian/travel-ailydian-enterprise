import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  userName: string;
  userEmail: string;
  language?: 'en' | 'tr' | 'ru';
}

const translations = {
  en: {
    preview: 'Welcome to Travel.Ailydian - Your Journey Begins Here',
    greeting: 'Welcome to Travel.Ailydian!',
    hello: 'Hello',
    intro: "We're thrilled to have you join our community of global travelers. Your account has been successfully created, and you're now ready to explore the world with AI-powered travel planning.",
    features: 'What you can do with Travel.Ailydian:',
    feature1: '🌍 Discover unique destinations worldwide',
    feature2: '🏨 Book hotels, villas, and vacation rentals',
    feature3: '🚗 Reserve vehicles and airport transfers',
    feature4: '🎯 Get AI-powered personalized recommendations',
    feature5: '💰 Track prices and get the best deals',
    feature6: '🎫 Book tours and experiences',
    cta: 'Start Exploring',
    questions: 'Have questions?',
    support: 'Our support team is here to help 24/7.',
    thanks: 'Thank you for choosing Travel.Ailydian!',
    team: 'The Travel.Ailydian Team',
    footer: '© 2024 Travel.Ailydian.com - Your AI-Powered Travel Companion',
  },
  tr: {
    preview: "Travel.Ailydian'a Hoş Geldiniz - Yolculuğunuz Burada Başlıyor",
    greeting: "Travel.Ailydian'a Hoş Geldiniz!",
    hello: 'Merhaba',
    intro: 'Küresel gezginler topluluğumuza katıldığınız için çok heyecanlıyız. Hesabınız başarıyla oluşturuldu ve artık AI destekli seyahat planlamasıyla dünyayı keşfetmeye hazırsınız.',
    features: "Travel.Ailydian ile neler yapabilirsiniz:",
    feature1: '🌍 Dünya çapında benzersiz destinasyonları keşfedin',
    feature2: '🏨 Otel, villa ve tatil evleri rezervasyonu yapın',
    feature3: '🚗 Araç kiralama ve havalimanı transferleri rezerve edin',
    feature4: '🎯 AI destekli kişiselleştirilmiş öneriler alın',
    feature5: '💰 Fiyatları takip edin ve en iyi fırsatları yakalayın',
    feature6: '🎫 Turlar ve deneyimler rezerve edin',
    cta: 'Keşfetmeye Başla',
    questions: 'Sorularınız mı var?',
    support: 'Destek ekibimiz 7/24 yardımınıza hazır.',
    thanks: "Travel.Ailydian'ı seçtiğiniz için teşekkür ederiz!",
    team: 'Travel.Ailydian Ekibi',
    footer: '© 2024 Travel.Ailydian.com - AI Destekli Seyahat Yardımcınız',
  },
  ru: {
    preview: 'Добро пожаловать в Travel.Ailydian - Ваше путешествие начинается здесь',
    greeting: 'Добро пожаловать в Travel.Ailydian!',
    hello: 'Здравствуйте',
    intro: 'Мы рады приветствовать вас в нашем сообществе путешественников. Ваш аккаунт успешно создан, и теперь вы готовы исследовать мир с помощью AI-планирования путешествий.',
    features: 'Что вы можете делать с Travel.Ailydian:',
    feature1: '🌍 Открывайте уникальные направления по всему миру',
    feature2: '🏨 Бронируйте отели, виллы и дома для отпуска',
    feature3: '🚗 Резервируйте автомобили и трансферы из аэропорта',
    feature4: '🎯 Получайте AI-персонализированные рекомендации',
    feature5: '💰 Отслеживайте цены и получайте лучшие предложения',
    feature6: '🎫 Бронируйте туры и впечатления',
    cta: 'Начать исследование',
    questions: 'Есть вопросы?',
    support: 'Наша служба поддержки готова помочь 24/7.',
    thanks: 'Спасибо, что выбрали Travel.Ailydian!',
    team: 'Команда Travel.Ailydian',
    footer: '© 2024 Travel.Ailydian.com - Ваш AI-помощник в путешествиях',
  },
};

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({
  userName = 'Traveler',
  userEmail,
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

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>{t.greeting}</Heading>

            <Text style={text}>
              {t.hello} <strong>{userName}</strong>,
            </Text>

            <Text style={text}>{t.intro}</Text>

            {/* Features */}
            <Section style={featuresSection}>
              <Heading as="h2" style={h2}>
                {t.features}
              </Heading>
              <Text style={featureText}>{t.feature1}</Text>
              <Text style={featureText}>{t.feature2}</Text>
              <Text style={featureText}>{t.feature3}</Text>
              <Text style={featureText}>{t.feature4}</Text>
              <Text style={featureText}>{t.feature5}</Text>
              <Text style={featureText}>{t.feature6}</Text>
            </Section>

            {/* CTA Button */}
            <Section style={buttonSection}>
              <Button
                style={button}
                href={`https://holiday.ailydian.com/${language}/dashboard`}
              >
                {t.cta}
              </Button>
            </Section>

            {/* Support */}
            <Hr style={hr} />
            <Text style={supportText}>
              <strong>{t.questions}</strong>
              <br />
              {t.support}
            </Text>

            {/* Footer */}
            <Text style={footer}>
              {t.thanks}
              <br />
              {t.team}
            </Text>
          </Section>

          {/* Copyright */}
          <Text style={copyright}>{t.footer}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

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
  fontSize: '24px',
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

const featuresSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
};

const featureText = {
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
  margin: '32px 0',
};

const supportText = {
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

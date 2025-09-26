// GetYourGuide Style Homepage - Main Entry Point
import GetYourGuideStyleHome from './home';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Main Home Page - Using GetYourGuide Style Theme
export default function HomePage() {
  return <GetYourGuideStyleHome />;
}

// Get Static Props for i18n
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};
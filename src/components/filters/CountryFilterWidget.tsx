import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { Globe, MapPin, ChevronDown } from 'lucide-react';

interface Country {
  code: string;
  name: {
    tr: string;
    en: string;
    de: string;
    ru: string;
    ar: string;
    fa: string;
    fr: string;
    el: string;
  };
  flag: string;
  tourCount: number;
}

interface CountryFilterWidgetProps {
  countries: Country[];
  selectedCountry: string | null;
  onCountrySelect: (countryCode: string | null) => void;
  className?: string;
}

export const CountryFilterWidget: React.FC<CountryFilterWidgetProps> = ({
  countries,
  selectedCountry,
  onCountrySelect,
  className = ''
}) => {
  const { t, i18n } = useTranslation('common');
  const currentLang = (i18n.language || 'tr') as keyof Country['name'];

  return (
    <div className={`bg-lydian-glass-dark rounded-2xl shadow-lg border border-lydian-border-light overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-lydian-primary to-lydian-secondary p-4">
        <div className="flex items-center gap-3 text-lydian-text-inverse">
          <div className="p-2 bg-lydian-glass-dark-heavy rounded-lg backdrop-blur-sm">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{t('tours.filterByCountry') || 'Ülkeye Göre Filtrele'}</h3>
            <p className="text-sm text-lydian-text-inverse/80">{t('tours.selectDestination') || 'Keşfetmek istediğiniz ülkeyi seçin'}</p>
          </div>
        </div>
      </div>

      {/* Country List */}
      <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
        {/* All Countries Option */}
        <motion.button
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCountrySelect(null)}
          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
          selectedCountry === null ?
          'bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white shadow-lg shadow-red-500/30' :
          'bg-white/5 hover:bg-white/10 text-gray-200'}`
          }>

          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
            selectedCountry === null ? 'bg-white/20' : 'bg-white'}`
            }>
              <Globe className={`w-5 h-5 ${selectedCountry === null ? 'text-white' : 'text-lydian-primary'}`} />
            </div>
            <div className="text-left">
              <p className="font-bold">{t('tours.allCountries') || 'Tüm Ülkeler'}</p>
              <p className={`text-sm ${selectedCountry === null ? 'text-white/80' : 'text-gray-400'}`}>
                {countries.reduce((sum, c) => sum + c.tourCount, 0)} {t('tours.tours') || 'tur'}
              </p>
            </div>
          </div>
          {selectedCountry === null &&
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 bg-lydian-glass-dark rounded-full flex items-center justify-center">

              <div className="w-3 h-3 bg-lydian-primary rounded-full" />
            </motion.div>
          }
        </motion.button>

        {/* Individual Countries */}
        {countries.map((country, index) =>
        <motion.button
          key={country.code}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCountrySelect(country.code)}
          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
          selectedCountry === country.code ?
          'bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white shadow-lg shadow-red-500/30' :
          'bg-white/5 hover:bg-white/10 text-gray-200'}`
          }>

            <div className="flex items-center gap-3">
              <div className="text-3xl">{country.flag}</div>
              <div className="text-left">
                <p className="font-bold">{country.name[currentLang]}</p>
                <p className={`text-sm ${selectedCountry === country.code ? 'text-white/80' : 'text-gray-400'}`}>
                  {country.tourCount} {t('tours.tours') || 'tur'}
                </p>
              </div>
            </div>
            {selectedCountry === country.code &&
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 bg-lydian-glass-dark rounded-full flex items-center justify-center">

                <div className="w-3 h-3 bg-lydian-primary rounded-full" />
              </motion.div>
          }
          </motion.button>
        )}
      </div>

      {/* Footer Stats */}
      <div className="bg-lydian-glass-dark p-4 border-t border-lydian-border-light">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-lydian-text-dim">
            <MapPin className="w-4 h-4" />
            <span>
              {selectedCountry ?
              `${countries.find((c) => c.code === selectedCountry)?.tourCount || 0} ${t('tours.toursAvailable') || 'tur mevcut'}` :
              `${countries.reduce((sum, c) => sum + c.tourCount, 0)} ${t('tours.totalTours') || 'toplam tur'}`
              }
            </span>
          </div>
          {selectedCountry &&
          <button
            onClick={() => onCountrySelect(null)}
            className="text-lydian-primary hover:text-lydian-secondary font-semibold transition-colors">

              {t('tours.clearFilter') || 'Filtreyi Temizle'}
            </button>
          }
        </div>
      </div>
    </div>);

};

export default CountryFilterWidget;
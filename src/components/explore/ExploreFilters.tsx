import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, Check } from 'lucide-react';
import { useTranslation } from 'next-i18next';

export const ExploreFilters: React.FC = () => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = ['Tours', 'Adventures', 'Cultural', 'Water Sports', 'Family'];
  const durations = ['Half Day', 'Full Day', '2 Days', '3+ Days'];

  return (
    <div className="sticky top-20">
      {/* Filter Button (Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold mb-4">

        <SlidersHorizontal className="w-5 h-5" />
        <span>{t('search.filters')}</span>
      </button>

      {/* Filters Panel */}
      <div className={`bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-xl shadow-lg p-6 space-y-6 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">{t('search.filters')}</h3>
          <button onClick={() => setIsOpen(false)} className="lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Price Range */}
        <div>
          <label className="font-semibold text-white mb-3 block">{t('search.priceRange')}</label>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full" />

          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>₺{priceRange[0]}</span>
            <span>₺{priceRange[1]}</span>
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="font-semibold text-white mb-3 block">{t('search.categories')}</label>
          <div className="space-y-2">
            {categories.map((cat) =>
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, cat]);
                  } else {
                    setSelectedCategories(selectedCategories.filter((c) => c !== cat));
                  }
                }}
                className="w-4 h-4 text-blue-500 rounded focus:ring-lydian-primary" />

                <span className="text-sm text-gray-300">{cat}</span>
              </label>
            )}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="font-semibold text-white mb-3 block">{t('search.duration')}</label>
          <div className="grid grid-cols-2 gap-2">
            {durations.map((dur) =>
            <button key={dur} className="py-2 px-3 border border-white/20 rounded-lg text-sm hover:border-blue-500 hover:text-blue-500 transition-colors">
                {dur}
              </button>
            )}
          </div>
        </div>

        {/* Apply Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all">
          {t('search.applyFilters')}
        </button>
      </div>
    </div>);

};
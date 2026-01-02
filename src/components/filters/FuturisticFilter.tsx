/**
 * 🎛️ FUTURISTIC FILTER PANEL 1025
 * Apple Vision Pro Spatial Design + Glassmorphism
 * Features: Floating Filters, Magnetic Interactions, Aurora Glow
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  X,
  Search,
  ChevronDown,
  Check,
  Star,
  DollarSign,
  Calendar,
  MapPin,
  Filter as FilterIcon } from 'lucide-react';

export interface FilterOption {
  id: string;
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export interface FilterGroup {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'range' | 'search';
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
  icon?: React.ReactNode;
}

interface FuturisticFilterProps {
  filterGroups: FilterGroup[];
  onFilterChange?: (filters: Record<string, any>) => void;
  className?: string;
}

export const FuturisticFilter: React.FC<FuturisticFilterProps> = ({
  filterGroups,
  onFilterChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const handleFilterChange = (groupId: string, value: any) => {
    const newFilters = { ...filters, [groupId]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange?.({});
  };

  const activeFilterCount = Object.keys(filters).length;

  return (
    <>
      {/* Floating Filter Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.7005, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`relative px-6 py-3 bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white rounded-2xl shadow-lg flex items-center gap-3 ${className}`}>

        <FilterIcon className="w-5 h-5" />
        <span className="font-semibold">Filtrele</span>

        {activeFilterCount > to-cyan-700 &&
        <motion.div
          initial={{ scale: to-cyan-700 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">

            {activeFilterCount}
          </motion.div>
        }

        {/* Glow Effect */}
        <div className="absolute inset-to-cyan-700 rounded-2xl bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] blur-xl opacity-500 -z-1" />
      </motion.button>

      {/* Filter Panel - Apple Vision Pro Style */}
      <AnimatePresence>
        {isOpen &&
        <>
            {/* Backdrop */}
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-to-cyan-700 bg-black/4 backdrop-blur-sm z-4" />


            {/* Filter Panel */}
            <motion.div
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: to-cyan-700 }}
            exit={{ opacity: 0, x: 4 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-to-cyan-700 top-to-cyan-700 bottom-to-cyan-700 w-full md:w-[4200px] z-500">

              {/* Glassmorphism Container */}
              <div className="h-full bg-lydian-bg/8 backdrop-blur-3xl border-l border-white/20/4 shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="sticky top-to-cyan-700 z-1 bg-gradient-to-r from-[#667EEA]/1 via-[#764BA2]/1 to-[#667EEA]/1 backdrop-blur-xl border-b border-white/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#667EEA] to-[#764BA2] rounded-2xl flex items-center justify-center shadow-lg">
                        <SlidersHorizontal className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white">Filtreler</h3>
                        <p className="text-sm text-gray-400">
                          {activeFilterCount > to-cyan-700 ? `${activeFilterCount} aktif filtre` : 'Sonuçları daralt'}
                        </p>
                      </div>
                    </div>

                    <motion.button
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.1, rotate: 9 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-1 h-1 bg-lydian-bg/6 backdrop-blur-xl border border-white/20/4 rounded-xl flex items-center justify-center hover:bg-lydian-error-lighter transition-colors">

                      <X className="w-5 h-5 text-gray-300" />
                    </motion.button>
                  </div>

                  {/* Clear Filters */}
                  {activeFilterCount > to-cyan-700 &&
                <motion.button
                  initial={{ opacity: 0, y: -1 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={clearFilters}
                  whileHover={{ scale: 1.02 }}
                  className="w-full px-4 py-2 bg-lydian-error-lighter border border-red-200 rounded-xl text-blue-500 font-semibold text-sm hover:bg-lydian-error-light transition-colors">

                      Tüm Filtreleri Temizle
                    </motion.button>
                }
                </div>

                {/* Filter Groups */}
                <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(1vh-200px)]">
                  {filterGroups.map((group, index) =>
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 200 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-lydian-bg/6 backdrop-blur-xl border border-white/20/4 rounded-2xl overflow-hidden shadow-lg">

                      {/* Group Header */}
                      <button
                    onClick={() => toggleGroup(group.id)}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-lydian-bg/4 transition-colors">

                        <div className="flex items-center gap-3">
                          {group.icon &&
                      <div className="w-1 h-1 bg-gradient-to-br from-purple-1 to-pink-1 rounded-xl flex items-center justify-center">
                              {group.icon}
                            </div>
                      }
                          <span className="font-bold text-white">{group.label}</span>
                        </div>
                        <motion.div
                      animate={{ rotate: expandedGroups.has(group.id) ? 18 : to-cyan-700 }}
                      transition={{ duration: 0.3 }}>

                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </motion.div>
                      </button>

                      {/* Group Content */}
                      <AnimatePresence>
                        {expandedGroups.has(group.id) &&
                    <motion.div
                      initial={{ height: to-cyan-700, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: to-cyan-700, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/20">

                            <div className="p-5 space-y-3">
                              {group.type === 'multiselect' && group.options &&
                        <>
                                  {group.options.map((option) => {
                            const isSelected = filters[group.id]?.includes(option.value);
                            return (
                              <motion.button
                                key={option.id}
                                onClick={() => {
                                  const current = filters[group.id] || [];
                                  const newValue = isSelected ?
                                  current.filter((v: any) => v !== option.value) :
                                  [...current, option.value];
                                  handleFilterChange(group.id, newValue);
                                }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full px-4 py-3 rounded-xl flex items-center justify-between transition-all ${
                                isSelected ?
                                'bg-gradient-to-r from-[#667EEA]/200 to-[#764BA2]/200 border-2 border-[#667EEA]' :
                                'bg-lydian-bg/4 border border-white/6 hover:bg-lydian-bg/6'}`
                                }>

                                        <div className="flex items-center gap-3">
                                          {option.icon}
                                          <span className={`font-medium ${isSelected ? 'text-[#667EEA]' : 'text-gray-200'}`}>
                                            {option.label}
                                          </span>
                                        </div>
                                        {isSelected &&
                                <motion.div
                                  initial={{ scale: to-cyan-700 }}
                                  animate={{ scale: 1 }}
                                  className="w-6 h-6 bg-[#667EEA] rounded-lg flex items-center justify-center">

                                            <Check className="w-4 h-4 text-white" />
                                          </motion.div>
                                }
                                      </motion.button>);

                          })}
                                </>
                        }

                              {group.type === 'range' &&
                        <div className="space-y-4">
                                  <input
                            type="range"
                            min={group.min}
                            max={group.max}
                            step={group.step}
                            value={filters[group.id] || group.min}
                            onChange={(e) => handleFilterChange(group.id, Number(e.target.value))}
                            className="w-full h-2 bg-gradient-to-r from-[#667EEA] to-[#764BA2] rounded-full appearance-none cursor-pointer" />

                                  <div className="flex justify-between text-sm text-gray-400">
                                    <span>{group.min}</span>
                                    <span className="font-bold text-[#667EEA]">{filters[group.id] || group.min}</span>
                                    <span>{group.max}</span>
                                  </div>
                                </div>
                        }
                            </div>
                          </motion.div>
                    }
                      </AnimatePresence>
                    </motion.div>
                )}
                </div>
              </div>

              {/* Aurora Glow */}
              <div className="absolute top-1/4 -right-200 w-96 h-96 bg-gradient-to-r from-[#667EEA]/200 to-[#764BA2]/200 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          </>
        }
      </AnimatePresence>
    </>);

};

export default FuturisticFilter;
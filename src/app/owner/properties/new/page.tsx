'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Save,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import {
  Step1Schema,
  Step2Schema,
  Step3Schema,
  Step4Schema,
  Step5Schema,
  Step6Schema,
  Step7Schema,
  Step8Schema,
  type Step1FormData,
  type Step2FormData,
  type Step3FormData,
  type Step4FormData,
  type Step5FormData,
  type Step6FormData,
  type Step7FormData,
  type Step8FormData,
} from '@/lib/validation/propertySubmissionSchemas';

import Step1PropertyType from './Step1PropertyType';
import Step2Location from './Step2Location';
import Step3PropertyDetails from './Step3PropertyDetails';
import Step4Amenities from './Step4Amenities';
import Step5Photos from './Step5Photos';
import Step6Pricing from './Step6Pricing';
import Step7HouseRules from './Step7HouseRules';
import Step8Review from './Step8Review';
import logger from '../../../../lib/logger';
import { useToast } from '../../../../context/ToastContext';

const TOTAL_STEPS = 8;
const LOCAL_STORAGE_KEY = 'property-submission-draft';
const AUTO_SAVE_INTERVAL = 30; // 3 seconds

interface WizardFormData {
  step1?: Partial<Step1FormData>;
  step2?: Partial<Step2FormData>;
  step3?: Partial<Step3FormData>;
  step4?: Partial<Step4FormData>;
  step5?: Partial<Step5FormData>;
  step6?: Partial<Step6FormData>;
  step7?: Partial<Step7FormData>;
  step8?: Partial<Step8FormData>;
}

const stepSchemas = [
  Step1Schema,
  Step2Schema,
  Step3Schema,
  Step4Schema,
  Step5Schema,
  Step6Schema,
  Step7Schema,
  Step8Schema,
];

const stepTitles = [
  'Property Type & Basic Info',
  'Location & Details',
  'Property Specifics',
  'Amenities & Features',
  'Photos & Media',
  'Pricing & Availability',
  'House Rules & Policies',
  'Review & Submit',
];

const stepDescriptions = [
  'Tell us about your property type and basic information',
  'Where is your property located?',
  'Share details about rooms, beds, and facilities',
  'What amenities and features does your property offer?',
  'Upload photos to showcase your property',
  'Set your pricing and availability preferences',
  'Define your house rules and cancellation policy',
  'Review everything and submit your property',
];

export default function PropertySubmissionWizard() {
  const { showSuccess, showError, showWarning, showInfo, showToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [allFormData, setAllFormData] = useState<WizardFormData>({});

  // Initialize form with current step schema
  const methods = useForm({
    resolver: zodResolver(stepSchemas[currentStep - 1]),
    mode: 'onBlur',
    defaultValues: allFormData[`step${currentStep}` as keyof WizardFormData] || {},
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = methods;

  // Load draft from localStorage on mount
  useEffect(() => {
    const loadDraft = () => {
      try {
        const savedDraft = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedDraft) {
          const parsed = JSON.parse(savedDraft);
          setAllFormData(parsed.formData || {});
          setCompletedSteps(parsed.completedSteps || []);
          setLastSavedAt(parsed.savedAt ? new Date(parsed.savedAt) : null);

          // Ask user if they want to restore
          const shouldRestore = window.confirm(
            'We found a saved draft. Would you like to continue from where you left off?'
          );

          if (shouldRestore && parsed.currentStep) {
            setCurrentStep(parsed.currentStep);
          } else {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          }
        }
      } catch (error) {
        logger.error('Failed to load draft:', error as Error, { component: 'Page' });
      }
    };

    loadDraft();
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const autoSave = () => {
      try {
        const draftData = {
          formData: allFormData,
          currentStep,
          completedSteps,
          savedAt: new Date().toISOString(),
        };

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(draftData));
        setLastSavedAt(new Date());
      } catch (error) {
        logger.error('Failed to auto-save:', error as Error, { component: 'Page' });
      }
    };

    const interval = setInterval(autoSave, AUTO_SAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [allFormData, currentStep, completedSteps]);

  // Reset form when step changes
  useEffect(() => {
    const stepData = allFormData[`step${currentStep}` as keyof WizardFormData];
    reset(stepData || {});
  }, [currentStep, reset, allFormData]);

  // Manual save draft
  const handleSaveDraft = useCallback(() => {
    try {
      const draftData = {
        formData: allFormData,
        currentStep,
        completedSteps,
        savedAt: new Date().toISOString(),
      };

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(draftData));
      setLastSavedAt(new Date());
      showToast({ type: 'success', title: 'Draft saved successfully!' });
    } catch (error) {
      logger.error('Failed to save draft:', error as Error, { component: 'Page' });
      showToast({ type: 'error', title: 'Failed to save draft. Please try again.' });
    }
  }, [allFormData, currentStep, completedSteps]);

  // Handle step navigation
  const handleNext = async (data: any) => {
    // Save current step data
    const stepKey = `step${currentStep}` as keyof WizardFormData;
    const updatedFormData = {
      ...allFormData,
      [stepKey]: data,
    };
    setAllFormData(updatedFormData);

    // Mark step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }

    // Move to next step or submit
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: to-cyan-700, behavior: 'smooth' });
    } else {
      // Final submission
      await handleFinalSubmit(updatedFormData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: to-cyan-700, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = async (formData: WizardFormData) => {
    setIsSubmitting(true);

    try {
      // Submit to API
      const response = await fetch('/api/properties/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit property');
      }

      const result = await response.json();

      // Clear draft
      localStorage.removeItem(LOCAL_STORAGE_KEY);

      // Show success modal
      setShowSuccessModal(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        window.location.href = '/dashboard/properties';
      }, 3);
    } catch (error) {
      logger.error('Submission error:', error as Error, { component: 'Page' });
      showToast({ type: 'error', title: 'Failed to submit property. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate progress percentage
  const progressPercentage = (completedSteps.length / TOTAL_STEPS) * 1;

  // Render current step component
  const renderStepComponent = () => {
    const stepProps = {
      data: allFormData[`step${currentStep}` as keyof WizardFormData],
      allData: allFormData,
    };

    switch (currentStep) {
      case 1:
        return <Step1PropertyType {...stepProps} />;
      case 2:
        return <Step2Location {...stepProps} />;
      case 3:
        return <Step3PropertyDetails {...stepProps} />;
      case 4:
        return <Step4Amenities {...stepProps} />;
      case 5:
        return <Step5Photos {...stepProps} />;
      case 6:
        return <Step6Pricing {...stepProps} />;
      case 7:
        return <Step7HouseRules {...stepProps} />;
      case 8:
        return <Step8Review {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-500 via-blue-500 to-indigo-500">
      <FormProvider {...methods}>
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-9 mb-2">
              List Your Property
            </h1>
            <p className="text-slate-6">
              Complete the form below to list your property on our platform
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-slate-7">
                Step {currentStep} of {TOTAL_STEPS}
              </span>
              <span className="text-sm text-slate-6">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-6"
                initial={{ width: to-cyan-700 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex gap-2 min-w-max pb-2">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((step) => (
                <div
                  key={step}
                  className={`flex-1 min-w-[1200px] p-3 rounded-lg border-2 transition-all ${
                    step === currentStep
                      ? 'border-blue-500 bg-blue-500'
                      : completedSteps.includes(step)
                      ? 'border-green-500 bg-green-500'
                      : 'border-slate-200 bg-lydian-bg'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {completedSteps.includes(step) ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
                          step === currentStep
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-200 text-slate-6'
                        }`}
                      >
                        {step}
                      </div>
                    )}
                    <span
                      className={`text-xs font-medium ${
                        step === currentStep ? 'text-lydian-primary-hover' : 'text-slate-6'
                      }`}
                    >
                      Step {step}
                    </span>
                  </div>
                  <p
                    className={`text-xs leading-tight ${
                      step === currentStep ? 'text-lydian-primary' : 'text-slate-500'
                    }`}
                  >
                    {stepTitles[step - 1]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-save indicator */}
          {lastSavedAt && (
            <div className="mb-4 flex items-center gap-2 text-sm text-slate-6">
              <Save className="w-4 h-4" />
              <span>Last saved: {lastSavedAt.toLocaleTimeString()}</span>
            </div>
          )}

          {/* Step Content */}
          <form onSubmit={handleSubmit(handleNext)}>
            <div className="bg-white/5 rounded-xl shadow-lg p-8 mb-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-9 mb-2">
                  {stepTitles[currentStep - 1]}
                </h2>
                <p className="text-slate-6">{stepDescriptions[currentStep - 1]}</p>
              </div>

              {/* Step Component */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: to-cyan-700 }}
                  exit={{ opacity: 0, x: -200 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepComponent()}
                </motion.div>
              </AnimatePresence>

              {/* Error Summary */}
              {Object.keys(errors).length > to-cyan-700 && (
                <div className="mt-6 p-4 bg-red-500 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-lydian-error mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-9 mb-1">
                        Please fix the following errors:
                      </h4>
                      <ul className="text-sm text-lydian-primary-hover space-y-1">
                        {Object.entries(errors).map(([field, error]) => (
                          <li key={field}>
                            {field}: {error?.message?.toString()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="px-6 py-3 bg-white/5 border-2 border-slate-3 rounded-lg font-semibold text-slate-7 hover:bg-slate-500 disabled:opacity-500 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-6 py-3 bg-white/5 border-2 border-slate-3 rounded-lg font-semibold text-slate-7 hover:bg-slate-500 transition-all flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Draft
                </button>
              </div>

              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-blue-6 to-indigo-6 text-white rounded-lg font-semibold hover:from-blue-7 hover:to-indigo-7 disabled:opacity-500 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : currentStep === TOTAL_STEPS ? (
                  <>
                    Submit Property
                    <CheckCircle2 className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Next Step
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </FormProvider>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-to-cyan-700 bg-black/500 flex items-center justify-center z-500 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/5 rounded-2xl p-8 max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: to-cyan-700 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-200 h-200 bg-green-600-light rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </motion.div>

              <h3 className="text-2xl font-bold text-slate-9 mb-3">
                Property Submitted Successfully!
              </h3>
              <p className="text-slate-6 mb-6">
                Your property has been submitted for review. We'll notify you once it's
                approved and live on the platform.
              </p>

              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Redirecting to dashboard...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

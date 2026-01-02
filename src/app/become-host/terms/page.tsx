// Host Terms & Rules Page
// Comprehensive host agreement page with rules from Airbnb, Booking.com, and Agoda
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield,
  CheckCircle2,
  AlertCircle,
  FileText,
  Home,
  DollarSign,
  Users,
  Calendar,
  Lock,
  Scale,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function HostTermsPage() {
  const router = useRouter();
  const [acceptedTerms, setAcceptedTerms] = useState<Record<string, boolean>>({
    hostAgreement: false,
    communityStandards: false,
    paymentTerms: false,
    liabilityWaiver: false,
    dataPrivacy: false,
  });

  const [showError, setShowError] = useState(false);

  const allTermsAccepted = Object.values(acceptedTerms).every(value => value === true);

  const handleSubmit = () => {
    if (!allTermsAccepted) {
      setShowError(true);
      return;
    }

    // Store acceptance in localStorage
    localStorage.setItem('hostTermsAccepted', JSON.stringify({
      acceptedAt: new Date().toISOString(),
      terms: acceptedTerms,
    }));

    // Navigate to property submission
    router.push('/owner/properties/new');
  };

  const termsCategories = [
    {
      id: 'hostAgreement',
      title: 'Host Service Agreement',
      icon: FileText,
      color: 'text-lydian-primary',
      bgColor: 'bg-blue-500',
      description: 'Terms governing your use of our hosting platform',
      sections: [
        {
          title: 'Hosting Responsibilities',
          items: [
            'Provide accurate and complete property information',
            'Maintain property to advertised standards',
            'Respond to guest inquiries within 24 hours',
            'Honor confirmed reservations or pay cancellation penalties',
            'Provide clean, safe, and secure accommodations',
            'Comply with all local laws and regulations',
          ],
        },
        {
          title: 'Platform Usage',
          items: [
            'Use the platform only for legitimate hosting activities',
            'Do not discriminate against guests based on protected characteristics',
            'Keep your calendar updated and accurate',
            'Do not request or accept payments outside the platform',
            'Report any safety concerns or incidents immediately',
          ],
        },
      ],
    },
    {
      id: 'communityStandards',
      title: 'Community Standards & Safety',
      icon: Shield,
      color: 'text-green-500',
      bgColor: 'bg-green-500',
      description: 'Our commitment to a safe and respectful community',
      sections: [
        {
          title: 'Safety Requirements',
          items: [
            'Install working smoke detectors and carbon monoxide detectors',
            'Provide fire extinguishers and first aid kits',
            'Ensure all electrical and gas systems are properly maintained',
            'Disclose any potential hazards (pools, stairs, pets, etc.)',
            'Comply with local safety regulations and building codes',
            'Maintain property insurance coverage',
          ],
        },
        {
          title: 'Guest Treatment',
          items: [
            'Treat all guests with respect and dignity',
            'Do not discriminate based on race, religion, nationality, gender, age, or disability',
            'Protect guest privacy and personal information',
            'Resolve disputes professionally and promptly',
            'Do not retaliate against guests for negative reviews',
          ],
        },
      ],
    },
    {
      id: 'paymentTerms',
      title: 'Payment & Financial Terms',
      icon: DollarSign,
      color: 'text-purple-6',
      bgColor: 'bg-purple-500',
      description: 'How payments work and our fee structure',
      sections: [
        {
          title: 'Host Payouts',
          items: [
            'Payouts are processed 24 hours after guest check-in',
            'Service fees range from 3% to 15% depending on your subscription',
            'You are responsible for all applicable taxes',
            'Withholding may apply for damages, cleaning issues, or violations',
            'Currency conversion fees may apply for international bookings',
            'Minimum payout threshold is $500',
          ],
        },
        {
          title: 'Pricing & Availability',
          items: [
            'You set your own prices subject to market rate recommendations',
            'Prices must include all mandatory fees and charges',
            'Cleaning fees and security deposits must be clearly disclosed',
            'You cannot change prices after a booking is confirmed',
            'Calendar updates must be made immediately when availability changes',
          ],
        },
      ],
    },
    {
      id: 'liabilityWaiver',
      title: 'Liability & Insurance',
      icon: Scale,
      color: 'text-orange-6',
      bgColor: 'bg-orange-500',
      description: 'Understanding your responsibilities and protections',
      sections: [
        {
          title: 'Host Liability',
          items: [
            'You are responsible for the condition and safety of your property',
            'You assume liability for guest injuries due to property conditions',
            'You must carry adequate property and liability insurance',
            'Platform is not liable for property damage or guest injuries',
            'You indemnify the platform against third-party claims',
            'Host guarantee programs have specific terms and exclusions',
          ],
        },
        {
          title: 'Dispute Resolution',
          items: [
            'Disputes must first be resolved through our resolution center',
            'Arbitration is required for unresolved disputes',
            'You waive the right to join class-action lawsuits',
            'Disputes must be filed within 1 year of occurrence',
            'Governing law is based on platform jurisdiction',
          ],
        },
      ],
    },
    {
      id: 'dataPrivacy',
      title: 'Data Privacy & Compliance',
      icon: Lock,
      color: 'text-lydian-error',
      bgColor: 'bg-red-500',
      description: 'How we handle data and your privacy obligations',
      sections: [
        {
          title: 'Data Collection & Usage',
          items: [
            'We collect host and guest data to facilitate bookings',
            'You consent to data processing for platform operations',
            'Guest personal information must not be used for marketing',
            'Communication must remain on the platform until booking confirmation',
            'You must comply with GDPR, CCPA, and other privacy laws',
            'Surveillance devices (cameras, recording) must be disclosed',
          ],
        },
        {
          title: 'Information Security',
          items: [
            'Protect guest login credentials and payment information',
            'Do not share account access with unauthorized persons',
            'Report security breaches or data incidents immediately',
            'Use strong passwords and enable two-factor authentication',
            'Guest reviews and ratings are publicly visible',
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-white to-purple-500">
      {/* Header */}
      <div className="bg-white/5 border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Home className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Become a Host</h1>
              <p className="text-gray-400 mt-1">Review and accept our hosting terms to get started</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
                1
              </div>
              <span className="text-sm font-medium text-blue-500">Review Terms</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-3" />
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-3 text-gray-400 font-semibold">
                2
              </div>
              <span className="text-sm font-medium text-gray-400">Add Property</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-3" />
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-3 text-gray-400 font-semibold">
                3
              </div>
              <span className="text-sm font-medium text-gray-400">Start Hosting</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error Banner */}
        {showError && !allTermsAccepted && (
          <div className="mb-8 p-4 bg-red-500 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-lydian-error flex-shrink-to-cyan-700 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-9">Action Required</h3>
              <p className="text-sm text-lydian-primary-hover mt-1">
                Please accept all terms and conditions before proceeding.
              </p>
            </div>
          </div>
        )}

        {/* Terms Categories */}
        <div className="space-y-6">
          {termsCategories.map((category, idx) => {
            const Icon = category.icon;
            const isAccepted = acceptedTerms[category.id];

            return (
              <div
                key={category.id}
                className={`bg-white/5 rounded-2xl shadow-lg border-2 transition-all ${
                  isAccepted
                    ? 'border-green-500'
                    : showError
                    ? 'border-red-3'
                    : 'border-white/20 hover:border-white/30'
                }`}
              >
                {/* Category Header */}
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 ${category.bgColor} rounded-xl`}>
                        <Icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">{category.title}</h2>
                        <p className="text-sm text-gray-400 mt-1">{category.description}</p>
                      </div>
                    </div>
                    {isAccepted && (
                      <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-to-cyan-700" />
                    )}
                  </div>
                </div>

                {/* Category Content */}
                <div className="p-6 space-y-6">
                  {category.sections.map((section, sectionIdx) => (
                    <div key={sectionIdx}>
                      <h3 className="font-semibold text-white mb-3">{section.title}</h3>
                      <ul className="space-y-2">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3 text-sm text-gray-200">
                            <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-to-cyan-700 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Acceptance Checkbox */}
                <div className="p-6 bg-white/5 border-t border-white/20 rounded-b-2xl">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <Checkbox
                      checked={isAccepted}
                      onCheckedChange={(checked) => {
                        setAcceptedTerms(prev => ({
                          ...prev,
                          [category.id]: checked === true,
                        }));
                        setShowError(false);
                      }}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-white group-hover:text-blue-500">
                        I have read and agree to the {category.title}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        By checking this box, you acknowledge that you have read, understood, and agree to be bound by these terms.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl border border-blue-200">
          <div className="flex items-start gap-3">
            <Star className="h-6 w-6 text-blue-500 flex-shrink-to-cyan-700" />
            <div>
              <h3 className="font-semibold text-white mb-2">Why These Terms Matter</h3>
              <p className="text-sm text-gray-200 mb-4">
                Our hosting terms are designed to create a safe, fair, and trustworthy platform for both hosts and guests.
                They are based on industry best practices from platforms like Airbnb, Booking.com, and Agoda, and ensure:
              </p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-to-cyan-700 mt-0.5" />
                  <span>Clear expectations for both hosts and guests</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-to-cyan-700 mt-0.5" />
                  <span>Protection of your rights and property</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-to-cyan-700 mt-0.5" />
                  <span>Fair dispute resolution processes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-to-cyan-700 mt-0.5" />
                  <span>Compliance with legal and regulatory requirements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-between gap-4 p-6 bg-white/5 rounded-2xl shadow-lg border border-white/20">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
              allTermsAccepted ? 'bg-green-1' : 'bg-lydian-bg/1'
            }`}>
              {allTermsAccepted ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : (
                <AlertCircle className="h-6 w-6 text-gray-300" />
              )}
            </div>
            <div>
              <p className="font-semibold text-white">
                {allTermsAccepted ? 'All Terms Accepted' : 'Acceptance Required'}
              </p>
              <p className="text-sm text-gray-400">
                {allTermsAccepted
                  ? 'You can now proceed to add your property'
                  : `${Object.values(acceptedTerms).filter(Boolean).length} of ${Object.keys(acceptedTerms).length} accepted`
                }
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!allTermsAccepted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-lydian-primary-hover text-white px-8"
            >
              Accept & Continue
            </Button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-300 mt-6">
          These terms were last updated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </div>
  );
}

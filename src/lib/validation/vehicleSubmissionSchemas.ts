/**
 * Vehicle Submission Validation Schemas
 * Zod schemas for all 8 steps of vehicle submission wizard
 */

import { z } from 'zod';

// Step 1: Vehicle Type
export const step1Schema = z.object({
  vehicleType: z.enum([
    'economy-sedan',
    'comfort-sedan',
    'premium-sedan',
    'luxury-sedan',
    'economy-suv',
    'premium-suv',
    'minivan',
    'passenger-van',
    'commercial-van',
    'pickup-truck',
    'convertible',
    'sports-car',
    'electric-vehicle',
    'hybrid',
  ]),
});

// Step 2: Vehicle Details
export const step2Schema = z.object({
  brand: z.string().min(2, 'Marka gerekli'),
  model: z.string().min(2, 'Model gerekli'),
  year: z.number().min(1990).max(new Date().getFullYear() + 1),
  licensePlate: z.string().regex(/^[0-9]{2}[A-Z]{1,3}[0-9]{1,4}$/, 'Geçerli plaka formatı giriniz'),
  color: z.string().min(2),
  transmission: z.enum(['manual', 'automatic', 'semi-automatic']),
  fuelType: z.enum(['gasoline', 'diesel', 'electric', 'hybrid', 'lpg']),
  engineSize: z.number().min(0.5).max(10),
  mileage: z.number().min(0),
  seats: z.number().min(2).max(50),
  doors: z.number().min(2).max(5),
  description: z.string().min(50, 'En az 50 karakter açıklama gerekli'),
});

// Step 3: Features
export const step3Schema = z.object({
  features: z.object({
    basic: z.array(z.string()).optional(),
    comfort: z.array(z.string()).optional(),
    technology: z.array(z.string()).optional(),
    safety: z.array(z.string()).optional(),
    entertainment: z.array(z.string()).optional(),
  }),
  customFeatures: z.array(z.string()).optional(),
});

// Step 4: Photos
export const step4Schema = z.object({
  photos: z.object({
    exterior: z.array(z.string()).min(3, 'En az 3 dış görüntü gerekli'),
    interior: z.array(z.string()).min(2, 'En az 2 iç görüntü gerekli'),
    engine: z.array(z.string()).optional(),
    trunk: z.array(z.string()).optional(),
    dashboard: z.array(z.string()).optional(),
    wheels: z.array(z.string()).optional(),
    seats: z.array(z.string()).optional(),
    technology: z.array(z.string()).optional(),
    damage: z.array(z.string()).optional(),
    extras: z.array(z.string()).optional(),
  }),
  mainPhoto: z.string().min(1, 'Ana fotoğraf seçiniz'),
});

// Step 5: Pricing
export const step5Schema = z.object({
  dailyRate: z.number().min(100, 'Günlük ücret en az 100₺ olmalı'),
  weeklyDiscount: z.number().min(0).max(50).optional(),
  monthlyDiscount: z.number().min(0).max(50).optional(),
  minRentalDays: z.number().min(1).max(30),
  maxRentalDays: z.number().min(1).max(365),
  kmLimit: z.object({
    daily: z.number().min(0),
    extraKmPrice: z.number().min(0),
  }),
  deposit: z.number().min(0),
  allowedPaymentMethods: z.array(z.enum(['credit-card', 'debit-card', 'cash', 'bank-transfer'])),
});

// Step 6: Availability
export const step6Schema = z.object({
  availableFrom: z.string().min(1, 'Başlangıç tarihi seçiniz'),
  availableTo: z.string().optional(),
  blockedDates: z.array(z.object({
    from: z.string(),
    to: z.string(),
    reason: z.string().optional(),
  })).optional(),
  pickupLocations: z.array(z.object({
    type: z.enum(['airport', 'office', 'hotel', 'address']),
    name: z.string(),
    address: z.string(),
    city: z.string(),
    district: z.string().optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
    extraCharge: z.number().min(0).optional(),
  })).min(1, 'En az 1 teslim yeri ekleyiniz'),
  returnLocations: z.array(z.object({
    type: z.enum(['airport', 'office', 'hotel', 'address']),
    name: z.string(),
    address: z.string(),
    city: z.string(),
    district: z.string().optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
    extraCharge: z.number().min(0).optional(),
  })).min(1, 'En az 1 iade yeri ekleyiniz'),
});

// Step 7: Insurance & Documents
export const step7Schema = z.object({
  insurance: z.object({
    trafficInsurance: z.object({
      policyNumber: z.string().min(5),
      company: z.string(),
      expiryDate: z.string(),
      document: z.string().min(1, 'Trafik sigortası belgesi gerekli'),
    }),
    comprehensiveInsurance: z.object({
      policyNumber: z.string().min(5),
      company: z.string(),
      expiryDate: z.string(),
      document: z.string().min(1, 'Kasko belgesi gerekli'),
    }).optional(),
  }),
  documents: z.object({
    registrationDocument: z.string().min(1, 'Ruhsat belgesi gerekli'),
    inspectionReport: z.string().optional(),
    ownershipProof: z.string().min(1, 'Mülkiyet belgesi gerekli'),
  }),
  driverRequirements: z.object({
    minAge: z.number().min(18).max(70),
    minLicenseYears: z.number().min(0).max(20),
    internationalLicense: z.boolean(),
  }),
});

// Step 8: Review & Submit
export const step8Schema = z.object({
  terms: z.object({
    acceptTerms: z.boolean().refine((val) => val === true, 'Kullanım şartlarını kabul etmelisiniz'),
    acceptCommission: z.boolean().refine((val) => val === true, 'Komisyon şartlarını kabul etmelisiniz'),
    acceptCancellation: z.boolean().refine((val) => val === true, 'İptal politikasını kabul etmelisiniz'),
  }),
  publishImmediately: z.boolean().optional(),
});

// Complete form schema
export const completeVehicleSubmissionSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema)
  .merge(step7Schema)
  .merge(step8Schema);

export type VehicleSubmissionFormData = z.infer<typeof completeVehicleSubmissionSchema>;

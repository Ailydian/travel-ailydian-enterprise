import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../lib/prisma';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  preferredLanguage?: string;
  preferredCurrency?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      name,
      email,
      password,
      phone,
      dateOfBirth,
      gender,
      preferredLanguage = 'tr',
      preferredCurrency = 'TRY'
    }: RegisterRequest = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Ad, email ve şifre gerekli alanlarıdır'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: 'Şifre en az 8 karakter olmalıdır'
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Bu email adresi ile zaten bir hesap bulunmaktadır'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender,
        preferredLanguage,
        preferredCurrency,
        membershipType: 'BASIC',
        loyaltyPoints: 100, // Welcome bonus
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        membershipType: true,
        loyaltyPoints: true,
        createdAt: true,
      }
    });

    // Create AI preferences with default values
    await prisma.aIPreference.create({
      data: {
        userId: user.id,
        travelStyle: [],
        interests: [],
        preferredDestinations: [],
        dietaryRestrictions: [],
        accessibilityNeeds: [],
      }
    });

    res.status(201).json({
      message: 'Hesabınız başarıyla oluşturuldu!',
      user
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'Hesap oluşturulurken bir hata oluştu'
    });
  }
}
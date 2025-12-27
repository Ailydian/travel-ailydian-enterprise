import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../lib/prisma';
import logger from '../../../lib/logger';

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

    logger.info('User registration attempt', { email, name });

    // Validation
    if (!name || !email || !password) {
      logger.error('Registration validation failed - missing required fields', new Error('Missing fields'));
      return res.status(400).json({
        message: 'Ad, email ve şifre gerekli alanlarıdır'
      });
    }

    if (password.length < 8) {
      logger.error('Registration validation failed - password too short', new Error('Password too short'));
      return res.status(400).json({
        message: 'Şifre en az 8 karakter olmalıdır'
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      logger.error('Registration failed - user already exists', new Error('User exists'), { email });
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

    logger.info('User registered successfully', { userId: user.id, email: user.email });

    res.status(201).json({
      message: 'Hesabınız başarıyla oluşturuldu!',
      user
    });

  } catch (error) {
    logger.error('Registration error', error);
    res.status(500).json({
      message: 'Hesap oluşturulurken bir hata oluştu'
    });
  }
}
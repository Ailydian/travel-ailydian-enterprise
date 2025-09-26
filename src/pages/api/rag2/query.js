// AI-powered query endpoint for travel recommendations
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { query, context, language = 'tr' } = req.body

    if (!query) {
      return res.status(400).json({ error: 'Query is required' })
    }

    // Mock AI response for travel queries
    const mockResponse = {
      success: true,
      data: {
        query: query,
        response: language === 'tr' 
          ? `${query} için öneriler: İstanbul'da harika oteller, Kapadokya'da balon turları ve Antalya'da güzel plajlar var. Size özel paketler hazırlayabilirim.`
          : `Recommendations for ${query}: Great hotels in Istanbul, balloon tours in Cappadocia, and beautiful beaches in Antalya. I can prepare special packages for you.`,
        suggestions: language === 'tr' ? [
          'İstanbul\'da en iyi oteller',
          'Kapadokya balon turları',
          'Antalya plaj otelleri',
          'Bodrum tatil paketleri'
        ] : [
          'Best hotels in Istanbul',
          'Cappadocia balloon tours',
          'Antalya beach hotels',
          'Bodrum vacation packages'
        ],
        confidence: 0.95,
        language: language
      }
    }

    res.status(200).json(mockResponse)

  } catch (error) {
    console.error('RAG2 Query Error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'AI service temporarily unavailable'
    })
  }
}
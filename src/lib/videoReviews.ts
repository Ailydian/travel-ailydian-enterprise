// Video Reviews & 360° Virtual Tours System
// Advanced visualization for properties and vehicles

export interface VideoReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  listingId: string;
  listingType: 'hotel' | 'car' | 'tour' | 'vehicle' | 'property';
  videoUrl: string;
  thumbnailUrl: string;
  duration: number; // seconds
  title: string;
  description?: string;
  rating: number; // 1-5
  tags: string[];
  views: number;
  likes: number;
  createdAt: Date;
  verifiedBooking: boolean;
  language: 'tr' | 'en';
}

export interface VirtualTour {
  id: string;
  listingId: string;
  listingType: 'hotel' | 'property' | 'vehicle';
  title: string;
  description: string;
  scenes: VirtualTourScene[];
  coverImage: string;
  views: number;
  featured: boolean;
  createdAt: Date;
}

export interface VirtualTourScene {
  id: string;
  title: string;
  panoramaUrl: string; // 360° image URL
  type: 'equirectangular' | 'cubemap';
  hotspots: VirtualTourHotspot[];
  initialView: {
    pitch: number; // -90 to 90
    yaw: number; // -180 to 180
    fov: number; // 30 to 120
  };
}

export interface VirtualTourHotspot {
  id: string;
  type: 'info' | 'link' | 'video' | 'image';
  position: {
    pitch: number;
    yaw: number;
  };
  title: string;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  linkToScene?: string;
  icon?: string;
}

/**
 * Upload video review
 */
export async function uploadVideoReview(
  videoFile: File,
  metadata: Omit<VideoReview, 'id' | 'videoUrl' | 'thumbnailUrl' | 'views' | 'likes' | 'createdAt'>
): Promise<{ success: boolean; review?: VideoReview; error?: string }> {
  try {
    // In production, upload to cloud storage (AWS S3, Cloudinary, etc.)
    // For now, simulate upload

    if (videoFile.size > 100 * 1024 * 1024) { // 100MB limit
      return { success: false, error: 'Video file too large (max 100MB)' };
    }

    if (!videoFile.type.startsWith('video/')) {
      return { success: false, error: 'Invalid file type. Must be a video file.' };
    }

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate mock URLs (in production, these would be actual cloud URLs)
    const videoUrl = `https://cdn.ailydian.com/videos/${Date.now()}-${videoFile.name}`;
    const thumbnailUrl = `https://cdn.ailydian.com/thumbnails/${Date.now()}-thumbnail.jpg`;

    const review: VideoReview = {
      ...metadata,
      id: `VID-${Date.now()}`,
      videoUrl,
      thumbnailUrl,
      views: 0,
      likes: 0,
      createdAt: new Date()
    };

    // In production, save to database
    // await prisma.videoReview.create({ data: review });

    return { success: true, review };
  } catch (error) {
    console.error('Video upload error:', error);
    return { success: false, error: 'Upload failed' };
  }
}

/**
 * Generate video thumbnail from video file
 */
export function generateVideoThumbnail(videoFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      video.currentTime = Math.min(video.duration / 2, 5); // Capture at 5 seconds or halfway
    };

    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        } else {
          reject(new Error('Could not create thumbnail'));
        }
      }, 'image/jpeg', 0.8);
    };

    video.onerror = () => reject(new Error('Error loading video'));
    video.src = URL.createObjectURL(videoFile);
  });
}

/**
 * Get video reviews for a listing
 */
export async function getVideoReviews(
  listingId: string,
  options?: {
    limit?: number;
    sortBy?: 'recent' | 'popular' | 'rating';
    language?: 'tr' | 'en';
  }
): Promise<VideoReview[]> {
  // In production, fetch from database
  // const reviews = await prisma.videoReview.findMany({ where: { listingId }, ...options });

  // Mock data
  const mockReviews: VideoReview[] = [
    {
      id: 'VID-001',
      userId: 'USER-001',
      userName: 'Ayşe Yılmaz',
      listingId,
      listingType: 'hotel',
      videoUrl: 'https://cdn.ailydian.com/videos/sample-hotel-review.mp4',
      thumbnailUrl: 'https://cdn.ailydian.com/thumbnails/hotel-thumb.jpg',
      duration: 120,
      title: 'Harika bir deneyimdi!',
      description: 'Otel çok temizdi, personel çok ilgiliydi. Kesinlikle tavsiye ederim.',
      rating: 5,
      tags: ['temizlik', 'hizmet', 'konum'],
      views: 1250,
      likes: 89,
      createdAt: new Date('2024-12-15'),
      verifiedBooking: true,
      language: 'tr'
    }
  ];

  return mockReviews;
}

/**
 * Create 360° virtual tour
 */
export async function createVirtualTour(
  tour: Omit<VirtualTour, 'id' | 'views' | 'createdAt'>
): Promise<{ success: boolean; tour?: VirtualTour; error?: string }> {
  try {
    const virtualTour: VirtualTour = {
      ...tour,
      id: `TOUR-${Date.now()}`,
      views: 0,
      createdAt: new Date()
    };

    // In production, save to database
    // await prisma.virtualTour.create({ data: virtualTour });

    return { success: true, tour: virtualTour };
  } catch (error) {
    console.error('Virtual tour creation error:', error);
    return { success: false, error: 'Tour creation failed' };
  }
}

/**
 * Process 360° image upload
 */
export async function upload360Image(
  imageFile: File
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    if (!imageFile.type.startsWith('image/')) {
      return { success: false, error: 'Invalid file type' };
    }

    // Validate 360° image (should be 2:1 aspect ratio for equirectangular)
    const img = await loadImage(imageFile);
    const aspectRatio = img.width / img.height;

    if (Math.abs(aspectRatio - 2) > 0.1) {
      return {
        success: false,
        error: 'Invalid 360° image. Should have 2:1 aspect ratio (equirectangular format)'
      };
    }

    // In production, upload to cloud storage
    const url = `https://cdn.ailydian.com/360/${Date.now()}-${imageFile.name}`;

    return { success: true, url };
  } catch (error) {
    console.error('360° image upload error:', error);
    return { success: false, error: 'Upload failed' };
  }
}

/**
 * Helper: Load image from file
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Get virtual tour by ID
 */
export async function getVirtualTour(tourId: string): Promise<VirtualTour | null> {
  // In production, fetch from database
  // return await prisma.virtualTour.findUnique({ where: { id: tourId } });

  // Mock data
  const mockTour: VirtualTour = {
    id: tourId,
    listingId: 'HOTEL-001',
    listingType: 'hotel',
    title: 'Grand Hilton Istanbul - 360° Sanal Tur',
    description: 'Otelimizin tüm alanlarını 360° panoramik görüntülerle keşfedin',
    coverImage: 'https://cdn.ailydian.com/360/hotel-cover.jpg',
    views: 5420,
    featured: true,
    createdAt: new Date('2024-12-01'),
    scenes: [
      {
        id: 'SCENE-001',
        title: 'Lobby',
        panoramaUrl: 'https://cdn.ailydian.com/360/lobby.jpg',
        type: 'equirectangular',
        initialView: { pitch: 0, yaw: 0, fov: 90 },
        hotspots: [
          {
            id: 'HOT-001',
            type: 'link',
            position: { pitch: 0, yaw: 90 },
            title: 'Resepsiyona Git',
            linkToScene: 'SCENE-002',
            icon: 'arrow-right'
          },
          {
            id: 'HOT-002',
            type: 'info',
            position: { pitch: -20, yaw: 0 },
            title: 'Lüks Lobby',
            content: '24/7 resepsiyon hizmeti, ücretsiz Wi-Fi',
            icon: 'info'
          }
        ]
      },
      {
        id: 'SCENE-002',
        title: 'Deluxe Room',
        panoramaUrl: 'https://cdn.ailydian.com/360/deluxe-room.jpg',
        type: 'equirectangular',
        initialView: { pitch: 0, yaw: 180, fov: 90 },
        hotspots: [
          {
            id: 'HOT-003',
            type: 'video',
            position: { pitch: 0, yaw: -90 },
            title: 'Oda Tanıtım Videosu',
            videoUrl: 'https://cdn.ailydian.com/videos/room-tour.mp4',
            icon: 'play'
          }
        ]
      }
    ]
  };

  return mockTour;
}

/**
 * Increment view count
 */
export async function incrementViewCount(
  id: string,
  type: 'video' | 'tour'
): Promise<void> {
  // In production, update database
  // if (type === 'video') {
  //   await prisma.videoReview.update({ where: { id }, data: { views: { increment: 1 } } });
  // } else {
  //   await prisma.virtualTour.update({ where: { id }, data: { views: { increment: 1 } } });
  // }

  console.log(`Incremented ${type} view count for ${id}`);
}

/**
 * Toggle like on video review
 */
export async function toggleVideoLike(
  videoId: string,
  userId: string
): Promise<{ liked: boolean; totalLikes: number }> {
  // In production, check if user already liked
  // const existingLike = await prisma.videoLike.findUnique({ where: { userId_videoId: { userId, videoId } } });

  // if (existingLike) {
  //   await prisma.videoLike.delete({ where: { id: existingLike.id } });
  //   await prisma.videoReview.update({ where: { id: videoId }, data: { likes: { decrement: 1 } } });
  //   return { liked: false, totalLikes: ... };
  // } else {
  //   await prisma.videoLike.create({ data: { userId, videoId } });
  //   await prisma.videoReview.update({ where: { id: videoId }, data: { likes: { increment: 1 } } });
  //   return { liked: true, totalLikes: ... };
  // }

  // Mock response
  return { liked: true, totalLikes: 90 };
}

/**
 * Validate video file
 */
export function validateVideoFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const maxSize = 100 * 1024 * 1024; // 100MB
  const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime'];

  if (file.size > maxSize) {
    return { valid: false, error: 'Video çok büyük (max 100MB)' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Desteklenmeyen video formatı. MP4, WebM veya MOV kullanın.' };
  }

  return { valid: true };
}

/**
 * Get featured virtual tours
 */
export async function getFeaturedVirtualTours(limit: number = 6): Promise<VirtualTour[]> {
  // In production, fetch from database
  // return await prisma.virtualTour.findMany({ where: { featured: true }, take: limit, orderBy: { views: 'desc' } });

  // Mock data
  return [];
}

/**
 * Search video reviews
 */
export async function searchVideoReviews(query: {
  listingType?: string;
  rating?: number;
  language?: string;
  tags?: string[];
  limit?: number;
}): Promise<VideoReview[]> {
  // In production, search in database
  // const reviews = await prisma.videoReview.findMany({ where: { ...query }, take: query.limit });

  return [];
}

/**
 * Export stats
 */
export async function getVideoReviewStats(listingId: string): Promise<{
  totalReviews: number;
  totalViews: number;
  averageRating: number;
  verifiedBookingsPercentage: number;
}> {
  // In production, aggregate from database

  return {
    totalReviews: 24,
    totalViews: 15800,
    averageRating: 4.6,
    verifiedBookingsPercentage: 85
  };
}

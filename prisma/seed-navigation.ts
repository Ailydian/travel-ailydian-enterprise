/**
 * NAVIGATION SEED SCRIPT
 * Populates the database with initial navigation menu items
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding navigation menus...');

  // Clear existing navigation data
  await prisma.navigationMenu.deleteMany({});

  // Header Menu Items - Updated per user request
  const headerMenus = [
    {
      type: 'HEADER',
      title: 'Destinasyonlar',
      slug: 'destinations',
      href: '/destinations',
      icon: 'MapPin',
      description: "Türkiye'nin en güzel yerlerini keşfedin",
      order: 0,
      isActive: true,
      translations: {
        tr: {
          title: 'Destinasyonlar',
          description: "Türkiye'nin en güzel yerlerini keşfedin"
        },
        en: {
          title: 'Destinations',
          description: 'Discover the most beautiful places in Turkey'
        }
      }
    },
    {
      type: 'HEADER',
      title: 'Turlar',
      slug: 'tours',
      href: '/tours',
      icon: 'Compass',
      description: "Marmaris, Bodrum, Çeşme'de macera",
      order: 1,
      isActive: true,
      translations: {
        tr: {
          title: 'Turlar',
          description: "Marmaris, Bodrum, Çeşme'de macera"
        },
        en: {
          title: 'Tours',
          description: 'Adventures in Marmaris, Bodrum, Çeşme'
        }
      }
    },
    {
      type: 'HEADER',
      title: 'Deneyimler',
      slug: 'experiences',
      href: '/experiences',
      icon: 'Star',
      description: 'Benzersiz deneyimler yaşayın',
      order: 2,
      isActive: true,
      translations: {
        tr: {
          title: 'Deneyimler',
          description: 'Benzersiz deneyimler yaşayın'
        },
        en: {
          title: 'Experiences',
          description: 'Live unique experiences'
        }
      }
    },
    {
      type: 'HEADER',
      title: 'Konaklama',
      slug: 'rentals',
      href: '/rentals',
      icon: 'Home',
      description: 'Villa, Daire ve Ev kiralama',
      order: 3,
      isActive: true,
      translations: {
        tr: {
          title: 'Konaklama',
          description: 'Villa, Daire ve Ev kiralama'
        },
        en: {
          title: 'Accommodation',
          description: 'Villa, Apartment and House rentals'
        }
      }
    },
    {
      type: 'HEADER',
      title: 'Araç Kiralama',
      slug: 'car-rentals',
      href: '/car-rentals',
      icon: 'Car',
      description: 'Ekonomik ve lüks araçlar',
      order: 4,
      isActive: true,
      translations: {
        tr: {
          title: 'Araç Kiralama',
          description: 'Ekonomik ve lüks araçlar'
        },
        en: {
          title: 'Car Rental',
          description: 'Economy and luxury vehicles'
        }
      }
    },
    {
      type: 'HEADER',
      title: 'Transfer',
      slug: 'transfers',
      href: '/transfers',
      icon: 'Bus',
      description: 'Havalimanı ve şehir içi transfer',
      order: 5,
      isActive: true,
      translations: {
        tr: {
          title: 'Transfer',
          description: 'Havalimanı ve şehir içi transfer'
        },
        en: {
          title: 'Transfer',
          description: 'Airport and city transfers'
        }
      }
    },
  ];

  // Create header menus
  for (const menu of headerMenus) {
    await prisma.navigationMenu.create({
      data: menu as any,
    });
    console.log(`✅ Created header menu: ${menu.title}`);
  }

  // Create "Turlar" parent for submenu
  const toursParent = await prisma.navigationMenu.findUnique({
    where: { slug: 'tours' }
  });

  if (toursParent) {
    // Tours Submenu Items
    const toursSubmenus = [
      {
        type: 'HEADER',
        title: 'Marmaris Turları',
        slug: 'tours-marmaris',
        href: '/tours?region=Marmaris',
        description: '12 Ada Tekne, Jeep Safari, Dalyan',
        badge: '16 Tur',
        order: 0,
        parentId: toursParent.id,
        isActive: true,
        translations: {
          tr: {
            title: 'Marmaris Turları',
            description: '12 Ada Tekne, Jeep Safari, Dalyan'
          },
          en: {
            title: 'Marmaris Tours',
            description: '12 Island Boat, Jeep Safari, Dalyan'
          }
        }
      },
      {
        type: 'HEADER',
        title: 'Bodrum Turları',
        slug: 'tours-bodrum',
        href: '/tours?region=Bodrum',
        description: 'Tekne Turları, Antik Kentler, Plajlar',
        badge: '14 Tur',
        order: 1,
        parentId: toursParent.id,
        isActive: true,
        translations: {
          tr: {
            title: 'Bodrum Turları',
            description: 'Tekne Turları, Antik Kentler, Plajlar'
          },
          en: {
            title: 'Bodrum Tours',
            description: 'Boat Tours, Ancient Cities, Beaches'
          }
        }
      },
      {
        type: 'HEADER',
        title: 'Çeşme Turları',
        slug: 'tours-cesme',
        href: '/tours?region=Çeşme',
        description: 'Deniz Sporları, Şarap Turları, Alaçatı',
        badge: '16 Tur',
        order: 2,
        parentId: toursParent.id,
        isActive: true,
        translations: {
          tr: {
            title: 'Çeşme Turları',
            description: 'Deniz Sporları, Şarap Turları, Alaçatı'
          },
          en: {
            title: 'Çeşme Tours',
            description: 'Water Sports, Wine Tours, Alaçatı'
          }
        }
      },
      {
        type: 'HEADER',
        title: 'Tüm Turlar',
        slug: 'tours-all',
        href: '/tours',
        description: '45+ kapsamlı tur seçeneği',
        badge: 'Popüler',
        order: 3,
        parentId: toursParent.id,
        isActive: true,
        translations: {
          tr: {
            title: 'Tüm Turlar',
            description: '45+ kapsamlı tur seçeneği'
          },
          en: {
            title: 'All Tours',
            description: '45+ comprehensive tour options'
          }
        }
      },
    ];

    for (const submenu of toursSubmenus) {
      await prisma.navigationMenu.create({
        data: submenu as any,
      });
      console.log(`✅ Created tours submenu: ${submenu.title}`);
    }
  }

  // Footer Menu Items
  const footerMenus = [
    {
      type: 'FOOTER',
      title: 'Hakkımızda',
      slug: 'about',
      href: '/about',
      order: 0,
      isActive: true,
    },
    {
      type: 'FOOTER',
      title: 'İletişim',
      slug: 'contact',
      href: '/contact',
      order: 1,
      isActive: true,
    },
    {
      type: 'FOOTER',
      title: 'Kariyer',
      slug: 'careers',
      href: '/careers',
      order: 2,
      isActive: true,
    },
    {
      type: 'FOOTER',
      title: 'Kullanım Koşulları',
      slug: 'terms',
      href: '/terms',
      order: 3,
      isActive: true,
    },
    {
      type: 'FOOTER',
      title: 'Gizlilik Politikası',
      slug: 'privacy',
      href: '/privacy',
      order: 4,
      isActive: true,
    },
    {
      type: 'FOOTER',
      title: 'SSS',
      slug: 'faq',
      href: '/faq',
      order: 5,
      isActive: true,
    },
  ];

  for (const menu of footerMenus) {
    await prisma.navigationMenu.create({
      data: menu as any,
    });
    console.log(`✅ Created footer menu: ${menu.title}`);
  }

  console.log('✅ Navigation menus seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding navigation:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

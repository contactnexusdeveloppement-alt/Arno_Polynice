import { getFeaturedProducts } from '@/data/products';
import { getHeroSlides, getHomepageHeroImages, getCategoryImages, getVisionImage } from '@/lib/shopify';
import HomeContent from '@/components/HomeContent';

export default async function Home() {
  // Try metaobjects first (simple images), fallback to collection products
  const [featuredProducts, heroSlides, heroImagesLegacy, categoryImages, visionImage] = await Promise.all([
    getFeaturedProducts(),
    getHeroSlides(3).catch(() => []),
    getHomepageHeroImages('en-vedette', 3).catch(() => []),
    getCategoryImages().catch(() => ({})),
    getVisionImage().catch(() => null),
  ]);

  // Use metaobject slides if available, otherwise fallback to collection products
  const heroImages = heroSlides.length > 0 ? heroSlides : heroImagesLegacy;

  return (
    <HomeContent
      featuredProducts={featuredProducts}
      heroImages={heroImages}
      categoryImages={categoryImages}
      visionImage={visionImage}
    />
  );
}

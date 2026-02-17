/**
 * OG Image Optimizer
 *
 * Optimizes the OG image (public/og-image.jpg) to < 100 KB
 * Target: 1200x630px (standard OG size), JPEG quality 85, progressive
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const INPUT_PATH = path.join(__dirname, '../public/og-image.jpg')
const OUTPUT_PATH = path.join(__dirname, '../public/og-image-optimized.jpg')
const BACKUP_PATH = path.join(__dirname, '../public/og-image-original.jpg')

async function optimizeOGImage() {
  console.log('🖼️  Optimizing OG image...\n')

  // Check if input exists
  if (!fs.existsSync(INPUT_PATH)) {
    console.error('❌ Error: og-image.jpg not found at', INPUT_PATH)
    process.exit(1)
  }

  // Get original file size
  const originalStats = fs.statSync(INPUT_PATH)
  const originalSizeKB = Math.round(originalStats.size / 1024)
  console.log(`📊 Original size: ${originalSizeKB} KB`)

  try {
    // Optimize with sharp
    await sharp(INPUT_PATH)
      .resize(1200, 630, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true, // Use mozjpeg for better compression
      })
      .toFile(OUTPUT_PATH)

    // Get optimized file size
    const optimizedStats = fs.statSync(OUTPUT_PATH)
    const optimizedSizeKB = Math.round(optimizedStats.size / 1024)
    const savings = Math.round(((originalSizeKB - optimizedSizeKB) / originalSizeKB) * 100)

    console.log(`✅ Optimized size: ${optimizedSizeKB} KB`)
    console.log(`💾 Savings: ${originalSizeKB - optimizedSizeKB} KB (${savings}%)`)

    // If optimized is < 100 KB, replace original
    if (optimizedSizeKB < 100) {
      // Backup original
      fs.copyFileSync(INPUT_PATH, BACKUP_PATH)
      console.log(`\n📦 Backed up original to: og-image-original.jpg`)

      // Replace with optimized
      fs.copyFileSync(OUTPUT_PATH, INPUT_PATH)
      fs.unlinkSync(OUTPUT_PATH)
      console.log(`✅ Replaced og-image.jpg with optimized version`)
      console.log(`\n🎉 Success! OG image is now ${optimizedSizeKB} KB (< 100 KB target)`)
    } else {
      console.log(`\n⚠️  Warning: Optimized image is still ${optimizedSizeKB} KB (> 100 KB target)`)
      console.log(`Try lowering quality or using WebP format instead.`)
      console.log(`Optimized image saved to: og-image-optimized.jpg`)
    }
  } catch (error) {
    console.error('❌ Error optimizing image:', error)
    process.exit(1)
  }
}

optimizeOGImage()

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dyxairjq5'
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'memory_wall'
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

export async function uploadImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Only JPEG, PNG, WebP and GIF images are allowed')
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Image must be smaller than 10 MB')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)

  const res = await fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error('Image upload failed')
  }

  const data = await res.json()
  return data.secure_url
}

export async function uploadMultipleImages(files: File[]): Promise<string[]> {
  const uploads = files.map(uploadImage)
  return Promise.all(uploads)
}

/**
 * Transform a Cloudinary URL to serve an optimized version.
 * Inserts transformation params before /upload/ in the URL.
 */
export function cloudinaryUrl(url: string, transforms: string): string {
  if (!url || !url.includes('/upload/')) return url
  return url.replace('/upload/', `/upload/${transforms}/`)
}

/** Thumbnail for cards: 400px wide, auto height, auto quality, auto format */
export function thumbnailUrl(url: string): string {
  return cloudinaryUrl(url, 'w_400,c_fill,q_auto,f_auto')
}

/** Medium size for detail views: 800px wide */
export function mediumUrl(url: string): string {
  return cloudinaryUrl(url, 'w_800,c_limit,q_auto,f_auto')
}

/** Full size with quality optimization */
export function fullUrl(url: string): string {
  return cloudinaryUrl(url, 'q_auto,f_auto')
}

/** Blur placeholder: tiny blurred version for progressive loading */
export function blurPlaceholderUrl(url: string): string {
  return cloudinaryUrl(url, 'w_50,e_blur:1000,q_auto,f_auto')
}

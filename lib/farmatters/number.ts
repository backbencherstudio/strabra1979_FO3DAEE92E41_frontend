export function formatZeroPrefix(value: number, length = 2): string {
  return String(value).padStart(length, '0')
}

const MB = 1024 * 1024
const GB = 1024 * 1024 * 1024

/**
 * Determines optimal upload chunk size based on file size.
 * Larger files use larger chunk sizes to reduce overhead,
 * while smaller files use smaller chunks for responsiveness.
 */
export function getChunkSize(fileSizeBytes: number): number {
  if (fileSizeBytes <= 50 * MB) return 5 * MB
  if (fileSizeBytes <= 1 * GB) return 10 * MB
  if (fileSizeBytes <= 10 * GB) return 32 * MB
  if (fileSizeBytes <= 50 * GB) return 128 * MB
  return 256 * MB
}

/**
 * Convert bytes to megabytes.
 */
export function bytesToMB(bytes: number): number {
  return bytes / MB
}

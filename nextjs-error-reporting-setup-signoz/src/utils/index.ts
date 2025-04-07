import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// TODO: Switch to implementation from xander utils once it's released.
export const getPreferredUriScheme = (domain: string) => {
  // checks for localIP adddresses and localhost
  if (
    /^(127\.0\.0\.1|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}|localhost)(:\d+)?$/.test(
      domain
    )
  ) {
    return 'http'
  }
  return 'https'
}

export function deleteCollectionItem<T>(itemToDelete: T, collection: T[]): T[] {
  const index = collection.indexOf(itemToDelete)
  if (index !== -1) {
    collection.splice(index, 1)
  }
  return [...collection]
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function matchesPathName(segments: string[], href: string) {
  if (href.startsWith('#')) {
    return false
  }
  if (href === '/' && segments.length === 0) {
    return true
  }
  return segments?.[0] === href?.split('/')?.[1]
}

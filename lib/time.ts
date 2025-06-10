/**
 * Formats time spent in minutes into a human-readable string.
 * @param minutes - The number of minutes to format
 * @returns A formatted string like "45m" or "1h 5m"
 */
export function formatTimeSpent(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.ceil(minutes % 60);
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
} 
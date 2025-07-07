/**
 * Helper utility to retrieve environment variables
 * @param key The environment variable key
 * @returns The environment variable value or an empty string if not found
 */
export function getSecret(key: string): string {
  // Using import.meta.env for Vite environment variables
  const value = import.meta.env[key];
  
  if (!value && process.env.NODE_ENV === 'production') {
    console.error(`Missing environment variable: ${key}`);
  }
  
  return value || '';
}

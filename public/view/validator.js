/**
 * Validates and formats a URL.
 * - Adds https:// if missing.
 * - Accepts valid domain names (e.g., example.com, www.example.org).
 * - Returns formatted URL if valid, or null if invalid.
 * 
 * @param {string} url - Input URL or domain
 * @returns {string|null} - Valid formatted URL, or null if invalid
 */
export function formatAndValidateUrl(url) {
    if (!url || typeof url !== 'string') return null;

    let trimmed = url.trim();

    // Add https:// if missing
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
        trimmed = `https://${trimmed}`;
    }

    try {
        const parsed = new URL(trimmed);

        // Optional: Check if the hostname looks like a domain (not an IP or localhost)
        const domainPattern = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        if (!domainPattern.test(parsed.hostname)) return null;

        return parsed.href;
    } catch {
        return null;
    }
}
  
import { storage } from "../storage";
import { type InsertIpo } from "@shared/schema";

export class IpoService {
  private static readonly API_BASE_URL = "https://ipopremium.in";

  static async fetchAndSyncIpos(): Promise<void> {
    try {
      // Fetch with extended parameters to get more data
      const response = await fetch(
        `${this.API_BASE_URL}/ipo?draw=1&columns%5B0%5D%5Bdata%5D=name&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=premium&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=false&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=1000&search%5Bvalue%5D=&search%5Bregex%5D=false`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Referer': 'https://ipopremium.in/',
            'X-Requested-With': 'XMLHttpRequest'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch IPO data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('Invalid API response structure');
      }

      console.log(`Fetched ${data.data.length} IPOs from external API`);

      // Clear existing IPOs and sync with fresh data
      for (const item of data.data) {
        await this.parseAndStoreIpo(item);
      }

    } catch (error) {
      console.error('Error fetching IPO data:', error);
      throw error;
    }
  }

  private static async parseAndStoreIpo(item: any): Promise<void> {
    try {
      // Extract company name from HTML link
      let companyName = 'Unknown Company';
      if (item.name) {
        const htmlContent = item.name.toString();
        
        // Extract text content from HTML anchor tag
        // Pattern: <a ...>Company Name (EXCHANGE)</a>
        const linkMatch = htmlContent.match(/<a[^>]*>([^<]+)<\/a>/);
        if (linkMatch) {
          companyName = linkMatch[1].trim();
        } else {
          // Fallback: try extracting text between > and <
          const nameMatch = htmlContent.match(/>([^<]+)</);
          if (nameMatch) {
            companyName = nameMatch[1].trim();
          } else {
            // If no HTML tags, use content directly
            companyName = htmlContent.trim();
          }
        }
        
        // Clean up HTML entities and normalize whitespace
        companyName = companyName
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/\s+/g, ' ') // Normalize multiple spaces
          .trim();
      }

      // Parse premium information - handle different formats
      const premiumText = (item.premium || '').toString().trim();
      let premiumValue = null;
      let premiumPercentage = null;

      if (premiumText && premiumText !== "0" && !premiumText.includes("N/A") && premiumText !== "0  ") {
        // Try to match "35 (14.3%)" format
        const premiumMatch = premiumText.match(/(\d+)\s*\(([0-9.]+)%\)/);
        if (premiumMatch) {
          premiumValue = premiumMatch[1];
          premiumPercentage = parseFloat(premiumMatch[2]);
        } else {
          // Try to match just number format
          const numberMatch = premiumText.match(/(\d+)/);
          if (numberMatch) {
            premiumValue = numberMatch[1];
          }
        }
      }

      const ipoData: InsertIpo = {
        name: companyName,
        scriptCode: item.script_code || item.scriptCode || '',
        iconUrl: item.icon_url || item.iconUrl || null,
        minPrice: item.min_price ? item.min_price.toString() : null,
        maxPrice: item.max_price ? item.max_price.toString() : null,
        lotSize: item.lot_size || item.lotSize || null,
        premium: premiumValue,
        premiumPercentage: premiumPercentage ? premiumPercentage.toString() : null,
        openDate: item.open || item.openDate || '',
        closeDate: item.close || item.closeDate || '',
        allotmentDate: item.allotment_date || item.allotmentDate || null,
        listingDate: item.listing_date || item.listingDate || null,
        allotmentLink: item.allotment_link || item.allotmentLink || null,
        currentStatus: item.current_status || item.currentStatus || 'unknown',
        exchange: this.extractExchange(companyName),
        premiumLastUpdated: item.premium_last_updated_at ? new Date(item.premium_last_updated_at) : null,
        listingPrice: item.listing_price ? item.listing_price.toString() : null,
        isBuyer: item.is_buyer || item.isBuyer || false,
        isSeller: item.is_seller || item.isSeller || false,
        isPreApply: item.is_pre_apply || item.isPreApply || false,
      };

      await storage.createIpo(ipoData);
    } catch (error) {
      console.error('Error parsing IPO item:', error, item);
    }
  }

  private static extractExchange(name: string): string {
    if (name.includes('MAINBOARD')) return 'MAINBOARD';
    if (name.includes('BSE SME')) return 'BSE SME';
    if (name.includes('NSE SME')) return 'NSE SME';
    return 'MAINBOARD'; // default
  }

  static async getIpoStats() {
    const allIpos = await storage.getAllIpos();
    const openIpos = allIpos.filter(ipo => ipo.currentStatus === 'open');
    const upcomingIpos = allIpos.filter(ipo => ipo.currentStatus === 'upcoming');
    const closedIpos = allIpos.filter(ipo => ipo.currentStatus === 'closed');

    // Calculate average premium
    const iposWithPremium = allIpos.filter(ipo => ipo.premiumPercentage && parseFloat(ipo.premiumPercentage) > 0);
    const avgPremium = iposWithPremium.length > 0 
      ? iposWithPremium.reduce((sum, ipo) => sum + parseFloat(ipo.premiumPercentage!), 0) / iposWithPremium.length
      : 0;

    return {
      totalIPOs: allIpos.length,
      openIPOs: openIpos.length,
      upcomingIPOs: upcomingIpos.length,
      closedIPOs: closedIpos.length,
      avgPremium: avgPremium.toFixed(1)
    };
  }
}

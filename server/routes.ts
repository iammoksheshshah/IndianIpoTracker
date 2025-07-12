import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { IpoService } from "./services/ipo-service";
import { insertContactSchema } from "@shared/schema";
import { generateSitemap } from "./utils/sitemap";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // IPO Routes
  app.get("/api/ipos", async (req, res) => {
    try {
      const { status, search } = req.query;
      
      let ipos;
      if (search && typeof search === 'string') {
        ipos = await storage.searchIpos(search);
      } else if (status && typeof status === 'string') {
        ipos = await storage.getIposByStatus(status);
      } else {
        ipos = await storage.getAllIpos();
      }
      
      res.json(ipos);
    } catch (error) {
      console.error('Error fetching IPOs:', error);
      res.status(500).json({ error: 'Failed to fetch IPO data' });
    }
  });

  app.get("/api/ipos/stats", async (req, res) => {
    try {
      const stats = await IpoService.getIpoStats();
      res.json(stats);
    } catch (error) {
      console.error('Error fetching IPO stats:', error);
      res.status(500).json({ error: 'Failed to fetch IPO statistics' });
    }
  });

  app.get("/api/ipos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const ipo = await storage.getIpoById(id);
      
      if (!ipo) {
        return res.status(404).json({ error: 'IPO not found' });
      }
      
      res.json(ipo);
    } catch (error) {
      console.error('Error fetching IPO:', error);
      res.status(500).json({ error: 'Failed to fetch IPO' });
    }
  });

  // Sync IPO data from external API
  app.post("/api/ipos/sync", async (req, res) => {
    try {
      await IpoService.fetchAndSyncIpos();
      res.json({ message: 'IPO data synced successfully' });
    } catch (error) {
      console.error('Error syncing IPO data:', error);
      res.status(500).json({ error: 'Failed to sync IPO data' });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          error: 'Invalid contact data',
          details: result.error.issues
        });
      }

      const contact = await storage.createContact(result.data);
      res.status(201).json({ 
        message: 'Contact message sent successfully',
        id: contact.id
      });
    } catch (error) {
      console.error('Error saving contact:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });

  // Sitemap generation
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const sitemap = await generateSitemap();
      res.set('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error('Error generating sitemap:', error);
      res.status(500).json({ error: 'Failed to generate sitemap' });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);

  // Initialize IPO data on server start
  setTimeout(async () => {
    try {
      console.log('Initializing IPO data...');
      await IpoService.fetchAndSyncIpos();
      console.log('IPO data initialized successfully');
    } catch (error) {
      console.error('Failed to initialize IPO data:', error);
    }
  }, 1000);

  return httpServer;
}

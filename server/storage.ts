import { ipos, contacts, users, type Ipo, type InsertIpo, type Contact, type InsertContact, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // IPO operations
  getAllIpos(): Promise<Ipo[]>;
  getIposByStatus(status: string): Promise<Ipo[]>;
  searchIpos(query: string): Promise<Ipo[]>;
  getIpoById(id: number): Promise<Ipo | undefined>;
  createIpo(ipo: InsertIpo): Promise<Ipo>;
  updateIpo(id: number, ipo: Partial<InsertIpo>): Promise<Ipo | undefined>;
  
  // Contact operations
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private ipos: Map<number, Ipo>;
  private contacts: Map<number, Contact>;
  private currentUserId: number;
  private currentIpoId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.ipos = new Map();
    this.contacts = new Map();
    this.currentUserId = 1;
    this.currentIpoId = 1;
    this.currentContactId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllIpos(): Promise<Ipo[]> {
    return Array.from(this.ipos.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getIposByStatus(status: string): Promise<Ipo[]> {
    return Array.from(this.ipos.values())
      .filter(ipo => ipo.currentStatus === status)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async searchIpos(query: string): Promise<Ipo[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.ipos.values())
      .filter(ipo => 
        ipo.name.toLowerCase().includes(lowercaseQuery) ||
        ipo.scriptCode.toLowerCase().includes(lowercaseQuery) ||
        (ipo.exchange && ipo.exchange.toLowerCase().includes(lowercaseQuery))
      )
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async getIpoById(id: number): Promise<Ipo | undefined> {
    return this.ipos.get(id);
  }

  async createIpo(insertIpo: InsertIpo): Promise<Ipo> {
    const id = this.currentIpoId++;
    const now = new Date();
    const ipo: Ipo = { 
      id,
      name: insertIpo.name,
      scriptCode: insertIpo.scriptCode,
      iconUrl: insertIpo.iconUrl ?? null,
      minPrice: insertIpo.minPrice ?? null,
      maxPrice: insertIpo.maxPrice ?? null,
      lotSize: insertIpo.lotSize ?? null,
      premium: insertIpo.premium ?? null,
      premiumPercentage: insertIpo.premiumPercentage ?? null,
      openDate: insertIpo.openDate,
      closeDate: insertIpo.closeDate,
      allotmentDate: insertIpo.allotmentDate ?? null,
      listingDate: insertIpo.listingDate ?? null,
      allotmentLink: insertIpo.allotmentLink ?? null,
      currentStatus: insertIpo.currentStatus,
      exchange: insertIpo.exchange ?? null,
      premiumLastUpdated: insertIpo.premiumLastUpdated ?? null,
      listingPrice: insertIpo.listingPrice ?? null,
      isBuyer: insertIpo.isBuyer ?? null,
      isSeller: insertIpo.isSeller ?? null,
      isPreApply: insertIpo.isPreApply ?? null,
      createdAt: now,
      updatedAt: now
    };
    this.ipos.set(id, ipo);
    return ipo;
  }

  async updateIpo(id: number, updates: Partial<InsertIpo>): Promise<Ipo | undefined> {
    const existingIpo = this.ipos.get(id);
    if (!existingIpo) return undefined;

    const updatedIpo: Ipo = {
      ...existingIpo,
      ...updates,
      updatedAt: new Date()
    };
    this.ipos.set(id, updatedIpo);
    return updatedIpo;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }
}

export const storage = new MemStorage();

import { db } from "../lib/db";
import { AsyncStorage } from "@thirdweb-dev/wallets";

export class MyPrismaStorage implements AsyncStorage {
    private email: string;
  
    constructor(email: string) {
      this.email = email;
    }
  
    async getItem(email: string): Promise<string | null> {
      const user = await db.userEmail.findUnique({
        where: { email: this.email },
      });
      return user?.walletData ?? null;
    }
  
    async setItem(email: string, value: string): Promise<void> {
      await db.userEmail.update({
        where: { email: this.email },
        data: { walletData: value },
      });
    }
  
    async removeItem(email: string): Promise<void> {
      await db.userEmail.delete({
        where: { email: this.email }
      });
    }
  }
// src/lib/cron.ts
import cron from 'node-cron' ;
import { db } from './prismadb';
// import { db } from './db';

// Function to check and update expired plans
const checkExpiredPlans = async () => {
  try {
    const now = new Date();

    // Find all active plans that have expired
    const expiredPlans = await db.purchase.findMany({
      where: {
        isActive: true,
        expirationDate: { lte: now },
      },
    });

    // Update the status of expired plans
    for (const plan of expiredPlans) {
      await db.purchase.update({
        where: { id: plan.id },
        data: { isActive: false },
      });
    }

    console.log(`Updated ${expiredPlans.length} expired plans.`);
  } catch (error) {
    console.error('Error updating expired plans:', error);
  }
};

// Schedule the cron job to run every hour
cron.schedule('0 * * * *', checkExpiredPlans);

console.log('Cron job started: Checking for expired plans every hour.');
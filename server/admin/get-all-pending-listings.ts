"use server";

import db from "@/lib/db";

export async function getAllPendingListings() {
    try {
        const listings = await db.listing.findMany({
            where: {
                approved: false,
            },
        });
        return listings;
    } catch (error) {
        console.error("Error fetching ratings:", error);
        return [];
    }
}

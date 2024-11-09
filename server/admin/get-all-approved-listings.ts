"use server";

import db from "@/lib/db";

export async function getAllApprovedListings() {
    try {
        const listings = await db.listing.findMany({
            where: {
                approved: true,
            },
        });
        return listings;
    } catch (error) {
        console.error("Error fetching ratings:", error);
        return [];
    }
}

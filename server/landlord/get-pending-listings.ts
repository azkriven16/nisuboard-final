"use server";

import db from "@/lib/db";

export async function getPendingListings(id: string) {
    try {
        const listings = await db.listing.findMany({
            where: {
                userId: id,
                approved: false,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return listings;
    } catch (error) {
        console.error("Error fetching ratings:", error);
        return [];
    }
}

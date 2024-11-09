"use server";

import db from "@/lib/db";

export async function getAllListingsById(id: string) {
    try {
        const listings = await db.listing.findMany({
            where: {
                userId: id,
            },
        });
        return listings;
    } catch (error) {
        console.error("Error fetching ratings:", error);
        return [];
    }
}

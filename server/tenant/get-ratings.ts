"use server";

import db from "@/lib/db";

export async function getRatings(id: string) {
    try {
        const ratings = await db.rating.findMany({
            where: {
                listingId: id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return ratings;
    } catch (error) {
        console.error("Error fetching ratings:", error);
        return [];
    }
}

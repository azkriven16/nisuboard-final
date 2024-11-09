"use server";

import db from "@/lib/db";

export async function toggleApproval(listingId: string) {
    try {
        const listing = await db.listing.findUnique({
            where: {
                id: listingId,
            },
        });

        if (!listing) {
            throw new Error("Listing not found");
        }

        await db.listing.update({
            where: {
                id: listingId,
            },
            data: {
                approved: !listing.approved,
            },
        });
        return { success: true };
    } catch (error) {
        console.error("Error toggling listing approval:", error);
        return { success: false };
    }
}

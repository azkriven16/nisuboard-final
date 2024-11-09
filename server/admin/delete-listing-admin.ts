"use server";

import db from "@/lib/db";

export async function deleteListingAdmin(listingId: string) {
    try {
        await db.listing.delete({
            where: {
                id: listingId,
            },
        });
        return { success: true };
    } catch (error) {
        console.error("Error deleting listing:", error);
        return { success: false };
    }
}

import db from "@/lib/db";

export async function getListings() {
    return await db.listing.findMany({
        where: {
            approved: true,
        },
    });
}

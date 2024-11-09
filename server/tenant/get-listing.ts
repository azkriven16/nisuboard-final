import db from "@/lib/db";

export async function getListing(id: string) {
    const listing = await db.listing.findUnique({
        where: {
            id,
        },
    });
    return listing;
}

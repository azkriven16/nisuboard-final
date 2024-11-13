import db from "@/lib/db";

export async function getListings() {
    "use server";

    try {
        const listings = await db.listing.findMany({
            where: {
                approved: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return listings;
    } catch (error) {
        console.error("Error fetching listings:", error);
        return [];
    }
}

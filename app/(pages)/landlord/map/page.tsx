import OlMap from "@/features/map/ol-map";
import db from "@/lib/db";
import { getAllListingsById } from "@/server/landlord/get-all-listings-by-id";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LandlordMapPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }
    const listings = await getAllListingsById(userId);

    return <OlMap listings={listings} />;
}

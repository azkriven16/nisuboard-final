import { Section } from "@/components/section";
import { LandlordCardContainer } from "@/features/landlord/components/landlord-card-container";
import { getPendingListings } from "@/server/landlord/get-pending-listings";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LandlordPendingPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }
    const listings = await getPendingListings(userId);

    return (
        <Section>
            <LandlordCardContainer listings={listings} />
        </Section>
    );
}

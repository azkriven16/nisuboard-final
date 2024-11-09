import { Section } from "@/components/section";
import { LandlordCardContainer } from "@/features/landlord/components/landlord-card-container";
import { getApprovedListings } from "@/server/landlord/get-approved-listings";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LandlordApprovedPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }
    const listings = await getApprovedListings(userId);

    return (
        <Section>
            <LandlordCardContainer listings={listings} />
        </Section>
    );
}

import { Section } from "@/components/section";
import { AdminCardContainer } from "@/features/admin/components/admin-card-container";
import { getAllApprovedListings } from "@/server/admin/get-all-approved-listings";
import { getAllPendingListings } from "@/server/admin/get-all-pending-listings";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminApprovedPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }
    const listings = await getAllApprovedListings();

    return (
        <Section>
            <AdminCardContainer listings={listings} />
        </Section>
    );
}

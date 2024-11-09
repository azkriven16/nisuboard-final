import { Section } from "@/components/section";
import { AdminCardContainer } from "@/features/admin/components/admin-card-container";
import { getAllPendingListings } from "@/server/admin/get-all-pending-listings";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminPendingPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }
    const listings = await getAllPendingListings();

    return (
        <Section>
            <AdminCardContainer listings={listings} />
        </Section>
    );
}

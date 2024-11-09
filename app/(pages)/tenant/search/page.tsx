import { Section } from "@/components/section";
import { TenantCardContainer } from "@/features/tenant/components/tenant-card-container";
import { TenantSearchContainer } from "@/features/tenant/components/tenant-search-container";
import { checkRole } from "@/lib/check-role";
import { getListings } from "@/server/actions/get-listings";
import { redirect } from "next/navigation";

export default async function TenantSearchPage() {
    const [isAdmin, isLandlord] = await Promise.all([
        checkRole("admin"),
        checkRole("landlord"),
    ]);

    if (isAdmin) {
        redirect("/admin");
    }

    if (isLandlord) {
        redirect("/landlord");
    }

    const listings = await getListings();

    return (
        <Section>
            <TenantSearchContainer listings={listings} />
        </Section>
    );
}

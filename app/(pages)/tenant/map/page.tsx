import { Section } from "@/components/section";
import OlMap from "@/features/map/ol-map";
import { checkRole } from "@/lib/check-role";
import { getListings } from "@/server/tenant/get-listings";
import { redirect } from "next/navigation";

export default async function TenantMapPage() {
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
        <Section className="overflow-hidden p-0 rounded-none mb-0 md:mb-0">
            <OlMap listings={listings} />
        </Section>
    );
}

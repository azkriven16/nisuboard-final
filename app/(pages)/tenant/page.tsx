import { Section } from "@/components/section";
import { TenantCardContainer } from "@/features/tenant/components/tenant-card-container";
import { checkRole } from "@/lib/check-role";
import { getListings } from "@/server/queries/get-listings";
import { redirect } from "next/navigation";
import React from "react";

export default async function TenantPage() {
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
            <TenantCardContainer listings={listings} />
        </Section>
    );
}

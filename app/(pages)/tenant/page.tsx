import { Section } from "@/components/section";
import { checkRole } from "@/lib/check-role";
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

    return <Section>TenantPage</Section>;
}

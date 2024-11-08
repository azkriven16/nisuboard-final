"use client";

import MarketingNav from "@/features/marketing/components/marketing-nav";
import { useIsPWA } from "@/lib/is-pwa";
import { redirect } from "next/navigation";

export default function MarketingPage() {
    const isPWA = useIsPWA();

    if (isPWA) redirect("/tenant");

    return (
        <div>
            <MarketingNav />
        </div>
    );
}

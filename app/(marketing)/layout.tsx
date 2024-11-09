"use client";
import MarketingNav from "@/features/marketing/components/marketing-nav";
import { useIsPWA } from "@/lib/is-pwa";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

export default function MarketingLayout({ children }: PropsWithChildren) {
    const isPWA = useIsPWA();

    if (isPWA) redirect("/tenant");

    return (
        <>
            <MarketingNav />
            {children}
        </>
    );
}

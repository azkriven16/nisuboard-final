import TenantNav from "@/features/tenant/components/tenant-nav";
import React, { PropsWithChildren } from "react";

export default function MarketingLayout({ children }: PropsWithChildren) {
    return (
        <>
            <TenantNav />
            {children}
        </>
    );
}

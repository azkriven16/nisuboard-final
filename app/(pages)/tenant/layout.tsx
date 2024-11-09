import TenantNav from "@/features/tenant/components/tenant-nav";
import React, { PropsWithChildren } from "react";

export default function TenantLayout({ children }: PropsWithChildren) {
    return (
        <>
            <TenantNav />
            {children}
        </>
    );
}

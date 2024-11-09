import MarketingNav from "@/features/marketing/components/marketing-nav";
import React, { PropsWithChildren } from "react";

export default function MarketingLayout({ children }: PropsWithChildren) {
    return (
        <>
            <MarketingNav />
            {children}
        </>
    );
}

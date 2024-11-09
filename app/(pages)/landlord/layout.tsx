import LandlordNav from "@/features/landlord/components/landlord-nav";
import React, { PropsWithChildren } from "react";

export default function LandlordLayout({ children }: PropsWithChildren) {
    return (
        <>
            <LandlordNav />
            {children}
        </>
    );
}

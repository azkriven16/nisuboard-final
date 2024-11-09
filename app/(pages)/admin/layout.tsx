import AdminNav from "@/features/admin/components/admin-nav";
import React, { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <>
            <AdminNav />
            {children}
        </>
    );
}

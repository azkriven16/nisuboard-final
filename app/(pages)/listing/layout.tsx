import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { checkRole } from "@/lib/check-role";
import TenantNav from "@/features/tenant/components/tenant-nav";

export default async function ListingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Check roles in parallel using Promise.all
    const [isAdmin, isLandlord] = await Promise.all([
        checkRole("admin"),
        checkRole("landlord"),
    ]);

    return (
        <>
            {/* {isAdmin && <AdminNavbar />}
            {isLandlord && <LandlordNavbar />} */}
            {!isAdmin && !isLandlord && <TenantNav />}
            {children}
        </>
    );
}

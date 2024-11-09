import AdminNav from "@/features/admin/components/admin-nav";
import LandlordNav from "@/features/landlord/components/landlord-nav";
import TenantNav from "@/features/tenant/components/tenant-nav";
import { checkRole } from "@/lib/check-role";

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
            {isAdmin && <AdminNav />}
            {isLandlord && <LandlordNav />}
            {!isAdmin && !isLandlord && <TenantNav />}
            {children}
        </>
    );
}

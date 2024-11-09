import { Section } from "@/components/section";
import ListingStats from "@/features/admin/components/listing-stats";
import UserStats from "@/features/admin/components/user-stats";

export default function AdminDashboardPage() {
    return (
        <Section className="flex flex-col md:flex-row items-center justify-center gap-20 md:gap-5 my-20 md:my-5">
            <ListingStats />
            <UserStats />
        </Section>
    );
}

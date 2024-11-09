import { Section } from "@/components/section";
import ListingDetails from "@/features/listing/components/listing-details";
import ListingRatings from "@/features/listing/components/listing-ratings";
import { getListing } from "@/server/tenant/get-listing";

interface ListingPageProps {
    params: {
        id: string;
    };
}

export default async function ListingPage({ params }: ListingPageProps) {
    const { id } = params;

    const listing = await getListing(id);

    if (!listing) {
        return (
            <Section>
                <div>Listing not found</div>
            </Section>
        );
    }

    return (
        <Section>
            <ListingDetails listing={listing} />
            <ListingRatings listing={listing} />
        </Section>
    );
}

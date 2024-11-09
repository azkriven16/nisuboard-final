import { Listing } from "@prisma/client";
import { LandlordCard } from "./landlord-card";

interface ManageCardContainerProps {
    listings: Listing[];
}

export const LandlordCardContainer = ({
    listings,
}: ManageCardContainerProps) => {
    if (listings.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <p className="text-muted-foreground text-lg">
                    No listings found
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
                <div key={listing.id}>
                    <LandlordCard listing={listing} />
                </div>
            ))}
        </div>
    );
};

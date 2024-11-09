import Image from "next/image";
import Link from "next/link";
import { Listing } from "@prisma/client";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, MapPin } from "lucide-react";

interface ListingCardProps {
    listing: Listing;
}

export default function TenantCard({ listing }: ListingCardProps) {
    return (
        <Link
            href={`/listing/${listing.id}`}
            className="block transition-transform hover:scale-105"
        >
            <Card className="overflow-hidden">
                <div className="relative aspect-video">
                    <Image
                        src={listing.images[0] || "/placeholder.jpg"}
                        alt={listing.title}
                        fill
                        className="object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                        ₱{listing.price.toLocaleString()}
                    </Badge>
                </div>
                <CardHeader className="p-4">
                    <CardTitle className="line-clamp-1">
                        {listing.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span className="line-clamp-1">{listing.address}</span>
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <div className="flex w-full justify-between text-sm">
                        <div className="flex items-center">
                            <Bed className="mr-1 h-4 w-4" />
                            <span>
                                {listing.bedroom_no}{" "}
                                {listing.bedroom_no === 1
                                    ? "Bedroom"
                                    : "Bedrooms"}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <Bath className="mr-1 h-4 w-4" />
                            <span>
                                {listing.bathroom_no}{" "}
                                {listing.bathroom_no === 1
                                    ? "Bathroom"
                                    : "Bathrooms"}
                            </span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}

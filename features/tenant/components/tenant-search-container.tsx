"use client";

import React, { useState, useEffect } from "react";
import { Listing } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import TenantCard from "./tenant-card";
import { Search, Home } from "lucide-react";

export const TenantSearchContainer = ({
    listings,
}: {
    listings: Listing[];
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredListings, setFilteredListings] = useState(listings);

    useEffect(() => {
        const filtered = listings.filter(
            (listing) =>
                listing.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                listing.address
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
        );
        setFilteredListings(filtered);
    }, [searchQuery, listings]);

    if (listings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <Home className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">
                    No listings available at the moment
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 mx-auto">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <Input
                                id="search"
                                type="text"
                                placeholder="Enter keywords or address..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {filteredListings.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <Search className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-lg">
                        No listings match your search criteria
                    </p>
                </div>
            ) : (
                <div>
                    <p className="text-muted-foreground mb-4 text-sm">
                        Showing {filteredListings.length} of {listings.length}{" "}
                        listings
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredListings.map((listing) => (
                            <TenantCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

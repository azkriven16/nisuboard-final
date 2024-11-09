"use client";

import React, { useState, useEffect } from "react";
import { Listing } from "@prisma/client";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TenantCard from "./tenant-card";
import { Search } from "lucide-react";

export const TenantCardContainer = ({ listings }: { listings: Listing[] }) => {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
    const [filteredListings, setFilteredListings] = useState(listings);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const filtered = listings.filter(
            (listing) =>
                listing.price >= priceRange[0] &&
                listing.price <= priceRange[1] &&
                listing.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredListings(filtered);
    }, [priceRange, listings, searchTerm]);

    const handlePriceRangeChange = (value: number[]) => {
        setPriceRange([value[0], value[1]]);
    };

    if (listings.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                    No listings found
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 mx-auto">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-full space-y-2">
                            <Label
                                htmlFor="price-range"
                                className="text-sm font-medium flex items-center gap-2"
                            >
                                Price Range: ₱{priceRange[0].toLocaleString()} -
                                ₱{priceRange[1].toLocaleString()}
                            </Label>
                            <Slider
                                id="price-range"
                                defaultValue={[0, 10000]}
                                max={10000}
                                step={100}
                                value={priceRange}
                                onValueChange={handlePriceRangeChange}
                                className="w-full"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {filteredListings.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">
                        No listings match your search criteria
                    </p>
                </div>
            ) : (
                <div>
                    <p className="text-muted-foreground mb-4">
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

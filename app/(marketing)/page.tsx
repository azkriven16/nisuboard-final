"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import MarketingNav from "@/features/marketing/components/marketing-nav";
import { useIsPWA } from "@/lib/is-pwa";
import { Calendar, Home, Search, Users } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function MarketingPage() {
    const isPWA = useIsPWA();

    useEffect(() => {
        if (isPWA) {
            redirect("/tenant");
        }
    }, [isPWA]);

    return (
        <div>
            <MarketingNav />
            <main className="flex min-h-screen flex-col items-center">
                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center px-4 py-12 md:py-24 text-center">
                    <Badge variant="secondary" className="mb-4">
                        Simplifying Boarding House Management
                    </Badge>
                    <h1 className="mb-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        {siteConfig.title}: Your Boarding House Solution
                    </h1>
                    <p className="mb-8 max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        {siteConfig.description}
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button size="lg" className="h-12 px-8">
                            Find a Boarding House
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-12 px-8"
                        >
                            List Your Property
                        </Button>
                    </div>
                    <div className="mt-8 flex items-center gap-2 rounded-lg bg-muted px-4 py-3 font-mono text-sm">
                        <Search className="h-4 w-4" />
                        <span>Search for boarding houses in your area</span>
                    </div>
                </div>

                {/* Features Section */}
                <section className="w-full bg-muted/40 py-16">
                    <div className="container">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                                Why Choose Nisuboard?
                            </h2>
                            <p className="mt-4 text-xl text-muted-foreground">
                                Streamline your boarding house experience with
                                our comprehensive platform.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="flex flex-col items-center p-6 text-center">
                                <Search className="mb-4 h-12 w-12 text-primary" />
                                <h3 className="mb-2 text-xl font-semibold">
                                    Easy Search
                                </h3>
                                <p className="text-muted-foreground">
                                    Find the perfect boarding house with our
                                    advanced search filters and map integration.
                                </p>
                            </Card>
                            <Card className="flex flex-col items-center p-6 text-center">
                                <Home className="mb-4 h-12 w-12 text-primary" />
                                <h3 className="mb-2 text-xl font-semibold">
                                    Property Management
                                </h3>
                                <p className="text-muted-foreground">
                                    Effortlessly manage your properties,
                                    tenants, and maintenance requests in one
                                    place.
                                </p>
                            </Card>
                            <Card className="flex flex-col items-center p-6 text-center">
                                <Users className="mb-4 h-12 w-12 text-primary" />
                                <h3 className="mb-2 text-xl font-semibold">
                                    Tenant Portal
                                </h3>
                                <p className="text-muted-foreground">
                                    Provide tenants with a dedicated portal for
                                    rent payments, maintenance requests, and
                                    communication.
                                </p>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

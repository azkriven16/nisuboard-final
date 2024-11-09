import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Home, Search, Users, Shield, Map } from "lucide-react";

export default function FeaturesPage() {
    const features = [
        {
            title: "Advanced Search",
            description:
                "Find the perfect boarding house with powerful search filters and map integration.",
            icon: <Search className="h-8 w-8 text-primary" />,
        },
        {
            title: "Property Management",
            description:
                "Easily manage multiple properties, rooms, and tenants from a single dashboard.",
            icon: <Home className="h-8 w-8 text-primary" />,
        },
        {
            title: "Tenant Portal",
            description:
                "Provide tenants with a dedicated portal for search, queries, and information.",
            icon: <Users className="h-8 w-8 text-primary" />,
        },
        {
            title: "Landlord Portal",
            description:
                "Empower landlords with tools to create listings, manage properties, and communicate with tenants efficiently.",
            icon: <Home className="h-8 w-8 text-primary" />,
        },
        {
            title: "Admin Portal",
            description:
                "Comprehensive dashboard for administrators to oversee all activities, manage users, and ensure platform integrity.",
            icon: <Shield className="h-8 w-8 text-primary" />,
        },
        {
            title: "Map Integration",
            description:
                "Interactive map interface for visualizing and exploring boarding house listings, with location-based search and filtering capabilities.",
            icon: <Map className="h-8 w-8 text-primary" />,
        },
    ];

    return (
        <div className="container mx-auto py-12">
            <h1 className="mb-8 text-center text-4xl font-bold">
                Nisuboard Features
            </h1>
            <p className="mb-12 text-center text-xl text-muted-foreground">
                Discover the powerful features that make Nisuboard the ultimate
                solution for boarding house management.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                {feature.icon}
                                <CardTitle className="text-xl font-bold">
                                    {feature.title}
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription className="text-base">
                                {feature.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

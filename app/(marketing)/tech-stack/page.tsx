import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ArrowRight,
    Database,
    Globe,
    Key,
    Layers,
    Lock,
    Map,
    Palette,
} from "lucide-react";
import Link from "next/link";

export default function TechStack() {
    const technologies = [
        {
            name: "Next.js",
            description:
                "React framework for building fast and scalable web applications",
            icon: <Layers className="h-8 w-8" />,
            link: "https://nextjs.org/",
        },
        {
            name: "Tailwind CSS",
            description: "Utility-first CSS framework for rapid UI development",
            icon: <Palette className="h-8 w-8" />,
            link: "https://tailwindcss.com/",
        },
        {
            name: "shadcn/ui",
            description:
                "Beautifully designed components built with Radix UI and Tailwind CSS",
            icon: <ArrowRight className="h-8 w-8" />,
            link: "https://ui.shadcn.com/",
        },
        {
            name: "TypeScript",
            description:
                "Typed superset of JavaScript for improved developer experience",
            icon: <Key className="h-8 w-8" />,
            link: "https://www.typescriptlang.org/",
        },
        {
            name: "Prisma",
            description: "Next-generation ORM for Node.js and TypeScript",
            icon: <Database className="h-8 w-8" />,
            link: "https://www.prisma.io/",
        },
        {
            name: "MongoDB",
            description:
                "Flexible and scalable NoSQL database for modern applications",
            icon: <Globe className="h-8 w-8" />,
            link: "https://www.mongodb.com/",
        },
        {
            name: "OpenLayers",
            description:
                "High-performance mapping library for interactive maps",
            icon: <Map className="h-8 w-8" />,
            link: "https://openlayers.org/",
        },
        {
            name: "Clerk",
            description: "Complete user management and authentication solution",
            icon: <Lock className="h-8 w-8" />,
            link: "https://clerk.com/",
        },
    ];

    return (
        <div className="container mx-auto py-12">
            <h1 className="mb-8 text-center text-4xl font-bold">
                Our Tech Stack
            </h1>
            <p className="mb-12 text-center text-xl text-muted-foreground">
                Nisuboard is built with cutting-edge technologies to provide a
                robust and scalable solution for boarding house management.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {technologies.map((tech) => (
                    <Card key={tech.name} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-bold">
                                    {tech.name}
                                </CardTitle>
                                {tech.icon}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription className="text-base">
                                {tech.description}
                            </CardDescription>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <Link
                                href={tech.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                            >
                                Learn more
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

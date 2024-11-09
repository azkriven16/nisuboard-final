import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";
import { Search } from "lucide-react";

export default function MarketingPage() {
    return (
        <Section className="flex flex-col items-center justify-center px-4 py-12 md:py-24 text-center">
            <Badge variant="secondary" className="mb-4">
                Simplifying Boarding House Management
            </Badge>
            <h1 className="mb-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                {siteConfig.title}: Your Boarding House Solution
            </h1>
            <p className="mb-8 max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                {siteConfig.description}
            </p>

            <div className="mt-8 flex items-center gap-2 rounded-lg bg-muted px-4 py-3 font-mono text-sm">
                <Search className="h-4 w-4" />
                <span>Search for boarding houses in your area</span>
            </div>
        </Section>
    );
}

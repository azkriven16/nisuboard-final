"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Home, Newspaper, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MarketingNav() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const pathname = usePathname();

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        });
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            setDeferredPrompt(null);
        }
    };

    const navItems = [
        { href: "/", label: "Home" },
        { href: "#tech-stack", label: "Tech Stack" },
        { href: "#features", label: "Features" },
    ];

    return (
        <>
            <nav className="flex items-center justify-between p-4 shadow-md">
                <div className="flex items-center space-x-6">
                    <Link
                        href="/"
                        className={`text-xl font-bold hover:bg-accent hover:text-accent-foreground p-2  transition-colors`}
                    >
                        Nisuboard
                    </Link>
                    <div className="hidden md:flex space-x-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`text-sm font-medium hover:bg-accent hover:text-accent-foreground p-2  transition-colors ${
                                    pathname === item.href
                                        ? "bg-accent text-accent-foreground border-b border-primary"
                                        : ""
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={handleInstall}
                        className="hidden md:inline-flex"
                    >
                        Download App
                    </Button>
                    <Button
                        type="submit"
                        variant="outline"
                        size="icon"
                        className="shrink-0"
                    >
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Search</span>
                    </Button>
                    <ModeToggle />
                </div>
            </nav>

            {/* Mobile bottom bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border">
                <div className="flex justify-around items-center h-16">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex flex-col items-center ${
                                pathname === item.href
                                    ? "bg-accent text-accent-foreground border border-primary"
                                    : ""
                            }`}
                        >
                            <Newspaper className="h-6 w-6" />
                            <span className="text-xs">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile download app button */}
            <div className="md:hidden fixed bottom-20 right-4">
                <Button
                    onClick={handleInstall}
                    size="lg"
                    className="rounded-full shadow-lg"
                >
                    <Download className="h-5 w-5 mr-2" />
                    Download App
                </Button>
            </div>
        </>
    );
}

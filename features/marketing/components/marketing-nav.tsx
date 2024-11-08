"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Home, Newspaper, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MarketingNav() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

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
    return (
        <>
            <nav className="flex items-center justify-between p-4 shadow-md">
                <div className="flex items-center space-x-6">
                    <Link
                        href="/"
                        className="text-xl font-bold hover:bg-accent hover:text-accent-foreground p-2 rounded-md transition-colors"
                    >
                        Nisuboard
                    </Link>
                    <div className="hidden md:flex space-x-4">
                        <Link
                            href="#showcase"
                            className="text-sm font-medium hover:bg-accent hover:text-accent-foreground p-2 rounded-md transition-colors"
                        >
                            Showcase
                        </Link>
                        <Link
                            href="#docs"
                            className="text-sm font-medium hover:bg-accent hover:text-accent-foreground p-2 rounded-md transition-colors"
                        >
                            Docs
                        </Link>
                        <Link
                            href="#blog"
                            className="text-sm font-medium hover:bg-accent hover:text-accent-foreground p-2 rounded-md transition-colors"
                        >
                            Blog
                        </Link>
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
                    <Link href="/" className="flex flex-col items-center">
                        <Home className="h-6 w-6" />
                        <span className="text-xs">Home</span>
                    </Link>
                    <Link
                        href="#showcase"
                        className="flex flex-col items-center"
                    >
                        <BookOpen className="h-6 w-6" />
                        <span className="text-xs">Showcase</span>
                    </Link>
                    <Link href="#docs" className="flex flex-col items-center">
                        <Newspaper className="h-6 w-6" />
                        <span className="text-xs">Docs</span>
                    </Link>
                    <Link href="#blog" className="flex flex-col items-center">
                        <Newspaper className="h-6 w-6" />
                        <span className="text-xs">Blog</span>
                    </Link>
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

"use client";

import { useState } from "react";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Home, BookOpen, Newspaper, Download } from "lucide-react";
import Link from "next/link";

export default function MarketingNav() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

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
                    <Button className="hidden md:inline-flex">
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

            {/* Mobile search overlay */}
            {isSearchOpen && (
                <div className="md:hidden fixed inset-0 bg-background z-50 p-4">
                    <form className="flex items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="flex-grow"
                            autoFocus
                        />
                        <Button type="submit" size="icon">
                            <Search className="h-4 w-4" />
                            <span className="sr-only">Search</span>
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setIsSearchOpen(false)}
                        >
                            <span className="sr-only">Close</span>✕
                        </Button>
                    </form>
                </div>
            )}

            {/* Mobile download app button */}
            <div className="md:hidden fixed bottom-20 right-4">
                <Button size="lg" className="rounded-full shadow-lg">
                    <Download className="h-5 w-5 mr-2" />
                    Download App
                </Button>
            </div>
        </>
    );
}

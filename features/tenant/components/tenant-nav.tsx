"use client";

import { ModeToggle } from "@/components/theme-toggle";
import UserButtonComponent from "@/components/user-button";
import { Home, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TenantNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/tenant", label: "Home" },
        { href: "/tenant/map", label: "Map" },
        { href: "/tenant/search", label: "Search" },
    ];

    return (
        <>
            <nav className="flex items-center justify-between p-4 shadow-md h-16">
                <div className="flex items-center space-x-6">
                    <Link
                        href="/tenant"
                        className={`text-xl font-bold hover:bg-accent hover:text-accent-foreground py-2 rounded-full transition-colors`}
                    >
                        Nisuboard
                    </Link>
                    <div className="hidden md:flex space-x-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`text-sm font-medium hover:bg-accent hover:text-accent-foreground py-2 px-4 rounded-full transition-colors ${
                                    pathname === item.href
                                        ? "bg-accent text-accent-foreground"
                                        : ""
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <UserButtonComponent />
                    <ModeToggle />
                </div>
            </nav>

            {/* Mobile bottom bar */}
            <div
                style={{ zIndex: 99999 }}
                className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-torder"
            >
                <div className="flex justify-around items-center h-16">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex flex-col items-center ${
                                pathname === item.href
                                    ? "bg-accent text-accent-foreground border p-3"
                                    : ""
                            }`}
                        >
                            {item.label === "Home" && (
                                <Home className="h-6 w-6" />
                            )}
                            {item.label === "Map" && (
                                <MapPin className="h-6 w-6" />
                            )}
                            {item.label === "Search" && (
                                <Search className="h-6 w-6" />
                            )}
                            <span className="text-xs">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

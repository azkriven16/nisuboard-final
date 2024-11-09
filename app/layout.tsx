import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { Loader } from "@/components/loader";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

const { title, description } = siteConfig;

export const metadata: Metadata = {
    title: {
        default: title,
        template: `%s - ${title}`,
    },
    description: description,
    applicationName: title,
    appleWebApp: {
        capable: true,
        title: title,
        statusBarStyle: "default",
    },
    formatDetection: {
        telephone: false,
    },
    manifest: "/manifest.json",
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            signInFallbackRedirectUrl="/"
            appearance={{
                variables: {
                    colorPrimary: "hsl(263.4, 70%, 50.4%)",
                },
            }}
        >
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <ClerkLoading>
                            <Loader />
                        </ClerkLoading>
                        <ClerkLoaded>{children}</ClerkLoaded>
                        <Toaster position="top-center" richColors />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}

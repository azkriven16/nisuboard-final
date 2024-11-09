"use client";

import { useIsPWA } from "@/lib/is-pwa";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export const Section = ({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) => {
    useIsPWA();

    return <section className={cn("px-4", className)}>{children}</section>;
};

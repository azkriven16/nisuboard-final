"use client";

import { Button } from "@/components/ui/button";
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    useClerk,
} from "@clerk/nextjs";
import { IconUser } from "@tabler/icons-react";

export default function UserButtonComponent() {
    const { loaded } = useClerk();

    if (!loaded) {
        return (
            <>
                <div className="h-[32px] w-[32px] rounded-full bg-muted animate-pulse" />
            </>
        );
    }

    return (
        <>
            <SignedIn>
                <div className="flex items-center gap-2">
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "h-[20px] w-[20px]",
                            },
                        }}
                    />
                </div>
            </SignedIn>
            <SignedOut>
                <SignInButton>
                    <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full"
                    >
                        <IconUser />
                    </Button>
                </SignInButton>
            </SignedOut>
        </>
    );
}

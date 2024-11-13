import { SignUp } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col items-center space-y-6 w-full max-w-md">
            <Link
                href="/tenant"
                className="self-start flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go back
            </Link>
            <SignUp />
        </div>
    );
}

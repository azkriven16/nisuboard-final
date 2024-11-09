"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconCheck, IconTrash, IconX } from "@tabler/icons-react";
import { Listing } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Bath, Bed, MapPin } from "lucide-react";
import { deleteListingAdmin } from "@/server/admin/delete-listing-admin";
import { toggleApproval } from "@/server/admin/toggle-approval";

interface AdminCardProps {
    listing: Listing;
}

export default function AdminCard({ listing }: AdminCardProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            const result = await deleteListingAdmin(listing.id);
            if (result.success) {
                toast.success("Listing deleted successfully");
                setIsDeleteDialogOpen(false);
                router.refresh();
            } else {
                toast.error("Failed to delete listing");
            }
        } catch (error) {
            console.error("Error deleting listing:", error);
            toast.error("Failed to delete listing");
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleApproval = async () => {
        try {
            setIsLoading(true);
            const result = await toggleApproval(listing.id);
            if (result.success) {
                toast.success(
                    listing.approved
                        ? "Listing unapproved successfully"
                        : "Listing approved successfully"
                );
                router.refresh();
            } else {
                toast.error("Failed to toggle listing approval");
            }
        } catch (error) {
            console.error("Error toggling approval:", error);
            toast.error("Failed to toggle listing approval");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Link
                href={`/listing/${listing.id}`}
                className="block transition-transform hover:scale-105"
            >
                <Card className="overflow-hidden">
                    <div className="relative aspect-video">
                        <Image
                            src={listing.images[0] || "/placeholder.jpg"}
                            alt={listing.title}
                            fill
                            className="object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                            ₱{listing.price.toLocaleString()}
                        </Badge>
                    </div>
                    <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1">
                            {listing.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-1 h-4 w-4" />
                            <span className="line-clamp-1">
                                {listing.address}
                            </span>
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                        <div className="flex w-full justify-between text-sm">
                            <div className="flex items-center">
                                <Bed className="mr-1 h-4 w-4" />
                                <span>
                                    {listing.bedroom_no}{" "}
                                    {listing.bedroom_no === 1
                                        ? "Bedroom"
                                        : "Bedrooms"}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <Bath className="mr-1 h-4 w-4" />
                                <span>
                                    {listing.bathroom_no}{" "}
                                    {listing.bathroom_no === 1
                                        ? "Bathroom"
                                        : "Bathrooms"}
                                </span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </Link>
            <div className="flex gap-2 mt-2 p-4 border rounded-lg shadow-sm">
                <Button
                    onClick={handleToggleApproval}
                    variant={listing.approved ? "destructive" : "default"}
                    className="flex-1 items-center gap-2"
                    disabled={isLoading}
                >
                    {listing.approved ? (
                        <>
                            <IconX className="h-4 w-4" />
                            Unapprove
                        </>
                    ) : (
                        <>
                            <IconCheck className="h-4 w-4" />
                            Approve
                        </>
                    )}
                </Button>

                <Dialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button
                            disabled={isLoading}
                            className="flex-1 items-center gap-2"
                            variant="destructive"
                        >
                            <IconTrash className="h-4 w-4" />
                            Delete
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Listing</DialogTitle>
                        </DialogHeader>
                        <p className="py-4">
                            Are you sure you want to delete this listing? This
                            action cannot be undone.
                        </p>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsDeleteDialogOpen(false)}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={isLoading}
                            >
                                {isLoading ? "Deleting..." : "Delete"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

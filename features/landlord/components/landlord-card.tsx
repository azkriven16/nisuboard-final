"use client";
import { Listing } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateForm from "@/features/listing/components/create-listing";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bath, Bed, MapPin } from "lucide-react";
import { deleteListing } from "@/server/landlord/delete-listing";

interface LandlordEditCardProps {
    listing: Listing;
}
export const LandlordCard = ({ listing }: LandlordEditCardProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            const result = await deleteListing(listing.id);
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

            <div className="flex gap-2 mt-4">
                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button
                            disabled={isLoading}
                            className="flex-1"
                            variant="default"
                        >
                            Edit
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Listing</DialogTitle>
                        </DialogHeader>
                        <CreateForm
                            initialData={listing}
                            onSuccess={() => {
                                setIsEditDialogOpen(false);
                                router.refresh();
                            }}
                        />
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button
                            disabled={isLoading}
                            className="flex-1"
                            variant="destructive"
                        >
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
};

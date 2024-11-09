"use client";

import { useState, useEffect } from "react";
import { Rating as PrismaRating, Listing } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
    IconStar,
    IconStarHalf,
    IconTrash,
    IconEdit,
} from "@tabler/icons-react";
import { createRating } from "@/server/tenant/create-rating";
import { getRatings } from "@/server/tenant/get-ratings";
import { deleteRating } from "@/server/tenant/delete-rating";
import { editRating } from "@/server/tenant/edit-rating";

interface ListingRatingsProps {
    listing: Listing;
}

export default function ListingRatings({ listing }: ListingRatingsProps) {
    const { user } = useUser();
    const [ratings, setRatings] = useState<PrismaRating[]>([]);
    const [userRating, setUserRating] = useState(0);
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const [editingRating, setEditingRating] = useState<string | null>(null);
    const [editRatingValue, setEditRatingValue] = useState(0);
    const [editReview, setEditReview] = useState("");

    useEffect(() => {
        loadRatings();
    }, [listing.id]);

    const loadRatings = async () => {
        try {
            const data = await getRatings(listing.id);
            setRatings(data);
        } catch (error) {
            toast.error("Failed to fetch ratings. Please try again.");
            console.error("Error fetching ratings:", error);
        }
    };

    const handleSubmitRating = async () => {
        if (!user) return;

        setLoading(true);
        try {
            await createRating({
                rating: userRating,
                userImage: user.imageUrl,
                userName: user.firstName || user.emailAddresses[0].emailAddress,
                review: review,
                id: listing.id,
            });
            setReview("");
            setUserRating(0);
            loadRatings();
            toast.success("Your review has been submitted successfully!");
        } catch (error) {
            toast.error("Failed to submit review. Please try again.");
            console.error("Error submitting rating:", error);
        }
        setLoading(false);
    };

    const handleDeleteRating = async (
        ratingId: string,
        ratingUserId: string
    ) => {
        try {
            await deleteRating(ratingId, ratingUserId);
            loadRatings();
            toast.success("Review deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete review. Please try again.");
            console.error("Error deleting rating:", error);
        }
    };

    const handleEditRating = async (rating: PrismaRating) => {
        setEditingRating(rating.id);
        setEditRatingValue(rating.value);
        setEditReview(rating.review);
    };

    const handleSaveEdit = async (ratingId: string, ratingUserId: string) => {
        try {
            await editRating(
                ratingId,
                ratingUserId,
                editRatingValue,
                editReview
            );
            setEditingRating(null);
            loadRatings();
            toast.success("Review updated successfully!");
        } catch (error) {
            toast.error("Failed to update review. Please try again.");
            console.error("Error editing rating:", error);
        }
    };

    const averageRating = ratings.length
        ? ratings.reduce((acc, curr) => acc + curr.value, 0) / ratings.length
        : 0;

    const userHasRated = ratings.some((rating) => rating.userId === user?.id);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Ratings & Reviews</h2>

            {ratings.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <IconStar
                                key={i}
                                className={`w-5 h-5 ${
                                    i < Math.round(averageRating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }`}
                                fill="currentColor"
                            />
                        ))}
                    </div>
                    <span className="text-lg font-medium">
                        {averageRating.toFixed(1)} ({ratings.length} reviews)
                    </span>
                </div>
            )}

            {user && !userHasRated && (
                <div className="mb-6 p-4 border rounded-lg">
                    <div className="flex gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setUserRating(star)}
                                className={`${
                                    star <= userRating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }`}
                            >
                                <IconStar
                                    className="w-6 h-6"
                                    fill="currentColor"
                                />
                            </button>
                        ))}
                    </div>
                    <Input
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review..."
                        className="mb-4"
                    />
                    <Button
                        onClick={handleSubmitRating}
                        disabled={loading || userRating === 0}
                    >
                        {loading ? "Submitting..." : "Submit Review"}
                    </Button>
                </div>
            )}

            {user && userHasRated && (
                <div className="mb-6 p-4 border rounded-lg">
                    <p className="font-medium text-muted-foreground">
                        You have already commented on this post. You can edit or
                        remove your old comment.
                    </p>
                </div>
            )}

            <div className="space-y-4">
                {ratings.map((rating) => (
                    <div key={rating.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={rating.user_image} />
                                    <AvatarFallback>
                                        {rating.user_name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">
                                        {rating.user_name || "Not Available"}
                                    </p>
                                    {editingRating === rating.id ? (
                                        <div className="flex gap-2 mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() =>
                                                        setEditRatingValue(star)
                                                    }
                                                    className={`${
                                                        star <= editRatingValue
                                                            ? "text-yellow-400"
                                                            : "text-gray-300"
                                                    }`}
                                                >
                                                    <IconStar
                                                        className="w-4 h-4"
                                                        fill="currentColor"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex gap-1">
                                            {Array.from({ length: 5 }).map(
                                                (_, i) => (
                                                    <IconStar
                                                        key={i}
                                                        className={`w-4 h-4 ${
                                                            i < rating.value
                                                                ? "text-yellow-400"
                                                                : "text-gray-300"
                                                        }`}
                                                        fill="currentColor"
                                                    />
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {user?.id === rating.userId && (
                                <div className="flex gap-2">
                                    {editingRating === rating.id ? (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleSaveEdit(
                                                    rating.id,
                                                    rating.userId
                                                )
                                            }
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleEditRating(rating)
                                                }
                                            >
                                                <IconEdit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDeleteRating(
                                                        rating.id,
                                                        rating.userId
                                                    )
                                                }
                                            >
                                                <IconTrash className="w-4 h-4" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        {editingRating === rating.id ? (
                            <Input
                                value={editReview}
                                onChange={(e) => setEditReview(e.target.value)}
                                className="mt-2"
                            />
                        ) : (
                            <p className="text-gray-600">{rating.review}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

"use server";

import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Define the types for the input parameters
interface CreateRatingParams {
    rating: number;
    review: string;
    userName: string;
    userImage: string;
    id: string;
}

export async function createRating({
    rating,
    review,
    userName,
    userImage,
    id,
}: CreateRatingParams): Promise<void> {
    // Authenticate user and retrieve userId
    const { userId } = await auth();

    if (!userId) {
        // If user is not authenticated, return early
        return;
    }

    // Validate that the necessary data is available
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
        throw new Error(
            "Invalid rating value. Rating must be between 1 and 5."
        );
    }

    try {
        await db.rating.create({
            data: {
                listingId: id,
                value: rating,
                review,
                user_name: userName,
                user_image: userImage,
                userId: userId,
            },
        });

        // Revalidate the path for listing
        revalidatePath(`/listing/${id}`);
    } catch (error) {
        console.error("Error submitting rating:", error);
    }
}

"use server";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function editRating(
    ratingId: string,
    ratingUserId: string,
    newRating: number,
    newReview: string
) {
    const { userId } = await auth();

    if (!userId) return;

    try {
        // Check if user is rating creator
        const isCreator = userId === ratingUserId;

        if (!isCreator) {
            throw new Error("Unauthorized to edit this rating");
        }

        await db.rating.update({
            where: {
                id: ratingId,
            },
            data: {
                value: newRating,
                review: newReview,
            },
        });
        revalidatePath(`/listing/${ratingId}`);
    } catch (error) {
        console.error("Error editing rating:", error);
    }
}

"use server";

import { checkRole } from "@/lib/check-role";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteRating(ratingId: string, ratingUserId: string) {
    const { userId } = await auth();

    if (!userId) return;

    try {
        // Check if user is admin or rating creator
        const isAdmin = await checkRole("admin");
        const isCreator = userId === ratingUserId;

        if (!isAdmin && !isCreator) {
            throw new Error("Unauthorized to delete this rating");
        }

        await db.rating.delete({
            where: {
                id: ratingId,
            },
        });
        revalidatePath(`/listing/${ratingId}`);
    } catch (error) {
        console.error("Error deleting rating:", error);
    }
}

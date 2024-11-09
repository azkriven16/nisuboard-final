"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function deleteRole(formData: FormData) {
    const clerk = await clerkClient();

    try {
        const res = await clerk.users.updateUser(formData.get("id") as string, {
            publicMetadata: { role: null },
        });
        return { message: res.publicMetadata };
    } catch (err) {
        return { message: err };
    }
}

import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Section } from "@/components/section";
import { setRole } from "@/server/admin/set-role";
import { deleteRole } from "@/server/admin/delete-role";
import EditUser from "@/features/admin/components/edit-user";
import { SearchUsers } from "@/features/admin/components/search-users";

export default async function AdminDashboard(params: {
    searchParams: { search?: string };
}) {
    const query = params.searchParams.search;
    const clerk = await clerkClient();

    const users = query ? (await clerk.users.getUserList({ query })).data : [];

    async function handleSetRole(formData: FormData) {
        "use server";
        await setRole(formData);
        revalidatePath("/admin/find-user");
    }

    async function handleRemoveRole(formData: FormData) {
        "use server";
        await deleteRole(formData);
        revalidatePath("/admin/find-user");
    }

    return (
        <Section>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Find Users</h2>
                <SearchUsers />
            </div>

            <div className="space-y-2">
                {users.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                        No users found
                    </div>
                ) : (
                    users.map((user) => (
                        <EditUser
                            key={user.id}
                            user={user}
                            onSetRole={handleSetRole}
                            onRemoveRole={handleRemoveRole}
                        />
                    ))
                )}
            </div>
        </Section>
    );
}

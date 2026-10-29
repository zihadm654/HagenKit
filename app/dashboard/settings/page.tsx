import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/actions/user";
import { getCurrentWorkspace } from "@/app/actions/workspace-settings";
import { SettingsNavigation } from "@/components/settings/settings-navigation";
import { SettingsContent } from "@/components/settings/settings-content";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSettingsPage() {
  return (
    <Suspense fallback={<SettingsPageSkeleton />}>
      <DashboardSettings />
    </Suspense>
  );
}

async function DashboardSettings() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  // Get user's workspace and their role
  const workspaceResult = await getCurrentWorkspace();
  const workspace =
    workspaceResult.success && workspaceResult.data
      ? workspaceResult.data
      : null;

  // Check if user is admin (OWNER or ADMIN) OR platform admin
  const isWorkspaceAdmin =
    workspace !== null &&
    (workspace.memberRole === "OWNER" || workspace.memberRole === "ADMIN");
  const isPlatformAdmin = user.role === "admin";
  const isAdmin = isWorkspaceAdmin || isPlatformAdmin;

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and workspace preferences
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Sidebar Navigation */}
          <SettingsNavigation isAdmin={isAdmin} />

          {/* Content Area - Conditional Rendering based on URL */}
          <SettingsContent
            user={{
              id: user.id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              image: user.image,
            }}
            workspace={workspace}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}

function SettingsPageSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <Skeleton className="h-56 w-full" />
          <Skeleton className="h-56 w-full" />
        </div>
      </div>
    </div>
  );
}

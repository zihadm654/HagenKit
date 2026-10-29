import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

/**
 * Fallback chrome for the authenticated (dashboard/admin) layouts while the
 * session-derived sidebar and impersonation banner stream in.
 */
export function AppShellSkeleton() {
  return (
    <>
      <div className="bg-sidebar hidden w-(--sidebar-width) shrink-0 flex-col gap-3 border-r p-2 md:flex">
        <Skeleton className="h-8 w-full" />
        <div className="mt-4 flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-full" />
          ))}
        </div>
        <Skeleton className="mt-auto h-12 w-full" />
      </div>
      <div className="bg-background relative flex w-full flex-1 flex-col md:m-2 md:ml-0 md:rounded-xl">
        <div className="flex h-(--header-height) shrink-0 items-center gap-2 border-b px-4 lg:px-6">
          <Skeleton className="h-7 w-7 rounded-md" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex flex-1 items-center justify-center p-8">
          <Spinner className="text-muted-foreground size-5" />
        </div>
      </div>
    </>
  );
}

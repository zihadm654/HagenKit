import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/actions/user";
import { AcceptInvitationClient } from "@/components/invitations/accept-invitation-client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

interface AcceptInvitationPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default function AcceptInvitationPage({
  searchParams,
}: AcceptInvitationPageProps) {
  return (
    <Suspense fallback={<AcceptInvitationSkeleton />}>
      <AcceptInvitationContent searchParams={searchParams} />
    </Suspense>
  );
}

async function AcceptInvitationContent({
  searchParams,
}: AcceptInvitationPageProps) {
  const params = await searchParams;
  const token = params.token;

  // Check if token exists
  if (!token) {
    redirect("/dashboard");
  }

  // Check if user is authenticated
  const user = await getCurrentUser();

  if (!user) {
    // Redirect to sign-up with callback URL to return here after login
    const callbackUrl = encodeURIComponent(`/accept-invitation?token=${token}`);
    redirect(`/sign-up?callbackUrl=${callbackUrl}`);
  }

  // User is authenticated, render client component to handle acceptance
  return <AcceptInvitationClient token={token} userEmail={user.email} />;
}

function AcceptInvitationSkeleton() {
  return (
    <div className="container flex min-h-screen items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <Spinner className="text-primary size-6" />
          </div>
          <CardTitle>Accepting Invitation…</CardTitle>
          <CardDescription>
            Please wait while we process your invitation
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

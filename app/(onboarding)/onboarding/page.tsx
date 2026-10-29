import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/actions/user";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { Spinner } from "@/components/ui/spinner";

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center">
          <Spinner className="text-muted-foreground size-5" />
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}

async function OnboardingContent() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // If user already completed onboarding, redirect to dashboard
  if (user.onboardingCompleted) {
    redirect("/dashboard");
  }

  return <OnboardingFlow userName={user.name} userEmail={user.email} />;
}

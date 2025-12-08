import OnboardingBanner from "@/app/components/OnboardingBanner";

export default function page() {
    return (
      <div className="block md:hidden">
        <OnboardingBanner onFinishRedirect="/"/>
      </div>
    );
  }
  
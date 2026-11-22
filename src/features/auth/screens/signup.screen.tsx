import SignupForm from "../components/signup/SignupForm";
import SignupHero from "../components/signup/SignupHero";

export default function SignupScreen() {
  return (
    <>
      <main className="background-gray">
        <div className="container section-padding space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-9 xl:gap-0 xl:grid-cols-8">
          <SignupHero />
          <div className="hidden xl:block xl:col-span-1"></div>
          <SignupForm />
        </div>
      </main>
    </>
  );
}

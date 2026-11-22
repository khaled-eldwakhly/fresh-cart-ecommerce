import SigninForm from "../components/signin/SigninForm";
import SigninHero from "../components/signin/SigninHero";

export default function SigninScreen() {
  return (
    <>
      <main className="background-gray">
        <div className="container section-padding space-y-12 lg:space-y-0 lg:flex lg:justify-center lg:items-center lg:gap-16">
          <SigninHero />
          <SigninForm />
        </div>
      </main>
    </>
  );
}

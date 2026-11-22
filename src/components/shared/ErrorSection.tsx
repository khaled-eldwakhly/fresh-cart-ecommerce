type ErrorSectionProps = {
  errorMessage: string;
};

export default function ErrorSection({ errorMessage }: ErrorSectionProps) {
  return (
    <section className="container section-padding">
      <div className="flex justify-center items-center border-2 border-red-400 rounded-lg text-red-500 bg-red-100/70 py-6">
        {errorMessage || "Unexpected error!"}
      </div>
    </section>
  );
}

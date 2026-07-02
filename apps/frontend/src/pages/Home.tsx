import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import UploadCard from "../components/upload/UploadCard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Header />

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-14">
          <div className="text-center">
            <h2 className="text-5xl font-bold tracking-tight text-slate-900">
              AI Project Reviewer
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Upload any software project as a ZIP archive and receive a
              professional AI-generated engineering review including
              architecture analysis, code quality feedback, resume suggestions,
              and interview questions.
            </p>
          </div>

          <div className="mt-12">
            <UploadCard />
          </div>

          <div className="mt-12">
            {/* Report */}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
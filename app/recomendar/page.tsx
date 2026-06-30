import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecommendForm from "@/components/RecommendForm";

export const metadata: Metadata = {
  title: "Recomendar — Kefilwe Lourenço",
  description: "Deixe uma recomendação para Kefilwe Lourenço.",
  robots: { index: false },
};

export default function RecomendarPage() {
  return (
    <>
      <Header />
      <main id="main" className="pt-[57px]">
        <section className="mx-auto max-w-container px-6 py-16">
          <RecommendForm />
        </section>
      </main>
      <Footer />
    </>
  );
}

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import PhotoStory from "@/components/PhotoStory";
import ProjectChapter from "@/components/ProjectChapter";
import TrajectoryStack from "@/components/TrajectoryStack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { photoStories, testimonial } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kefilwe Lourenço",
  url: "https://kefilwe.dev",
  jobTitle: "Desenvolvedor Full Stack JavaScript",
  description:
    "Desenvolvedor Full Stack JavaScript com experiência em React, TypeScript e NestJS. Instrutor de tecnologia e inclusão digital desde 2019.",
  sameAs: [
    "https://github.com/KefilweLourenco",
    "https://www.linkedin.com/in/kefilwe-lourenco/",
  ],
  knowsAbout: ["React", "TypeScript", "NestJS", "Node.js", "JavaScript", "Acessibilidade Web"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main" className="pt-[57px]">
        <Hero />
        <Process />
        {photoStories.map((story) => (
          <PhotoStory key={story.slug} {...story} />
        ))}
        <PhotoStory {...testimonial} />
        <ProjectChapter />
        <TrajectoryStack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

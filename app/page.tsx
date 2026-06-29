import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import PhotoStory from "@/components/PhotoStory";
import ProjectChapter from "@/components/ProjectChapter";
import TrajectoryStack from "@/components/TrajectoryStack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { photoStories, testimonial } from "@/lib/data";

export default function Home() {
  return (
    <>
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

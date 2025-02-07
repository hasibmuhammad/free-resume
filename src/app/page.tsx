import Hero from "./components/Hero/Hero";
import Steps from "./components/Steps/Steps";
import Testimonials from "./components/Testimonial/Testimonial";

export default function Home() {
  return (
    <section className="px-5">
      <Hero />
      <Steps />
      <Testimonials />
    </section>
  );
}

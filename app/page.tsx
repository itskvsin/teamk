import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials  from "@/components/Testimonials";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      {/* <PageLoader> */}
        <Hero />
        <Services />
        <Testimonials />
        <Work />
      {/* </PageLoader> */}
    </>
  );
}

// import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
// import Services from "@/components/Services";
// import Testimonials  from "@/components/Testimonials";
// import Work from "@/components/Work";
import PageLoader from "@/components/Render";
import SmoothScrollingWrapper from "@/lib/SmoothScrollingWrapper";

export default function Home() {
  const lenisOptions = {
    lerp: 0.6, // Adjust for desired smoothness
    duration: 2,
    smoothTouch: true, // Enable/disable smooth scroll for touch devices
    smooth: true,
  };
  return (
    <>
      <SmoothScrollingWrapper>
        <PageLoader>
          <Navbar />
          {/* <Hero />
        <Services />
        <Testimonials />
        <Work /> */}
        </PageLoader>
      </SmoothScrollingWrapper>
    </>
  );
}

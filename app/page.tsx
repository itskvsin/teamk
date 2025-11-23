import Hero from "@/components/Hero";
import PageLoader from "@/components/Render";
import Renderer from "@/components/Render";
import Services from "@/components/Services";
// import HorizontalScroll from "@/components/HorizontalScroll";
// import Card from "@/components/Card";

export default function Home() {
  return (
    <>
      <PageLoader>
        <Hero />
        <Services />
      </PageLoader>
    </>
  );
}

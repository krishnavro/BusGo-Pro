import Hero from "../components/Hero";
import SearchSection from "../components/SearchSection";
import Features from "../components/Features";

function Home() {
  return (
    <>
      <Hero />
      <SearchSection margintop="-mt-10" />
      <Features />
    </>
  );
}

export default Home;
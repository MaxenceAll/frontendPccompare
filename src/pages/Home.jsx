import HomeCarousel from "../components/Home/HomeCarousel";
import usePageTitle from "../Hooks/usePageTitle";

function Home() {
  
  // set title logic:
  usePageTitle(`${import.meta.env.VITE_APP_NAME} | Home page`);

  return (
    <>
      <HomeCarousel />
    </>
  );
}

export default Home;

import { useEffect } from "react";
import HomeCarousel from "../components/Home/HomeCarousel";

function Home() {
  
  // set title logic:
  useEffect(() => {
    document.title = `${
      import.meta.env.VITE_APP_NAME
    } | Page principale | Home page`;
  }, []);

  return (
    <>
      <HomeCarousel />
    </>
  );
}

export default Home;

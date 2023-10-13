import { ImgCarousel } from "../Components/Carousel"
import { Footer } from "../Components/Footer"
import { NavBar } from "../Components/NavBar"
import { Paginate } from "../Components/Paginate"
import Cards from "../Widgets/Cards"

const Home = () => {
  return (
    <>
       {/* nav */}
       <NavBar />
      {/* carousel  */}
      <ImgCarousel />
      {/* cards  */}
      <Cards />
      {/* pagination  */}
      <Paginate />
      {/* footer  */}
      <Footer />
     
    </>
  )
}

export default Home 
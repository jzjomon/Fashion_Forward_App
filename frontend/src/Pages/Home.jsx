import { Cards } from "../Components/Cards"
import { ImgCarousel } from "../Components/Carousel"
import { Footer } from "../Components/Footer"
import { NavBar } from "../Components/NavBar"
import { Paginate } from "../Components/Paginate"

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
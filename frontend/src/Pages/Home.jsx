import { Cards } from "../Components/Cards"
import { ImgCarousel } from "../Components/Carousel"
import { Footer } from "../Components/Footer"
import { NavBar } from "../Components/NavBar"
import { Paginate } from "../Components/Paginate"

const Home = () => {
  return (
    <>
    {/* <main className="flex-wrap"> */}
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
    {/* </main> */}
     
    </>
  )
}

export default Home 
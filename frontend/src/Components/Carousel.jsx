import { Carousel } from "@material-tailwind/react";
 
export function ImgCarousel() {
  return (
    <section className="w-full mt-5 px-5">
      <Carousel autoplay={true} prevArrow={false} nextArrow={false} navigation={false} className="rounded-xl xl:w-11/12 mx-auto ">
      <img
        src="https://surabhiturf.com/wp-content/uploads/2020/07/turf1.jpg"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
      src="https://surabhiturf.com/wp-content/uploads/2020/07/turf2.jpg"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        alt="image 3"
        src="https://surabhiturf.com/wp-content/uploads/2020/07/ARE-YOU-READY-FOR-SOME-FOOTBALL-.jpg"
        className="h-full w-full object-cover"
      />
    </Carousel>
    </section>
    
  );
}
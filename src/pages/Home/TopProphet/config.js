//Antd Carousel Settings
export const settings = {
   arrows: false,
   dots: { className: "AntDCarouselDots" },
   infinite: true,
   speed: 600,
   slidesToShow: 6,
   slidesToScroll: 6,
   initialSlide: 0,
   draggable: true,
   responsive: [
      {
         breakpoint: 2380,
         settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
         },
      },
      {
         breakpoint: 2000,
         settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
         },
      },
      {
         breakpoint: 1580,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
         },
      },
      {
         breakpoint: 1180,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
         },
      },
      {
         breakpoint: 780,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
         },
      },
   ],
}

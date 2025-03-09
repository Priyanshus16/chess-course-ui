// import React from "react";
// import {
//   Box,
//   Typography,
//   Avatar,
//   Card,
//   CardContent,
//   IconButton,
//   Button,
// } from "@mui/material";
// import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
// import Slider from "react-slick";

// // Import slick-carousel CSS files
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// // Testimonials data
// const testimonials = [
//   {
//     id: 1,
//     name: "John Doe",
//     role: "Beginner Chess Player",
//     review:
//       "This platform has transformed my chess skills. The beginner courses are easy to follow and incredibly effective.",
//     image:
//       "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",
//     courseEnrolled: "Mastering Chess Basics",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     role: "Intermediate Chess Enthusiast",
//     review:
//       "The advanced strategies course taught me tactics that significantly improved my game. Highly recommend it!",
//     image:
//       "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",
//     courseEnrolled: "Advanced Chess Strategies",
//   },
//   {
//     id: 3,
//     name: "Chris Johnson",
//     role: "Chess Competitor",
//     review:
//       "The bootcamp helped me prepare for tournaments. The lessons are well-structured and engaging.",
//     image:
//       "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",
//     courseEnrolled: "Chess Mastery Bootcamp",
//   },
// ];

// // Custom arrows for the carousel
// const PrevArrow = ({ onClick }) => (
//   <IconButton
//     onClick={onClick}
//     sx={{
//       position: "absolute",
//       left: { xs: 10, md: -40 },
//       top: "50%",
//       transform: "translateY(-50%)",
//       zIndex: 1,
//       color: "primary.main",
//     }}
//   >
//     <ArrowBackIos />
//   </IconButton>
// );

// const NextArrow = ({ onClick }) => (
//   <IconButton
//     onClick={onClick}
//     sx={{
//       position: "absolute",
//       right: { xs: 10, md: -40 },
//       top: "50%",
//       transform: "translateY(-50%)",
//       zIndex: 1,
//       color: "primary.main",
//     }}
//   >
//     <ArrowForwardIos />
//   </IconButton>
// );

// const Testimonials = () => {
//   // Slider settings
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 900,
//         settings: { slidesToShow: 1 },
//       },
//       {
//         breakpoint: 600,
//         settings: { slidesToShow: 1, arrows: false },
//       },
//     ],
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         display: "flex",
//         flexDirection: { xs: "column", md: "row" },
//         alignItems: "center",
//         p: { xs: 2, md: 4 },
//         backgroundColor: "#f9f9f9",
//         textAlign: { xs: "center", md: "left" },
//       }}
//     >
//       {/* Left Section */}
//       <Box
//         sx={{
//           flex: 1,
//           pr: { md: 4 },
//           mb: { xs: 4, md: 0 },
//           maxWidth: { xs: "100%", md: "40%" },
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Testimonials and Success Stories
//         </Typography>
//         <Typography variant="body1" color="text.secondary" paragraph>
//           Hear from our learners about how our courses helped them improve
//           their chess skills.
//         </Typography>
//         <Button variant="contained" color="primary" size="large">
//           Enroll Now
//         </Button>
//       </Box>

//       {/* Right Section (Carousel) */}
//       <Box sx={{ flex: 2, width: { xs: "100%", md: "60%" } }}>
//         <Slider {...sliderSettings}>
//           {testimonials.map((testimonial) => (
//             <Card
//               key={testimonial.id}
//               sx={{
//                 m: { xs: 1, md: 2 },
//                 p: { xs: 2, md: 3 },
//                 textAlign: "left",
//               }}
//             >
//               <CardContent>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     flexDirection: { xs: "column", md: "row" },
//                     textAlign: { xs: "center", md: "left" },
//                     mb: 2,
//                   }}
//                 >
//                   <Avatar
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     sx={{ width: 64, height: 64, mr: { md: 2 }, mb: { xs: 1, md: 0 } }}
//                   />
//                   <Box>
//                     <Typography variant="h6">{testimonial.name}</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {testimonial.role}
//                     </Typography>
//                   </Box>
//                 </Box>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ mb: 2 }}
//                 >
//                   {testimonial.review}
//                 </Typography>
//                 <Typography variant="body2" color="primary">
//                   Course Enrolled: <strong>{testimonial.courseEnrolled}</strong>
//                 </Typography>
//                 <Box sx={{ textAlign: "center", mt: 2 }}>
//                   <Button variant="contained" color="secondary">
//                     Enroll Now
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           ))}
//         </Slider>
//       </Box>
//     </Box>
//   );
// };

// export default Testimonials;


import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Slider from "react-slick";

// Import slick-carousel CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Realistic Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Magnus Carlsen",
    role: "World Chess Champion",
    review:
      "This platform helped me refine my openings and improve strategic planning. Highly recommended for all levels!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Magnus_Carlsen_2013.png/800px-Magnus_Carlsen_2013.png",
    courseEnrolled: "Advanced Chess Strategies",
  },
  {
    id: 2,
    name: "Hikaru Nakamura",
    role: "Grandmaster & Chess Streamer",
    review:
      "The bootcamp is top-notch! It gave me new insights into endgames and improved my rapid play.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Hikaru_Nakamura_Grand_Swiss_2019.jpg/800px-Hikaru_Nakamura_Grand_Swiss_2019.jpg",
    courseEnrolled: "Chess Mastery Bootcamp",
  },
  {
    id: 3,
    name: "Beth Harmon",
    role: "Chess Prodigy (The Queen’s Gambit)",
    review:
      "I never imagined an online chess course could be this effective. The lessons are engaging and well-structured!",
    // image:
    //   "https://static01.nyt.com/images/2020/10/23/arts/23harmon-phototest1/23harmon-phototest1-superJumbo.jpg",
    courseEnrolled: "Mastering Chess Basics",
  },
];

// Custom arrows for the carousel
const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      left: { xs: 10, md: -40 },
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
      color: "primary.main",
    }}
  >
    <ArrowBackIos />
  </IconButton>
);

const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      right: { xs: 10, md: -40 },
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
      color: "primary.main",
    }}
  >
    <ArrowForwardIos />
  </IconButton>
);

const Testimonials = () => {
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, arrows: false },
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        p: { xs: 2, md: 4 },
        backgroundColor: "#f0f0f0",
        textAlign: { xs: "center", md: "left" },
      }}
    >
      {/* Left Section (YouTube Video) */}
      <Box
        sx={{
          flex: 1,
          pr: { md: 4 },
          mb: { xs: 4, md: 0 },
          maxWidth: { xs: "100%", md: "40%" },
        }}
      >
        <Typography variant="h4" gutterBottom>
          Improve Your Chess with the Best!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Watch how our courses can help you elevate your chess skills.
        </Typography>
        <Box sx={{ width: "100%", position: "relative", pb: "56.25%" }}>
        <iframe
            src="https://www.youtube-nocookie.com/embed/P4fCFom_KzI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </Box>
      </Box>

      {/* Right Section (Carousel) */}
      <Box sx={{ flex: 2, width: { xs: "100%", md: "60%" } }}>
        <Slider {...sliderSettings}>
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              sx={{
                m: { xs: 1, md: 2 },
                p: { xs: 3, md: 4 },
                textAlign: "left",
                borderRadius: "12px",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(250,250,250,0.6))",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: { xs: "column", md: "row" },
                    textAlign: { xs: "center", md: "left" },
                    mb: 2,
                  }}
                >
                  <Avatar
                    src={testimonial.image}
                    alt={testimonial.name}
                    sx={{
                      width: 80,
                      height: 80,
                      mr: { md: 2 },
                      mb: { xs: 1, md: 0 },
                      border: "3px solid #1976d2",
                    }}
                  />
                  <Box>
                    <Typography variant="h6">{testimonial.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontStyle: "italic", color: "#333", mb: 2 }}
                >
                  "{testimonial.review}"
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "#1976d2" }}
                >
                  Enrolled in: {testimonial.courseEnrolled}
                </Typography>
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Button variant="contained" color="primary">
                    Join Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default Testimonials;

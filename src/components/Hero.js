import { Text, Flex, Button, Box, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [movie, setMovie] = useState(null);
  const pageState = null;

  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getMovies", {
      method: "POST",
      body: JSON.stringify({ genre: "Sci-Fi", pageState: pageState }),
    });
    const responseBody = await response.json();
    const movies = responseBody.data.movies_by_genre.values;
    setMovie(movies[Math.floor(Math.random() * movies.length)]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box marginTop="0px !important" position="relative" maxW="100%">
      {movie && (
        <>
          <video
            width="100%"
            className="hero-video"
            muted
            controls
            autoPlay={true}
            loopFlex
          >
            <source src={movie.thumbnail} type="video/mp4" />
          </video>
          <Stack maxW="40%" pos="absolute" top="70%" left="5%">
            <Text as="h1" fontWeight="600" fontSize="32px" color="#fff">
              {movie.synopsis}
            </Text>
            <Flex>
              <Button
                w="150px"
                leftIcon={<i class="fas fa-play" aria-hidden="true"></i>}
                marginRight="12px"
              >
                Play
              </Button>
              <Button
                w="150px"
                leftIcon={<i class="fas fa-info-circle" aria-hidden="true"></i>}
                opacity="0.5"
              >
                More info
              </Button>
            </Flex>
          </Stack>
        </>
      )}
    </Box>
  );
}

import { HStack, Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import Card from "./Card";

const Section = ({ genre }) => {
  const [movies, setMovies] = useState(null);
  const [pageState, setPageState] = useState(null);

  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getMovies", {
      method: "POST",
      body: JSON.stringify({ genre: genre, pageState: pageState }),
    });
    const responseBody = await response.json();
    setMovies(responseBody.data.movies_by_genre.values);
    setPageState(responseBody.data.movies_by_genre.pageState);
  };

  useEffect(() => {
    console.log("hello");
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {movies && (
        <HStack>
          {movies.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}
          <Box
            className="more-button"
            onClick={() => {
              setPageState(pageState);
              fetchData();
            }}
          >
            <i className="fas fa-angle-right"></i>
          </Box>
        </HStack>
      )}
    </>
  );
};

export default Section;

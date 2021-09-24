import "./App.css";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Container, Stack } from "@chakra-ui/layout";
import Hero from "./components/Hero";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/tabs";
import Section from "./components/Section";
import Footer from "./components/Footer";

const App = () => {
  const genreIncrement = 4;
  const [genres, setGenres] = useState(null);
  const [limit, setLimit] = useState(genreIncrement);

  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getGenres", {
      method: "POST",
      body: limit,
    });
    const responseBody = await response.json();
    setGenres(responseBody.data.reference_list.values);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return (
    <Stack>
      <NavBar />
      <Hero />
      <Stack minH="900px">
        {genres && (
          <Tabs isLazy>
            <TabList>
              {Object.values(genres).map((genre) => (
                <Tab>{genre.value}</Tab>
              ))}
            </TabList>

            <TabPanels>
              {Object.values(genres).map((genre) => (
                <TabPanel>
                  <Section key={genre.value} genre={genre.value} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        )}
        <div
          className="page-end"
          onMouseEnter={() => {
            setLimit(limit + genreIncrement);
          }}
        />
      </Stack>
      <Footer />
    </Stack>
  );
};

export default App;

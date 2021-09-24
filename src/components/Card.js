/* import { useState } from "react"

const Card = ({ movie }) => {
  const [isShown, setIsShown] = useState(false)

  return (
    <div
      className="card"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {!isShown && (
        <video className="video" controls>
          <source src={movie.thumbnail} type="video/mp4" />
        </video>
      )}

      {isShown && (
        <>
          <video className="video" controls autoPlay={true} loop>
            <source src={movie.thumbnail} type="video/mp4" />
          </video>
          <div className="info-box">
            <p>{movie.title}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Card */

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Card({ movie }) {
  const [isShown, setIsShown] = useState(false);
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Box
            css={`
              video {
                height: 250px;
                max-height: 250px;
                margin: 0 auto;
              }
            `}
            maxH="200px"
          >
            <video muted className="video" controls autoPlay={true} loop>
              <source src={movie.thumbnail} type="video/mp4" />
            </video>
          </Box>
        </Box>
        <Stack pt={10} align={"center"}>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {movie.title || ""}
          </Heading>
        </Stack>
      </Box>
    </Center>
  );
}

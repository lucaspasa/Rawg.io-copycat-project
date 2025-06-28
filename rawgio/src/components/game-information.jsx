import { Box, Text, Button, HStack, Image, Link  } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import '../gameInformation.css'

import rawgAPICall from "../services/api.jsx"




export const GameInformation = ({data = {name: "hello govna"}, ID, platformIcons, cardData}) => {

let cardGameInfo = {};

const options = {
  year: 'numeric',
  month: 'long', // 'long' for full month name, 'short' for abbreviated (e.g., 'Nov')
  day: 'numeric'
};

let formattedDate = "";

if (data && data.released) {
  formattedDate= new Date(data.released);
  formattedDate = formattedDate.toLocaleDateString('en-US', options);
}

cardData.map((game) => {
  if (game.id === ID) {
    cardGameInfo = game;
    console.log("Card game info:", cardGameInfo);
  }
})

let images = cardGameInfo.short_screenshots ? cardGameInfo.short_screenshots : [];

  return(
  <Box className="game-information-screen" display="flex" justifyContent="center" p={4} color="white" textAlign="left" >
    <Box className="game-information-bg" mt={2} fontSize="md" >{data.background_image ? <img src={data.background_image} alt="Game Background" style={{width: "100%", height: "auto"}} /> : "not loaded"}</Box>
    
    <Box className="game-information-columns" w="960px" display="flex" alignItems="start" justifyContent="center" fontSize="2xl">
      <Box className="game-information-column-1" maxW="528px" fontSize="2xl" >

        <Box mt={2} display="flex" fontWeight="thin" letterSpacing="wider" flexDirection="row" alignItems="center" justifyContent="start" fontSize="sm" >
          {data.released && (<Text fontSize="sm" marginRight="1em" className="game-information-release-date">{formattedDate}</Text>)}{data.platforms.length > 0 && 
          (<Text flexDirection="row" display="flex" className="game-icons"> {platformIcons}</Text>)}{data.playtime>0 && 
          (<Text mx="1em"> AVERAGE PLAYTIME: {data.playtime} HOURS</Text>)} 
          </Box>
        <Box mt={4} fontSize="7xl" fontWeight="bolder" > {data.name ? data.name : "This game did not load properly"}</Box>
        <Box  display="flex" mt={5} fontSize="md" >
           <Button size="xl" className="game-information-add-to-button" variant="solid" fontSize="lg" pb="1em" fontWeight="thin"><Text fontSize="xs" mb="-1.5em" color="grey">Add to</Text>My games</Button> 
           <Button size="xl" className="game-information-add-to-button" variant="outline" fontSize="lg" pb="1em" fontWeight="thin" borderWidth="1px" borderColor="gray.700"><Text fontSize="xs" mb="-1.5em" color="grey">Add to</Text> My Wishlist</Button> 
           <Button size="xl" className="game-information-add-to-button" variant="plain" fontSize="lg" pb="1em" fontWeight="thin"><Text fontSize="xs" mb="-1.5em" color="grey">Add to</Text>My Collection</Button>
        </Box>
        <Box mt="5" fontSize="md" >
          <Text>Overall rating {data.rating ? data.rating : "No Rating"}/5</Text>
          <Text fontSize="xs" color="gray">{data.ratings_count ? data.ratings_count.toLocaleString('en') : "No ratings"} RATINGS</Text>
          </Box>
        <Box mt="5" fontSize="md" >
          <Button w="180px" className="game-information-rate-button" borderWidth="1px" borderColor="gray.700" fontSize="md" fontWeight="400" backgroundColor="gray.800" color="gray.300">Click to rate</Button> 
        </Box>
        <Box mt="5" fontSize="md" >
          <Button className="game-information-review-button" w="180px" borderWidth="1px" borderColor="gray.700" mr="1em" variant="surface" fontWeight="400" backgroundColor="gray.800" fontSize="md"  color="gray.300">Write a review</Button>
          <Button className="game-information-review-button" w="180px" borderWidth="1px" borderColor="gray.700" variant="surface" fontWeight="400" backgroundColor="gray.800" fontSize="md"  color="gray.300">Write a comment</Button>
          </Box>
        <Box mt={5} fontSize="md" >
          <Box mt="5" fontWeight="bolder" fontSize="2xl" >About</Box>
          <Box mt="2" dangerouslySetInnerHTML={{__html: data.description?data.description:"No information is available at this time"}}></Box>

        </Box>
        <Box mt={5} fontSize="md" >
          <Box mt={2} fontSize="md" >Metascore:</Box>
          <Text>{data.metacritic?data.metacritic:"No Metacritic score available"}</Text>
        </Box><Box mt={2} fontSize="md" >
          <Box mt={2} fontSize="md" >Release Date:</Box>
          <Text>{data.released ? data.released : "TBA"}</Text>
        </Box>
        
        {data && data.publishers && data.publishers.length > 0 && (
        <Box mt={2} fontSize="md" >
          <Box mt={2} fontSize="md" >Publisher:</Box>
          <Text>{data.publishers[0].name}</Text>
        </Box>)}
        
        {data.platforms.length > 0 && (
        <Box mt={2} fontSize="md" >
          <Box mt={2} fontSize="md" >Platforms:</Box>
          <Text>{data.platforms[0].platform.name}</Text>
        </Box>)}
        
        {data.genres.length > 0 && (<Box mt={2} fontSize="md" >
          <Box mt={2} fontSize="md" >Genre:</Box>
          <Text>{data.genres[0].name}</Text>
        </Box>)}

        {data.developers.length > 0 && (<Box mt={2} fontSize="md" >
          <Box mt={2} fontSize="md" >Developer:</Box>
          <Text>{data.developers[0].name}</Text>
        </Box>)}

        <Box mt={2} fontSize="md" >
          <Box mt={2} fontSize="md" >Age Rating:</Box>
          <Text>{data.esrb_rating?data.esrb_rating.name:"Game not rated"}</Text>
        </Box>
        
        {data.game_series_count > 0 && (<Box mt={2} fontSize="md" >
          <Box mt={2} fontSize="md" >Other Games in Series:</Box>
          <Text>{data.game_series_count}</Text>
        </Box>)}
        
        {data.additions_count > 0 && (<Box mt={2} fontSize="md" >
          <Box mt={2} fontSize="md" >DLC's and editions:</Box>
          <Text>{data.additions_count}</Text>
        </Box>)}
        
        {data.tags.length > 0 && (<Box mt={2} fontSize="md" >
          <Box mt={2} fontSize="md" >Tags:</Box>
          <Text>{data.tags[0].name}</Text>
        </Box>)}
        
        {data.website && (<Box mt={2} fontSize="md" >
          <Box mt={2} fontSize="md" >Website:</Box>
          <Link>{data.website}</Link>
        </Box>)}



      </Box>
      <Box className="game-information-column-2" fontSize="2xl" w="384px" marginLeft="48px" fontWeight="bold">
      {images.length>0 && (<Box w="384px" className="game-information-images">
          <Image w="384px" rounded="lg" src={images[1] ? images[1].image : images[0].image}></Image>
          {images.length>2 && (<Box className="game-information-smaller" display="flex" flexWrap="wrap" flexDirection="row" justifyContent="space-between" mt={1} >
            {images && images[2].image && (<Image rounded="lg" mt=".5em" w="184px"src={images[2].image}></Image>)}
            {images[3] && (<Image rounded="lg" mt=".5em" w="184px"src={images[3].image}></Image>)}
            {images[4] && (<Image rounded="lg" mt=".5em" w="184px"src={images[4].image}></Image>)}
            {images[5] && (<Image rounded="lg" mt=".5em" w="184px"src={images[5].image}></Image>)}
          </Box>)}
        </Box>)}
        <Button w="384px" p="25px" mt={5} fontSize="md" >Edit Game Info</Button>
        {data.stores.length>0 &&(
          <Box mt={5} fontSize="md">
            <Box mt="2" mb="2" color="gray.500"> Where to buy</Box>
            <HStack wrap="wrap" gap="6">
            {data.stores.map((store, index) => (
              <Button key={index} className="game-information-store-button" w="180px" variant="subtle" fontWeight="400" backgroundColor="gray.800" fontSize="md"  color="gray.400">
                
                {store.store.name}
                <Image src={store.store.image_background} alt={store.store.name} boxSize="24px"  borderRadius="full" mr="2" />
              </Button>
            ))}
            </HStack>
          </Box>)}

      </Box>
    </Box>
  </Box>
)
}

export default GameInformation;
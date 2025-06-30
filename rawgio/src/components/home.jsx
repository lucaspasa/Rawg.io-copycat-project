import { useState, useEffect, use } from 'react'
import { GameCard } from './ui/game-card'

import Header from './header'
import axios from 'axios';
import Sidebar from './sidebar';
import { Flex, Button, Box, Text } from '@chakra-ui/react';
import OrderBySelect from './ui/order-by-select'
import PlatformSelect from './ui/platforms-select';
import Loading from './ui/loading';
import GameInformation from './game-information';
import rawgAPICall from '../services/api.jsx'

function Home() {
  const parentPlatformsKey = {
    "PC": "1",
    "PlayStation": "2",
    "Xbox": "3",
    "ios": "4",
    "apple macOS": "5",
    "linux": "6",
    "nintendo": "7",
     "android": "8",}

  const [cardsData, setCardsData] = useState()
  const [Ordering, setOrdering] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [metacritic, setMetacritic] = useState('80, 100')
  const [parentPlatforms, setParentPlatforms] = useState("1,2,3,4,5,6,7,8,9")
  const [dateRange, setDateRange] = useState("")
  const [reload, setReload] = useState(false)
  const APIKey = '6327df6cc86546fb9e6d671c19a655fb';
  const [individualGame, setIndividualGame] = useState(false);
  const [individualGameId, setIndividualGameId] = useState(null);
  const [individualGameData, setIndividualGameData] = useState(null);
  const [individualPlatformIcons, setIndividualPlatformIcons] = useState([])

  
  

  

  function handleDataFromOrderBy(data) {
      setIsLoading(true);
      setOrdering(data[0]);
      setMetacritic("80, 100")
      
      console.log("search has been cleared by order by")
  }

  function handleDataFromPlatformSelect(data) {
      setIsLoading(true);
      setMetacritic("80, 100")
      console.log("Platform data:", data[0]);
      setParentPlatforms(data[0])
  }

  function handleDataFromSearch(data, metacriticClear, dateClear) {
      setIsLoading(true);
      console.log("Search data:", data);
      setSearch(data);
      setMetacritic(metacriticClear);
      setDateRange(dateClear);
      

      setReload(!reload);// Trigger a reload incase the data is the same
      handleChangeToCards();
  }

  function handleDataFromSidebar(data, metacriticClear) {
      setIsLoading(true);
      console.log("Sidebar date data:", data);
      setDateRange(data);
      setSearch('')
      setMetacritic(metacriticClear);
      setReload(!reload); // Trigger a reload incase the data is the same
  }

  function handleChangeToIndividualGame(id, platformIcons) {
    
    setIndividualGameId(id);
    console.log("Changing to individual game with ID:", id);
    setIndividualPlatformIcons(platformIcons);
    setIndividualGame(true);
  }

  function handleChangeToCards() {
    setIndividualGame(false);
  }
  
 // Fetch data from API for individual game
   useEffect(() => {
    setIsLoading(true);

    const individualGameCall = async () => {
      let data;
      data = await rawgAPICall(individualGameId);

      setIndividualGameData(data);
      setIsLoading(false);
    }

    individualGameCall();

    }, [individualGameId]);

  // Fetch Data from API for Cards
  useEffect(() => {
    setIsLoading(true)
      async function fetchData() {
        const response = await axios.get('https://api.rawg.io/api/games', {
          params: {
            key: APIKey,
            ordering: Ordering,
            metacritic: metacritic,
            exclude_additions: true,
            search: search,
            parent_platforms: parentPlatforms,
            dates: dateRange,
          }
        });
        const data = response.data.results;
        console.log("Fetched data:", data); // Log fetched data
        console.log("Paramaters used: Ordering: ", Ordering + ", Search: " + search + ", Parent Platforms: " + parentPlatforms + ", Metacritic: " + metacritic + ", Date Range: " + dateRange);
        if (data.length === 0) {
          console.log("No data found for the given parameters.");
          setCardsData([]); // Set to empty array if no data found
        }
        else {
          console.log("Data fetched successfully.");
        }
        setCardsData(data); // Update state with fetched data
        setIsLoading(false); // Set loading to false after data is fetched
    }
      fetchData();

      
      

  }, [Ordering, search, parentPlatforms, dateRange, reload]) // Add Ordering and search as dependencies

  // Function to get games and render GameCard components
  function getGames() {
    if (isLoading) {
      return <Loading />
    }
    return  cardsData ? cardsData.map((value, index) => <GameCard handleChangeToGame={handleChangeToIndividualGame} tags={cardsData[index].tags} genres={cardsData[index].genres} rating={cardsData[index].rating} id={cardsData[index].id} released={cardsData[index].released} platforms={cardsData[index].platforms} image={cardsData[index].background_image} key={index} gamename={cardsData[index].name} added={cardsData[index].added} /> ): <p>Loading...</p>
    }

    function displayCards() { 
      return (
        <Box>
          <Flex direction="column" justifyContent="space-between" alignItems="start" p={4} color="white">
            <Text color="white" textStyle="7xl" fontWeight="bolder">{search == ""?(<Text>New and Trending</Text>):(<Text>Searched: "{search}"</Text>)}</Text>
            <Text>Based on player counts and release date</Text>
            <Flex>
              <OrderBySelect sendDataToParent={handleDataFromOrderBy}/>
              <PlatformSelect sendDataToParent={handleDataFromPlatformSelect}/>
            </Flex>
          </Flex>
          <div className="grid">
            {cardsData ? getGames(): <Text color="white" mt="8" textStyle="2xl" fontWeight="bold" letterSpacing="tight">No games found for the given parameters.</Text>}
          </div>
        </Box>
      )
    }
    
    function conditionalRendering() {
      if (individualGame) {
        if (isLoading) {
          return <Loading />
        }
        return <GameInformation cardData={cardsData} platformIcons={individualPlatformIcons} data={individualGameData} ID={individualGameId}/>
      } else {
        return displayCards();
      }
    }

  return (
    <>
      <Header sendDataToParent={handleDataFromSearch}/>
      <Flex className="content">
        <Sidebar handleChangeToCards={handleChangeToCards} sendDataToParent={handleDataFromSidebar} w="220px"/>
        { conditionalRendering() }
        

      </Flex>
      
    </>
  )
}

export default Home

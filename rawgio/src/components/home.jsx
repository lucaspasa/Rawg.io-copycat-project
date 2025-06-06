import { useState, useEffect, use } from 'react'
import { GameCard } from './ui/game-card'

import Header from './header'
import axios from 'axios';
import Sidebar from './sidebar';
import { Flex, Button, Box, Text } from '@chakra-ui/react';
import OrderBySelect from './ui/order-by-select'
import PlatformSelect from './ui/platforms-select';
import Loading from './ui/loading';

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

  const [test, setTest] = useState()
  const [Ordering, setOrdering] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [metacritic, setMetacritic] = useState('80, 100')
  const [parentPlatforms, setParentPlatforms] = useState("1,2,3,4,5,6,7,8,9")
  const [dateRange, setDateRange] = useState("")
  const [reload, setReload] = useState(false)
  const APIKey = '6327df6cc86546fb9e6d671c19a655fb';

  

  function handleDataFromOrderBy(data) {
      setIsLoading(true);
      setOrdering(data[0]);
      setMetacritic("80, 100")
      setSearch('')
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
      console.log("Metacritic clear:", metacriticClear);
      setDateRange(dateClear);
      console.log("Date clear:", dateClear);
      setReload(!reload);// Trigger a reload incase the data is the same
  }

  function handleDataFromSidebar(data, metacriticClear) {
      setIsLoading(true);
      console.log("Sidebar date data:", data);
      setDateRange(data);
      setSearch('')
      setMetacritic(metacriticClear);
      setReload(!reload); // Trigger a reload incase the data is the same
  }
  
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
          setTest([]); // Set to empty array if no data found
        }
        else {
          console.log("Data fetched successfully.");
        }
        setTest(data); // Update state with fetched data
        setIsLoading(false); // Set loading to false after data is fetched
    }
      fetchData();

      
      console.log("Is loading set to false");

  }, [Ordering, search, parentPlatforms, dateRange, reload]) // Add Ordering and search as dependencies

  function getGames() {
    if (isLoading) {
      return <Loading />
    }

  return  test ? test.map((value, index) => <GameCard tags={test[index].tags} platforms={test[index].platforms} image={test[index].background_image} key={index} gamename={test[index].name} added={test[index].added} /> ): <p>Loading...</p>
}
    

  return (
    <>
      <Header sendDataToParent={handleDataFromSearch}/>
      <Flex className="content">
        <Sidebar sendDataToParent={handleDataFromSidebar} w="220px"/>
        <Box>
          <Flex direction="column" justifyContent="space-between" alignItems="start" p={4} color="white">
            <Text color="white" textStyle="7xl" fontWeight="bolder">New and Trending</Text>
            <Text>Based on player counts and release date</Text>
            <Flex>
              <OrderBySelect sendDataToParent={handleDataFromOrderBy}/>
              <PlatformSelect sendDataToParent={handleDataFromPlatformSelect}/>
            </Flex>
          </Flex>
          <div className="grid">
            {getGames()}
          </div>
        </Box>
        

      </Flex>
      
    </>
  )
}

export default Home
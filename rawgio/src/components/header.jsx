import { useState, useEffect } from 'react'
import Searchbar from './ui/search-bar'
import { Link, Box, Stack, Badge  } from "@chakra-ui/react"
import { TbTargetArrow } from "react-icons/tb";



function Header({sendDataToParent}) {

  const [search, setSearch] = useState("");
  const [metacritic, setMetacritic] = useState("80, 100");
  const [dateRange, setDateRange] = useState("");

  function changeValues(search, metacritic) {
    setSearch(search);
    setMetacritic(metacritic);
    setDateRange("");
    console.log("Search:", search);
    sendDataToParent(search, metacritic, dateRange);

  }


  return (
    <>
      <Box w="95vw" display="flex" justifyContent="space-between" alignItems="center" p={4} color="white">
        <Box onClick={() => changeValues("", "80, 100")} className="RAWG-logo" alignSelf="left" mr="8" fontSize="2xl" fontWeight="bold" letterSpacing="wide">R A W G</Box>
        <Badge className="rate-top-games" p="1" mr="4" fontSize="sm" fontWeight="thin" variant="solid">
          <TbTargetArrow />
        <Link className="rate-top-games-link" target='_blank' variant="plain" fontWeight="thin" color="black" href="https://rawg.io/rate/thebest?from=header-menu">Rate top games</Link>
        </Badge>
        <Searchbar sendDataToParent={sendDataToParent} rounded="mg"/>
        <Stack color="white"  ml="2em" direction="row" letterSpacing="wide" spacing={4} alignItems="center">
          <Link color="white" href="https://rawg.io/login">LOG IN</Link>
          <Link color="white" href="https://rawg.io/signup">SIGN UP</Link>
          <Link color="white" href="https://rawg.io/apidocs">API</Link>
          <Link color="white" href="https://rawg.io/apidocs">...</Link>
        </Stack>
      </Box>
    </>
  )
}

export default Header
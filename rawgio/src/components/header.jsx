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
      <Box display="flex" justifyContent="space-between" alignItems="center" p={4} color="white">
        <Box onClick={() => changeValues("", "80, 100")} className="RAWG-logo" alignSelf="left" mr="8" fontSize="2xl" fontWeight="bold" letterSpacing="wide">R A W G</Box>
        <Badge p="2" mr="4" fontSize="md" fontWeight="semibold" variant="solid">
          <TbTargetArrow />
        Rate top games</Badge>
        <Searchbar sendDataToParent={sendDataToParent} rounded="mg"/>
        <Stack color="white"  ml="2em" direction="row" letterSpacing="wide" spacing={4} alignItems="center">
          <Link color="white" href="...">LOG IN</Link>
          <Link color="white" href="...">SIGN UP</Link>
          <Link color="white" href="...">API</Link>
          <Link color="white" href="...">...</Link>
        </Stack>
      </Box>
    </>
  )
}

export default Header
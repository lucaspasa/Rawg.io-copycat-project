import { Box, Stack, Link, Text } from "@chakra-ui/react"
import { BsFire, BsChat  } from "react-icons/bs";
import { TbSquareRoundedLetterN } from "react-icons/tb";
import { FaStar, FaFastForward, FaCrown, FaWindows, FaPlaystation, FaXbox, FaApple, FaGhost, FaHashtag, FaChessPawn, FaCrosshairs,FaCar   } from "react-icons/fa";
import { DiAndroid } from "react-icons/di";
import { MdStyle } from "react-icons/md";
import { HiMiniTrophy } from "react-icons/hi2";
import { FaRankingStar, FaFolderOpen, FaChevronDown, FaChevronUp  } from "react-icons/fa6";
import { IoGameController, IoPerson, IoCodeSlash, IoExtensionPuzzle    } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import { PiCardsBold, PiPersonSimpleHikeBold, PiStrategyBold } from "react-icons/pi";
import { HiExternalLink } from "react-icons/hi";
import { TbSword } from "react-icons/tb";
import { GiBlackKnightHelm } from "react-icons/gi";




import { useEffect, useState } from "react";    


export const Sidebar = ({sendDataToParent, handleChangeToCards}) => {
    const [sidebarBrowseOpen, setSidebarBrowswOpen] = useState(false);
    const [sidebarPlatformsOpen, setSidebarPlatformsOpen] = useState(false);
    const [sidebarGenresOpen, setSidebarGenresOpen] = useState(false);

    // Function to toggle the sidebar browse section
    const toggleSidebarBrowse = () => {
      setSidebarBrowswOpen(!sidebarBrowseOpen);
    };
    // Function to toggle the sidebar platforms section
    const toggleSidebarPlatforms = () => { 
        setSidebarPlatformsOpen(!sidebarPlatformsOpen);
    }

    // Function to toggle the sidebar genres section
    const toggleSidebarGenres = () => {
        setSidebarGenresOpen(!sidebarGenresOpen);
    }

    // Date Variables
    const date = new Date();
    let day = date.getDate();
    day = day < 10 ? "0" + day : day; // Add leading zero if day is less than 10
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month; // Add leading zero if month is less than 10
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    let last30Days
    let last7Days
    let next7Days
    let next30Days
    
    // Calculate the last 30 days date with leading zero if needed
    if (day < 31){
        let dateDifference = 31 - Number(day); // Calculate how many days to subtract to get to the last 30 days
        let lastMonth = Number(month) - 1;
        if (month == 1){
            last30Days = `${year - 1}-12-${day + 1}`;
        } else {
            last30Days = `${year}-${lastMonth < 10 ? "0"+ lastMonth: lastMonth}-${31-dateDifference < 10 ? "0"+ (31-dateDifference): (31-dateDifference)}`;
        }
    } else {
        last30Days = `${year}-${month}-01`; // Month stays the same, and day will be the first of the month
    }

    // Calculate the next 30 days date with leading zero if needed
    if (day > 1){
        let nextmonth = Number(month) + 1;
        if (month == 12){
            next30Days = `${year + 1}-01-${day - 1}`;
        } else {
            next30Days = `${year}-${nextmonth < 10 ? "0"+ nextmonth : nextmonth}-${day}`;
        }
    } else {
        next30Days = `${year}-${month}-31`; //month stays the same, and day will be the last of the month
        console.log("Day is less than 1. Next 30 days: "+next30Days);

    }

    // Calculate the last 7 days date with leading zero if needed
    if (day < 8){
        if (month == 1){
            last7Days = `${year -1}-12-${31-(7-day) < 10 ? "0"+ 31-(7-day): 31-(7-day)}`;
        } else {
            last7Days = `${year}-${(month - 1) < 10 ? "0"+ (month-1): month -1}-${28-(7-day) < 10 ? "0"+ 28-(7-day): 28-(7-day)}`;
        }
    } else {
        last7Days = `${year}-${month}-${day-7 < 10 ? "0" + (day - 7) : day-7}`;
    }

    // Calculate the next 7 days date with leading zero if needed
    if (day > 24){
        let nextMonthDay = Number(day) - 24; // Calculate how many days to subtract to get to the next 7 days
        let nextmonth = Number(month) + 1;
        if (month == 12){
            next7Days = `${year + 1}-01-${day - 24}`;
        } else {
            next7Days = `${year}-${(nextmonth) < 10 ? "0"+ (nextmonth): nextmonth}-${nextMonthDay < 10 ? "0"+ nextMonthDay : nextMonthDay}`;
        }
    } else {
        let nextWeekDay = Number(day) + 7; // Calculate how many days to add to get to the next 7 days
        next7Days = `${year}-${month}-${nextWeekDay < 10 ? "0"+ nextWeekDay: nextWeekDay}`;
    }

    // use states
    const [dateRange, setDateRange] = useState("");
    const [metacritic, setMetacritic] = useState("80, 100");

    
    useEffect(() => {
        sendDataToParent(dateRange, metacritic);
        handleChangeToCards();
    }, [dateRange]);
    
    return(
  <Stack align="start" minW="220px" listStylePosition="inside">
    <Box className="sidebar-link" onClick={() => { dateRange == "" ? setDateRange(undefined): setDateRange("");console.log("home was pressed")}} textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="67px">Home</Box> 
    <Link href="https://rawg.io/reviews/popular"><Box className="sidebar-link" textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="4">Reviews</Box></Link>
    <Stack align="start">
        <Box color="white" textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="4">New Releases</Box>

        <Stack mt="3" className="list" align="start" as="ul" listStyleType="none" spacing={2}>
            <li className="sidebar-sort" onClick={() => {setDateRange(last30Days+","+currentDate); setMetacritic("")}}><Box className="sidebar-icon" ><FaStar /></Box>Last 30 Days</li>
            <li className="sidebar-sort" onClick={() => {setDateRange(last7Days+","+currentDate); setMetacritic("")}}><Box className="sidebar-icon" ><BsFire /></Box>This Week</li>
            <li className="sidebar-sort" onClick={() => {setDateRange(currentDate+","+next7Days); setMetacritic("")}}><Box className="sidebar-icon" ><FaFastForward /></Box>Next Week</li>
            <li className="sidebar-sort" onClick={() => {setDateRange(currentDate+","+next30Days); setMetacritic("")}}><Box className="sidebar-icon" fontWeight="bolder" pt="-0.5" pb="-0.5" id="sidebar-icon-31" >31</Box>Release Calander</li>
        </Stack>
    </Stack>
    <Stack align="start">
        <Box color="white" textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="4">Top</Box>

        <Stack mt="3" className="list" align="start" as="ul" listStyleType="none" spacing={2}>
            <li className="sidebar-sort" onClick={() => {setDateRange("2025-01-01,2025-12-31"); setMetacritic("0, 100")}}><Box className="sidebar-icon" ><HiMiniTrophy /></Box>Best of the year</li>
            <li className="sidebar-sort" onClick={() => {setDateRange("2024-01-01,2024-12-31"); setMetacritic("0, 100")}}><Box className="sidebar-icon" ><FaRankingStar /></Box>Popular in 2024</li>
            <li className="sidebar-sort" onClick={() => setDateRange("2010-01-01,2018-12-31")}><Box className="sidebar-icon" ><FaCrown  /></Box>All time top 250</li>
        </Stack>
    </Stack>
    <Box className="sidebar-link" textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="4" onClick={() => { dateRange == "" ? setDateRange(undefined): setDateRange("");}}>All Games</Box>
    <Stack align="start">
        <Link href="https://rawg.io/games/browse" target="_blank"><Box className="sidebar-link" textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="4">Browse</Box></Link>

        <Stack mt="3" className="list" align="start" as="ul" listStyleType="none" spacing={2}>
            <Link href="https://rawg.io/games/browse" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><IoGameController /></Box>Platforms</li></Link>
            <Link href="https://rawg.io/stores" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><IoMdDownload /></Box>Stores</li></Link>
            <Link href="https://rawg.io/collections/popular" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><FaFolderOpen  /></Box>Collections</li></Link>
            {sidebarBrowseOpen && (<Link href="https://rawg.io/reviews/popular" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><BsChat /></Box>Reviews</li></Link>)}
            {sidebarBrowseOpen && (<Link href="https://rawg.io/genres" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><FaGhost /></Box>Genres</li></Link>)}
            {sidebarBrowseOpen && (<Link href="https://rawg.io/creators" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><IoPerson /></Box>Creators</li></Link>)}
            {sidebarBrowseOpen && (<Link href="https://rawg.io/tags" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><FaHashtag/></Box>Tags</li></Link>)}
            {sidebarBrowseOpen && (<Link href="https://rawg.io/developers" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><IoCodeSlash/></Box>Developers</li></Link>)}
            {sidebarBrowseOpen && (<Link href="https://rawg.io/publishers" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><PiCardsBold   /></Box>Publishers</li></Link>)}
            <li className="show-all sidebar-sort" onClick={toggleSidebarBrowse}>{sidebarBrowseOpen?(<><Box className="sidebar-icon" ><FaChevronUp  /></Box><Text>Hide</Text></>): (<><Box className="sidebar-icon" ><FaChevronDown  /></Box><Text>Show All</Text></>)}</li>
        </Stack>
    </Stack>
    <Stack align="start">
        <Link href="https://rawg.io/platforms" target="_blank"><Box className="sidebar-link" textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="4">Platforms</Box></Link>

        <Stack mt="3" className="list"align="start" as="ul" listStyleType="none" spacing={2}>
            <Link href="https://rawg.io/games/pc" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><FaWindows  /></Box>PC</li></Link>
            <Link href="https://rawg.io/games/playstation4" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><FaPlaystation  /></Box>Playstation 4</li></Link>
            <Link href="https://rawg.io/games/xbox-one" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><FaXbox  /></Box>Xbox One</li></Link>
            {sidebarPlatformsOpen && (<Link href="https://rawg.io/games/nintendo-switch" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><TbSquareRoundedLetterN  /></Box>Nintendo Switch</li></Link>)}
            {sidebarPlatformsOpen && (<Link href="https://rawg.io/games/ios" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><FaApple  /></Box>iOS</li></Link>)}
            {sidebarPlatformsOpen && (<Link href="https://rawg.io/games/android" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><DiAndroid  /></Box>Andriod</li></Link>)}

            <li className="show-all sidebar-sort" onClick={toggleSidebarPlatforms}>{sidebarPlatformsOpen?(<><Box className="sidebar-icon" ><FaChevronUp  /></Box><Text>Hide</Text></>): (<><Box className="sidebar-icon" ><FaChevronDown  /></Box><Text>Show All</Text></>)}</li>

        </Stack>
    </Stack>
    <Stack className="list" align="start">
        <Link href="https://rawg.io/genres" target="_blank"><Box className="sidebar-link" textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="4">Genres</Box></Link>

        <Stack mt="3" className="list" align="start" as="ul" listStyleType="none" spacing={2}>
            <Link href="https://www.desura.games/" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><HiExternalLink /></Box>Free Online Games</li></Link>
            <Link href="https://rawg.io/games/action" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><TbSword  /></Box>Action</li></Link>
            <Link href="https://rawg.io/games/strategy" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><FaChessPawn /></Box>Strategy</li></Link>
            {sidebarGenresOpen && (<Link href="https://rawg.io/games/rpg" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><GiBlackKnightHelm   /></Box>RPG</li></Link>)}
            {sidebarGenresOpen && (<Link href="https://rawg.io/games/shooter" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><FaCrosshairs /></Box>Shooter</li></Link>)}
            {sidebarGenresOpen && (<Link href="https://rawg.io/games/adventure" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><PiPersonSimpleHikeBold   /></Box>Adventure</li></Link>)}
            {sidebarGenresOpen && (<Link href="https://rawg.io/games/puzzle" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><IoExtensionPuzzle   /></Box>Puzzle</li></Link>)}
            {sidebarGenresOpen && (<Link href="https://rawg.io/games/racing" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><FaCar   /></Box>Racing</li></Link>)}
            {sidebarGenresOpen && (<Link href="https://rawg.io/games/sports" target="_blank"><li className="sidebar-sort"><Box className="sidebar-icon" ><PiStrategyBold   /></Box>Sports</li></Link>)}
            <li className="show-all sidebar-sort" onClick={toggleSidebarGenres}>{sidebarGenresOpen?(<><Box className="sidebar-icon" ><FaChevronUp  /></Box><Text>Hide</Text></>): (<><Box className="sidebar-icon" ><FaChevronDown  /></Box><Text>Show All</Text></>)}</li>

        </Stack>
    </Stack>
    </Stack>
)}

export default Sidebar;

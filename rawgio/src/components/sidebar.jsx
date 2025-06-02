import { Box, Stack } from "@chakra-ui/react"
import { BsFire } from "react-icons/bs";
import { FaStar, FaFastForward, FaCrown, FaWindows, FaPlaystation, FaXbox } from "react-icons/fa";
import { MdStyle } from "react-icons/md";
import { HiMiniTrophy } from "react-icons/hi2";
import { FaRankingStar, FaFolderOpen, FaChevronDown  } from "react-icons/fa6";
import { IoGameController } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import { useEffect, useState } from "react";    


export const Sidebar = ({sendDataToParent}) => {
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
            last30Days = `${year}-${lastMonth < 10 ? "0"+ lastMonth: lastMonth}-${31-dateDifference < 10 ? "0"+ (31-dateDifference): "0"+ (31-dateDifference)}`;
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
            next30Days = `${year}-${nextmonth < 10 ? "0"+ nextmonth : nextmonth}-${"0"+ (day - 1)}`;
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
        
        if (month == 12){
            next7Days = `${year + 1}-01-${day - 24}`;
        } else {
            next7Days = `${year}-${(month + 1) < 10 ? "0"+ (month+1): month +1}-${nextMonthDay < 10 ? "0"+ nextMonthDay : nextMonthDay}`;
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
    }, [dateRange]);
    
    return(
  <Stack align="start" minW="220px" listStylePosition="inside">
    <Box className="sidebar-link" onClick={() => {setDateRange("")}} textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="4">Home</Box> 
    <Box textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="4">Reviews</Box>
    <Stack align="start">
        <Box textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="4">New Releases</Box>

        <Stack className="list" align="start" as="ul" listStyleType="none" spacing={2}>
            <li className="sidebar-link" onClick={() => {setDateRange(last30Days+","+currentDate); setMetacritic("")}}><Box className="sidebar-icon" ><FaStar /></Box>Last 30 Days</li>
            <li className="sidebar-link" onClick={() => setDateRange(last7Days+","+currentDate)}><Box className="sidebar-icon" ><BsFire /></Box>This Week</li>
            <li className="sidebar-link" onClick={() => setDateRange(currentDate+","+next7Days)}><Box className="sidebar-icon" ><FaFastForward /></Box>Next Week</li>
            <li className="sidebar-link" onClick={() => setDateRange(currentDate+","+next30Days)}><Box className="sidebar-icon" id="sidebar-icon-31" >31</Box>Release Calander</li>
        </Stack>
    </Stack>
    <Stack align="start">
        <Box textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="4">Top</Box>

        <Stack className="list" align="start" as="ul" listStyleType="none" spacing={2}>
            <li className="sidebar-link" onClick={() => setDateRange("2010-01-01,2018-12-31")}><Box className="sidebar-icon" ><HiMiniTrophy /></Box>Best of the year</li>
            <li className="sidebar-link" onClick={() => setDateRange("2010-01-01,2018-12-31")}><Box className="sidebar-icon" ><FaRankingStar /></Box>Popular in 2024</li>
            <li className="sidebar-link" onClick={() => setDateRange("2010-01-01,2018-12-31")}><Box className="sidebar-icon" ><FaCrown  /></Box>All time top 250</li>
        </Stack>
    </Stack>
    <Box textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="4">All Games</Box>
    <Stack align="start">
        <Box textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="4">Browse</Box>

        <Stack className="list" align="start" as="ul" listStyleType="none" spacing={2}>
            <li><Box className="sidebar-icon" ><IoGameController /></Box>Platforms</li>
            <li><Box className="sidebar-icon" ><IoMdDownload /></Box>Stores</li>
            <li><Box className="sidebar-icon" ><FaFolderOpen  /></Box>Collections</li>
            <li className="show-all"><Box className="sidebar-icon" ><FaChevronDown  /></Box>Show All</li>
        </Stack>
    </Stack>
    <Stack align="start">
        <Box textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="4">Platforms</Box>

        <Stack className="list"align="start" as="ul" listStyleType="none" spacing={2}>
            <li><Box className="sidebar-icon" ><FaWindows  /></Box>PC</li>
            <li><Box className="sidebar-icon" ><FaPlaystation  /></Box>Playstation 4</li>
            <li><Box className="sidebar-icon" ><FaXbox  /></Box>Xbox One</li>
            <li className="show-all"><Box className="sidebar-icon" ><FaChevronDown  /></Box>Show All</li>

        </Stack>
    </Stack>
    <Stack className="list" align="start">
        <Box textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="4">Genres</Box>

        <Stack className="list" align="start" as="ul" listStyleType="none" spacing={2}>
            <li><Box className="sidebar-icon" ><MdStyle /></Box>Free Online Games</li>
            <li><Box className="sidebar-icon" ><MdStyle /></Box>Action</li>
            <li><Box className="sidebar-icon" ><MdStyle /></Box>Strategy</li>
            <li className="show-all"><Box className="sidebar-icon" ><FaChevronDown  /></Box>Show All</li>

        </Stack>
    </Stack>
    </Stack>
)}

export default Sidebar;

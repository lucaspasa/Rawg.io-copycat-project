import { Input, InputGroup, Kbd } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { useState, useEffect } from "react"




export const Searchbar = ({sendDataToParent}) => {

const [value, setValue] = useState([''])
const inputElement = document.getElementById('searchbar');

const handleChange = (event) => {
  setValue(event.target.value);
}

 const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Call the function you want to run
      sendDataToParent(value, "10, 100");
    }
  };





  return(
  <InputGroup className="search-bar" flex="1" startElement={<LuSearch />} endElement={<div className="search-endElement"><Kbd className="search-kbd">alt</Kbd >&nbsp; + &nbsp; <Kbd className="search-kbd">enter</Kbd></div> }>
    <Input id="searchbar" className="search-bar" placeholder="Search 883,027 games" onChange={handleChange} onKeyDown={handleKeyDown}/>
  </InputGroup>
)
}
export default Searchbar;

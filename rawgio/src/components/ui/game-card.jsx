import { Button, Card, Image, Text } from "@chakra-ui/react"
import { FaLinux, FaXbox, FaPlaystation, FaWindows, FaApple, FaPlus } from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import { IoLogoAppleAppstore } from "react-icons/io5";
import { DiAndroid } from "react-icons/di";
import { TbSquareRoundedLetterN } from "react-icons/tb";







export const GameCard = ({gamename = "Game title", image, platforms = [], added = 0}) => {  
    

  let platformIcons = []
  let platformElements = []
  let platformNames = []

  let playstationStr = /PlayStation./;
  let ps = /PS./;
  let xbox = /Xbox./;
  let nintendo = /Nintendo./;

  function getPlatformIcon(platform) {
    let element = platform;
    let platformName = "not found";

    if (playstationStr.test(platform) || ps.test(platform)){
      element = <FaPlaystation key={platform} />;
      platformName = "playstation"
    }
    if (xbox.test(platform)) {
      element = <FaXbox key={platform} />;
      platformName = "XBOX"
    }
    if (nintendo.test(platform)) {
      element = <TbSquareRoundedLetterN  key={platform} />;
      platformName = "NINTENDO"

    }
    if (platform === "Linux") {
      element = <FaLinux key={platform} />;
      platformName = "LINUX"

    }
    if (platform === "PC") {
      element = <FaWindows key={platform} />;
      platformName = "PC"

    }

    if (platform === "macOS") {
      element = <FaApple key={platform} />;
      platformName = "MACOS"
    }

    if (platform === "ios") {
      element = <IoLogoAppleAppstore key={platform} />;
      platformName = "ios"
    }

    if (platform === "Android") {
      element = <DiAndroid  key={platform} />;
      platformName = "andriod"
    }
    
    if (platformElements.includes(platformName)) {
      // if the platform name already exists in the platformElements array, return null
       return null;//exists on platformIcons array return null) {
    }else {
      platformElements.push(platformName)
    return element;
    }
  }

  platforms === null ? "No Platforms found" : platforms.map((value) => {platformNames.push(value.platform.name)})
  platformNames = platformNames.sort(); // sort the platforms alphabetically
  platformNames.unshift(platformNames[platformNames.findIndex((element) => element === "PC")]) // sort PC to the fourth
  platformNames.unshift(platformNames[platformNames.findIndex((element) => nintendo.test(element))]) // sort nintendo to the third
  platformNames.unshift(platformNames[platformNames.findIndex((element) => xbox.test(element))]) // sort XBOX to the second
  platformNames.unshift(platformNames[platformNames.findIndex((element) => playstationStr.test(element))])  // sort playstation to the front

  platformNames.map((value) => {platformIcons.push(getPlatformIcon(value))})
  
  return (
    <Card.Root className="card" overflow="hidden">
      <Image
        src={image ? image : "https://raw.githubusercontent.com/Rawg-io/Rawg-io/master/src/assets/games/placeholder.png"}
        alt="Picture of the game"
        overflow="hidden"
        className="card-image"
      />
      <Card.Body >
        <Text textStyle="md" className="game-icons">{platformIcons}</Text>
        <Card.Description >
        </Card.Description>
        <Card.Title textStyle="3xl" fontWeight="bold" letterSpacing="tight" mt="2">
        {gamename}
        </Card.Title>
      </Card.Body>
      <Card.Footer  className="card-footer">
        <Button textStyle="md" className="button" variant="plain">
        <FaPlus className="plus-button" /> {added.toLocaleString('en')}
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}


export default GameCard;
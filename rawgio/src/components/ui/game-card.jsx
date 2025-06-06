import { Button, Card, Image, Text } from "@chakra-ui/react"
import { FaLinux, FaXbox, FaPlaystation, FaWindows, FaApple, FaPlus } from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import { IoLogoAppleAppstore } from "react-icons/io5";
import { DiAndroid } from "react-icons/di";
import { TbSquareRoundedLetterN } from "react-icons/tb";







export const GameCard = ({gamename = "Game title", image, tags = [{"name": "placeholder"}], platforms = [], added = 0}) => {  
    

  let platformIcons = []
  let platformElements = []
  let platformNames = []
   let tagsNames = [];
    if (tags && Array.isArray(tags) && tags.length > 0) {
      tagsNames = tags.map((tag) => tag.name);
    }
  let NSFW = false;

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

  const consoleLog = () => {
    console.log("Game Tags:", tagsNames);

    if (tagsNames.includes("NSFW") || tagsNames.includes("Sex") || tagsNames.includes("Nudity") || tagsNames.includes("Sexual Content")) {
      console.log("This game has NSFW content");
    }
  }

  
    if (tagsNames.includes("NSFW") || tagsNames.includes("Sex") || tagsNames.includes("Sexual Content")) {
      NSFW = true;
    }

    const imageUrl = () => {
      if(NSFW){
        return "https://thumbs.dreamstime.com/z/nsfw-not-safe-work-internet-slang-used-to-mark-links-content-viewer-may-wish-be-seen-looking-public-acronym-text-288649408.jpg";
          } else if (image) {
            return image
          } else {
            return "https://www.cato.org/sites/cato.org/files/styles/optimized/public/2024-04/video-games.jpg?itok=g4W8gHr3";
          }
    }
    
  
  return (
    <Card.Root className="card" overflow="hidden">
      <Image
        src={imageUrl()}
        alt="Picture of the game"
        overflow="hidden"
        className="card-image"
        onClick={consoleLog}
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
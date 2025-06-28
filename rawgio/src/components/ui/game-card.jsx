import { Box, Button, Card, Image, Text, Separator } from "@chakra-ui/react"
import { FaLinux, FaXbox, FaPlaystation, FaWindows, FaApple, FaPlus } from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import { IoLogoAppleAppstore } from "react-icons/io5";
import { DiAndroid } from "react-icons/di";
import { TbSquareRoundedLetterN } from "react-icons/tb";







export const GameCard = ({handleChangeToGame, gamename = "Game title", image, rating = "not rated", id = null, genres = [], released = "No date given", tags = [{"name": "placeholder"}], platforms = [], added = 0}) => {  
    

  let platformIcons = []
  let platformElements = []
  let platformNames = []
   let tagsNames = [];
    if (tags && Array.isArray(tags) && tags.length > 0) {
      tagsNames = tags.map((tag) => tag.name);
    }
  let NSFW = false;
  let genreList = [genres.map((genre) => " " + genre.name)];
  genreList = genreList.join(",  "); // join the genres with a comma and space

  let playstationStr = /PlayStation./;
  let ps = /PS./;
  let xbox = /Xbox./;
  let nintendo = /Nintendo./;

  function getPlatformIcon(platform) {
    let element = platform;
    let platformName = "not found";

    if (playstationStr.test(platform) || ps.test(platform)){
      element = <FaPlaystation className="platform-icon" key={platform} />;
      platformName = "playstation"
    }
    if (xbox.test(platform)) {
      element = <FaXbox className="platform-icon"key={platform} />;
      platformName = "XBOX"
    }
    if (nintendo.test(platform)) {
      element = <TbSquareRoundedLetterN className="platform-icon" key={platform} />;
      platformName = "NINTENDO"

    }
    if (platform === "Linux") {
      element = <FaLinux className="platform-icon" key={platform} />;
      platformName = "LINUX"

    }
    if (platform === "PC") {
      element = <FaWindows className="platform-icon" key={platform} />;
      platformName = "PC"

    }

    if (platform === "macOS") {
      element = <FaApple className="platform-icon" key={platform} />;
      platformName = "MACOS"
    }

    if (platform === "ios") {
      element = <IoLogoAppleAppstore className="platform-icon" key={platform} />;
      platformName = "ios"
    }

    if (platform === "Android") {
      element = <DiAndroid className="platform-icon" key={platform} />;
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

    const updateID = () => {
      handleChangeToGame(id, platformIcons);

    }
    

  return (
    <Card.Root className="card" >
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
        <Card.Title onClick={updateID} className="card-game-name" textStyle="3xl" fontWeight="bold" letterSpacing="tight" mt="2">
        {gamename}
        </Card.Title>
        <Button textStyle="md" className="button card-button-hover" variant="plain">
          <FaPlus className="plus-button " /> {added.toLocaleString('en')}
        </Button>
      </Card.Body>
      <Card.Footer  className="card-footer">
        
        <Box className="hover-data">
          <Text>Release Date: {released}</Text>
          <Separator className="seperator" />
          <Text>Genres: {genreList} </Text>
          <Separator className="seperator"  />
          <Text>Rating: {rating} </Text>
        </Box>
      </Card.Footer>
    </Card.Root>
  )
}

export default GameCard;
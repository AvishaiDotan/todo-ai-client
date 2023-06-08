import FullBlueSquare from "../Components/HomePageStyledElements/FullBlueSquare";
import InkDrip from "../Components/HomePageStyledElements/InkDrip";
import OrangeFramework from "../Components/HomePageStyledElements/OrangeFramework";
import Photographer from "../Components/HomePageStyledElements/Photographer";
import PlayingMusic from "../Components/HomePageStyledElements/PlayingMusic";
import ThreeDimensionsCube from "../Components/HomePageStyledElements/ThreeDimensionsCube";

export default function HomePage() {
  return (
    <main className="home-page">
      <OrangeFramework />
      <FullBlueSquare />
      <ThreeDimensionsCube />
      <Photographer />
      <PlayingMusic />
      <InkDrip />
    </main>
  )
}

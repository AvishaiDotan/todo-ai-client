import { useState } from 'react'

import { useAppDispatch } from '../Store'
import { createBoard } from '../Store/Actions/boards.actions'

import BoardCreatorInput from '../Components/HomePageStyledElements/BoardCreatorInput'
import FullBlueSquare from '../Components/HomePageStyledElements/FullBlueSquare'
import InkDrip from '../Components/HomePageStyledElements/InkDrip'
import OrangeFramework from '../Components/HomePageStyledElements/OrangeFramework'
import Photographer from '../Components/HomePageStyledElements/Photographer'
import PlayingMusic from '../Components/HomePageStyledElements/PlayingMusic'
import ThreeDimensionsCube from '../Components/HomePageStyledElements/ThreeDimensionsCube'
import Skate from "../Components/HomePageStyledElements/Skate";


export default function HomePage() {
  const [isActive, setIsActive] = useState(false)
  const [todoValue, setTodoValue] = useState('')
  const dispatch = useAppDispatch();
  

  const handleSubmit = () => {
    dispatch(createBoard(todoValue))
  }

  return (
    <main className='home-page'>
      <OrangeFramework />
      <FullBlueSquare />
      <ThreeDimensionsCube />
      <Photographer />
      <PlayingMusic />
      <InkDrip />
      <Skate />
      <BoardCreatorInput
        isActive={isActive}
        onActiveChange={(val) => setIsActive(val)}
        value={todoValue}
        onValueChange={(val) => setTodoValue(val)}
        onSubmit={handleSubmit}
      />
    </main>
  )
}

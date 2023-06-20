import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../Store'
import { createBoard } from '../Store/Actions/boards.actions'

import BoardCreatorInput from '../Components/HomePageStyledElements/BoardCreatorInput'
import FullBlueSquare from '../Components/HomePageStyledElements/FullBlueSquare'
import InkDrip from '../Components/HomePageStyledElements/InkDrip'
import OrangeFramework from '../Components/HomePageStyledElements/OrangeFramework'
import CameraWrapper from '../Components/HomePageStyledElements/CameraWrapper'
import PlayingMusic from '../Components/HomePageStyledElements/PlayingMusic'
import ThreeDimensionsCube from '../Components/HomePageStyledElements/ThreeDimensionsCube'
import Skate from '../Components/HomePageStyledElements/Skate'

import womenPhotographer from '../../../src/App/Assets/photographer_women_holding_camera_towards_you.png'

export default function HomePage() {
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [todoValue, setTodoValue] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await dispatch(createBoard(todoValue))
      navigate('/boards')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
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
        isLoading={isLoading}
        isActive={isActive}
        onActiveChange={(val) => setIsActive(val)}
        value={todoValue}
        onValueChange={(val) => setTodoValue(val)}
        onSubmit={handleSubmit}
      />
    </main>
  )
    const [isActive, setIsActive] = useState(false)
    const [todoValue, setTodoValue] = useState('')
    const dispatch = useAppDispatch();

    
    const handleSubmit = () => {
        dispatch(createBoard(todoValue))
    }
    


    return (
        <main className="home-page">
            <OrangeFramework />
            <FullBlueSquare />
            <ThreeDimensionsCube />
            <CameraWrapper isFlashOn={true}>
                <img className="photographer-img" src={womenPhotographer}></img>
            </CameraWrapper>
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

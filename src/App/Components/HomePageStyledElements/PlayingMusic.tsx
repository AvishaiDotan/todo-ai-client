import { useState } from 'react'

import img1 from '../../Assets/close_up_of_hands_of_a_man_play_guitar_4504d1be-6652-4996-b04b-bfe3d0782823.png'
import img2 from '../../Assets/close_up_of_hands_of_a_man_play_guitar_4504d1be-6652-4996-b04b-bfe3d0782823.png'
import img3 from '../../Assets/Avishi_Dotan_close_up_of_hands_of_a_man_play_piano_7f98e3d4-a793-4dcf-b86d-eda2b28736c9.png'

export default function PlayingMusic() {
	const imgs: string[] = [img1, img2, img3]
	const [imageSrc, setImageSrc] = useState(img1);

	const handleClick = () => {
	  // Update the image source when the click event occurs
	  setImageSrc(getRandomValue(imgs));
	};

	function getRandomValue<T>(array: T[]): T {
		const randomIndex = Math.floor(Math.random() * array.length);

		if (imageSrc === array[randomIndex]) 
			return getRandomValue(array);

		return array[randomIndex];
	}

	return (
		<img onClick={handleClick} className='playing-music curser-pointer' src={imageSrc}></img>
	)
}



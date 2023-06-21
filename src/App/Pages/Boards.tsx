import CameraWrapper from '@/Components/HomePageStyledElements/CameraWrapper'

import { useState, useEffect } from 'react'
import { boardService } from '@/Services/board.service'
import { Board, Todo, SubTask, DataToRenderTypeEnum, DataToRender} from '../Types'
import { useParams  } from "react-router-dom";
import TodoAICheckbox from '@/Components/MiniComponents/TodoAICheckbox'

import arrow from '../../../src/App/Assets/arrow.png'
import TableHeaderTitle from './TableComponents/TableHeaderTitle';
import TableHeaders from './TableComponents/TableHeaders';
import TableBody from './TableComponents/TableBody';
import TodoAiLoader from '@/Components/MiniComponents/TodoAiLoader';


type ComponentParams = {
	boardId?: string,
	todoId?: string
}

interface IBoardsProps {
	title: string
	dataToRenderType: DataToRenderTypeEnum
}





export default function Boards({title, dataToRenderType}: IBoardsProps) {

	const [dataToRender, setDataToRender] = useState<DataToRender>([])
	const params = useParams<ComponentParams>()
	const {boardId, todoId} = params;

	useEffect(() => {
		if (!boardId && !todoId && dataToRenderType == DataToRenderTypeEnum.board)
			loadBoards()
	}, [params])

	const loadBoards = async () => {
		var boards = await boardService.getBoards();
		setDataToRender(boards)
	}

	return (
		<section className="boards-page">
			<TableHeaderTitle headerStr={title} />
			<section className='table-wrapper'>
				<section className="table">
					<TableHeaders />
					<div style={{height: "calc(100% - 60px)"}}>
						{
							(dataToRender.length) ? 
								<TableBody dataToRender={dataToRender} dataToRenderType={dataToRenderType} />
								:
								<TodoAiLoader />
						}
					</div>
				</section>
			</section>

			<section className='actions-wrapper'>
				<div className="apply-status-to-all-wrapper">
					<CameraWrapper isFromHomePage={false}>
						<div className='apply-status-to-all-container'>
							<h4 className='third-font-family'>Status:</h4>
							<TodoAICheckbox />
							<div className='checkbox-arrow-wrapper'>
								<img src={arrow} />
							</div>
						</div>
					</CameraWrapper>
				</div>



				<div className="description">

				</div>

				{/* {(props.isBoards) && <div>Back to Boards Page</div>} */}
			</section>

		</section>
	)
}

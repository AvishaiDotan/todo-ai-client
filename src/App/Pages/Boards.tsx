import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import CameraWrapper from '@/Components/HomePageStyledElements/CameraWrapper'
import { boardService } from '@/Services/board.service'
import { DataToRenderTypeEnum, DataToRender } from '../Types'
import TodoAICheckbox from '@/Components/MiniComponents/TodoAICheckbox'

import arrow from '../../../src/App/Assets/arrow.png'
import TableHeaderTitle from './TableComponents/TableHeaderTitle'
import TableHeaders from './TableComponents/TableHeaders'
import TableBody from './TableComponents/TableBody'
import TodoAiLoader from '@/Components/MiniComponents/TodoAiLoader'

type ComponentParams = {
	boardId?: string
	todoId?: string
}

interface IBoardsProps {
	title: string
	dataToRenderType: DataToRenderTypeEnum
}

export default function Boards({ title, dataToRenderType }: IBoardsProps) {
	const [dataToRender, setDataToRender] = useState<DataToRender>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const params = useParams<ComponentParams>()
	
	useEffect(() => {
		loadContent()
	}, [params])

	const loadContent = async () => {
		let content: DataToRender = await boardService.getBoards()

		const { boardId, todoId } = params
		
		if (todoId && boardId) {
			const board = content.find((b) => b.id === +boardId)
			const todo = board?.todos.find((t) => t.id === +todoId)
			todo && setDataToRender(todo.subTasks)
		} else if (
			!boardId &&
			!todoId &&
			dataToRenderType == DataToRenderTypeEnum.board
		) {
			setDataToRender(content)
		} else if (boardId && !todoId) {
			const board = content.find((b) => b.id === +boardId)
			board && setDataToRender(board.todos)
		}
	}

	return (
		<section className='boards-page'>
			<TableHeaderTitle headerStr={title} />
			<section className='table-wrapper'>
				<section className='table'>
					<TableHeaders />
					<div style={{ height: 'calc(100% - 60px)' }}>
						{dataToRender.length ? (
							<TableBody
								dataToRender={dataToRender}
								dataToRenderType={dataToRenderType}
							/>
						) : (
							<TodoAiLoader />
						)}
					</div>
				</section>
			</section>

			<section className='actions-wrapper'>
				<div className='apply-status-to-all-wrapper'>
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

				<div className='description'></div>

				{/* {(props.isBoards) && <div>Back to Boards Page</div>} */}
			</section>
		</section>
	)
}

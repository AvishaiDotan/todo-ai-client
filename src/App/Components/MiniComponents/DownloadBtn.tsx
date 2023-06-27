import { BsDownload } from 'react-icons/bs'
import { AiOutlineReload } from 'react-icons/ai'

interface IDownloadBtnProps {
  loading: boolean
  text: string
  onClick: () => void
}

export default function DownloadBtn(props: IDownloadBtnProps) {
  return (
    <button type='button' className='download-btn shadow-lg secondary-font-family' onClick={props.onClick}>
      <span>{props.text}</span>
      {props.loading ? (
        <AiOutlineReload className='inline w-8 h-8 mr-2 animate-spin fill-white-600' />
      ) : (
        <BsDownload />
      )}
    </button>
  )
}

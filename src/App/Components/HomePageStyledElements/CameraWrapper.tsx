interface CameraWrapperProps {
  children: JSX.Element,
  isFromHomePage?: boolean,
  isFlashOn?: boolean,
}

export default function CameraWrapper({ children, isFromHomePage = true, isFlashOn = false }: CameraWrapperProps) {

  return (
    <div className={`camera-wrapper ${isFromHomePage ? "camera" : ""}`}>
        <div className='wrapper-header'>
            <div className={`dot1 ${isFlashOn ? "flash-on" : ""}`}></div>
            <div className="dot2"></div>
            <div className="dot3"></div>
        </div>
        {children}
    </div>
  )
}

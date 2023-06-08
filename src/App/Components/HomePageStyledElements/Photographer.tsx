import photographer from '../../Assets/photographer_women_holding_camera_towards_you.png'

export default function Photographer() {

  return (
    <div className="photographer-wrapper">
        <div className='wrapper-header'>
            <div className="dot1"></div>
            <div className="dot2"></div>
            <div className="dot3"></div>
        </div>
        <img src={photographer}></img>
    </div>
  )
}

import React from 'react'
import Img from '../assets/images/comming.jpg'
import mobile from '../assets/images/mobile.jpg'

const CommingSoon = () => {
    return (
        <div className='text-center' style={{ background: "rgba(0,0,0,0.8)", width: "100%",height:"100vh", position: "fixed", zIndex: "50000000000000000000", left: "50%", top: "1px", transform: "translateX(-50%)", display :"flex",justifyContent :"center" }}>
            <img className='soon' src={Img} style={{ height: "100vh" }} alt="" />
            <img className='mobile-soon' style={{width:"100%"}} src={mobile} alt="" />
        </div>
    )
}

export default CommingSoon
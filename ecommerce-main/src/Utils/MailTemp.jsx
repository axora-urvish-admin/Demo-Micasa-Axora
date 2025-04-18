import React from 'react'
import logo from '../../src/assets/frontimg/logo.png';

const MailTemp = () => {
  return (
    <div className='p-4'>
         <img src={logo} style={{width :"100px"}} alt="" />
         <br/><p className='mt-3' style={{fontSize:"30px"}}>Dear Satyam Satkar,</p>
         <p className='mt-3' style={{fontSize:"25px"}}>Your otp is <b>1245</b></p>
    </div>
  )
}

export default MailTemp
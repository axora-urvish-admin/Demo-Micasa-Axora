import React from 'react'
import { mdiArrowLeftCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useNavigate } from 'react-router-dom';
const CustomHeder = () => {
    const navigate  = useNavigate()
    return (
        <div style={{ padding:"10px 0px", width: "100%",}} onClick={() =>navigate(-1)}>
            <Icon path={mdiArrowLeftCircleOutline} size={2} style={{background : "#fff", color : "#6640B2" ,zIndex : "2",borderRadius : "50%",boxShadow :"1px 1px 10px lightgrey",cursor : "pointer"}} className='back-btn'  />
        </div>
    )
}

export default CustomHeder
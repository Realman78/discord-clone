import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'


function MicButton({localStream}) {
    const [micEnabled, setMicEnabled] = useState(true)
    const handleToggleCamera = ()=>{
      localStream.getAudioTracks()[0].enabled = !micEnabled
        setMicEnabled(!micEnabled)
    }
  return (
    <IconButton onClick={handleToggleCamera} style={{color:'white'}}>
        {micEnabled ? <MicIcon /> : <MicOffIcon />}
    </IconButton>
  )
}

export default MicButton
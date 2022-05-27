import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { styled } from '@mui/system'
import { sendDirectMessage } from '../../../rtc/socketConnection'

const MainContainer = styled('div')({
  height: '60px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const Input = styled('input')({
  backgroundColor: '#2f3136',
  width: '98%',
  height: '44px',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  padding: '0 10px'
})

function NewMessageInput({ chosenChatDetails }) {
  const inputRef = useRef()
  const [message, setMessage] = useState('')
  const handleMessageValueChange = (event) => {
    setMessage(event.target.value)
  }
  const handleKeyPressed = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }
  const handleSendMessage = () => {
    if (message.length > 0) {
      sendDirectMessage({
        receiverId: chosenChatDetails.id,
        content: message
      })
      setMessage('')
    }
  }
  useEffect(()=>{
    inputRef.current.focus()
  }, [inputRef])
  return (
    <MainContainer>
      <Input ref={inputRef} placeholder={`Write a message to ${chosenChatDetails.name}`} value={message} onChange={handleMessageValueChange} onKeyDown={handleKeyPressed} />
    </MainContainer>
  )
}

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat
  }
}

export default connect(mapStoreStateToProps)(NewMessageInput)
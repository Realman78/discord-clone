import React from 'react'
import { styled } from '@mui/material'

const MainContainer = styled('div')({
    flexGrow: 1,
    display: 'flex',
    backgroundColor: "#36393f",
    marginTop: "48px",
})

function Messenger() {
  return (
    <MainContainer></MainContainer>
  )
}

export default Messenger
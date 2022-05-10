import React from 'react'
import { styled } from '@mui/material'
import DropdownMenu from './DropdownMenu'

const MainContainer = styled('div')({
    width: 'calc(100% - 326px)',
    height: '48px',
    borderBottom: '1px solid black',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#36393f",
    position: "absolute",
    right: 0,
    top: 0,
    padding: "0 15px"
})

function AppBar() {
  return (
    <MainContainer>
      <DropdownMenu />
    </MainContainer>
  )
}

export default AppBar
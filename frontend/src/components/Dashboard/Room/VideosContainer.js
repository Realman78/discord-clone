import React from 'react'
import { styled } from '@mui/system'
import { connect } from 'react-redux'
import Video from './Video'
const MainContainer = styled('div')({
  height: '85%',
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap'
})

function VideosContainer({ localStream, remoteStreams, screenSharingStream }) {
  return (
    <MainContainer>
      <Video stream={screenSharingStream ? screenSharingStream : localStream} isLocalStream={true} />
      {remoteStreams.map(rs => <Video key={rs.id} stream={rs} isLocalStream={false} />)}
    </MainContainer>
  )
}

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room
  }
}

export default connect(mapStoreStateToProps)(VideosContainer)
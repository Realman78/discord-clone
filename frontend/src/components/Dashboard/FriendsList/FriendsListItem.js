import { Button, Typography } from '@mui/material'
import React from 'react'
import { chatTypes, getActions } from '../../../store/actions/chatActions'
import Avatar from '../../Avatar'
import OnlineIndicator from './OnlineIndicator'
import {connect} from 'react-redux'

function FriendsListItem({ id, username, isOnline, setChosenChatDetails }) {
    const handleChooseActiveConversation = () => {
        setChosenChatDetails({ id, name: username }, chatTypes.DIRECT)
    }

    return <Button
        onClick={handleChooseActiveConversation}
        style={{
            width: '100%',
            height: '42px',
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            textTransform: 'none',
            color: 'black',
            position: 'relative'
        }}>
        <Avatar username={username} />
        <Typography style={{
            marginLeft: '7px',
            fontWeight: 700,
            color: '#8e9297',
        }} variant='subtitle1' align='left'>
            {username}
        </Typography>
        {isOnline && <OnlineIndicator />}
    </Button>
}

const mapActionsToProps = dispatch =>{
    return {
        ...getActions(dispatch)
    }
}

export default connect(null, mapActionsToProps)(FriendsListItem)
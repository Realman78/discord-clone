import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { DialogTitle, Typography } from '@mui/material'
import InputWithLabel from '../Input'

import React, { useEffect, useState } from 'react'
import { validateMail } from '../../features/utils/validators'
import CustomPrimaryButton from '../CustomPrimaryButton'
import {connect} from 'react-redux'
import {getActions} from '../../store/actions/friendsActions'


function AddFriendDialog({ isDialogOpen, closeDialogHandler, sendFriendInvitation = () => { } }) {
    const [mail, setMail] = useState('')
    const [isFormValid, setIsFormValid] = useState(false)

    const handleSendInvitation = () => {
        sendFriendInvitation({targetMailAddress: mail}, handleCloseDialog)
    }

    const handleCloseDialog = () => {
        closeDialogHandler()
        setMail('')
    }

    useEffect(() => {
        setIsFormValid(validateMail(mail))
    }, [mail, setIsFormValid])
    return (
        <div>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} >
                <DialogTitle >
                    <Typography>
                        Invite a friend
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Enter e-mail address of the friend who you want to invite
                        </Typography>
                    </DialogContentText>
                    <InputWithLabel label='Mail' type='text' value={mail} setValue={setMail} placeholder='Enter e-mail address' />
                </DialogContent>
                <DialogActions>
                    <CustomPrimaryButton onClick={handleSendInvitation} disabled={!isFormValid} label='Send' additionalStyles={{
                        marginLeft: '15px',
                        marginRight: '15px',
                        marginBottom: '10px',
                    }}/>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const mapActionsToProps = dispatch=>{
    return {
        ...getActions(dispatch)
    }
}

export default connect(null, mapActionsToProps)(AddFriendDialog)
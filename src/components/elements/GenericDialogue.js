import React from 'react';
import { Typography, Dialog, DialogTitle, DialogContent } from '@material-ui/core'

const GenericDialogue = ({
  title, open = false, onClose, children, maxWidth = 'md'
}) => {
  if (! open) {
    return <React.Fragment />
  } else {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth={true}
        maxWidth={maxWidth}
      >
        <DialogTitle disableTypography>
          <Typography
            style={{ color: "#293A80", fontWeight: 'bold'}}
            variant='h5'
            align='center'>
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <br />
      </Dialog>
    );
  }
 }

 export default GenericDialogue;
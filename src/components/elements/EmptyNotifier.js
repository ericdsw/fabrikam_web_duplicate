import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const styles = theme => ({
  emptyText: {
    color: grey[500],
    marginTop: theme.spacing(2),
    fontStyle: 'italic'
  }
});

const EmptyNotifier = ({list, message, forceHide = false}) => {

  const classes = makeStyles(styles)();

  if (list.length <= 0 && !forceHide) {
    return (
      <Typography
        align='center'
        className={classes.emptyText}>
        {message}
      </Typography>
    )
  } else {
    return <React.Fragment />
  }
}

export default EmptyNotifier;
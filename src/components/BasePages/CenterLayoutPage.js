import React from 'react';
import { Grid } from '@material-ui/core';

const CenterLayoutPage = ({children, background = null}) => {

  let additionalStyles = {minHeight: '100vh'};
  if (background !== null) {
    additionalStyles['background'] = background;
  }

  return (
    <Grid
      container
      alignItems='center'
      justify='center'
      style={additionalStyles}
    >
      {children}
    </Grid>
  );
}

export default CenterLayoutPage;
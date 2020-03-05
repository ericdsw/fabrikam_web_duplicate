import { createMuiTheme } from '@material-ui/core/styles';
import { indigo, red } from '@material-ui/core/colors';

const baseTheme = (mode = 'light') => createMuiTheme({
  palette: {
    type: mode,
    primary: indigo,
    secondary: red
  }
});

export default baseTheme;
import React from 'react';
import {
    TextField,
    FormControlLabel,
    Switch,
    MenuItem,
    Typography,
    Tooltip
} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function createInput(
  paramName, inputData, value, handleChange,
  disabled = false, extraParams = {}, errorMessage = ''
) {

  let label = inputData.label;
  if (inputData.required) {
    label += '*';
  }

  // Parse values
  if (value === null || typeof(value) === 'undefined') {
    switch (inputData.type) {
      case 'boolean':
        value = inputData.default;
        break;
      case 'number':
        const numberVal = parseFloat(inputData.default);
        if (Number.isNaN(numberVal)) {
            value = '';
        } else {
            value = numberVal;
        }
        break;
      default:
        if (! inputData.default) {
            value = '';
        } else {
            value = inputData.default;
        }
        break;
    }
  }

  let contentValue;

  switch (inputData.type) {

    case 'boolean':
      contentValue = (
        <FormControlLabel style={{width:"100%"}}
          label={label}
          control={
            <Switch
              onChange={e => handleChange(paramName, e.target.checked)}
              checked={value}
              value={value}
              disabled={disabled}
            />
          }
        />
      );
      break;

    case 'dropdown':
      let options = [];
      for (const key in inputData.elements) {
        options.push(
          <MenuItem key={key} value={key}>
            <Typography variant='body1'>
              {inputData.elements[key]}
            </Typography>
          </MenuItem>
        );
      }
      if (value === '') {
        options.unshift(
          <MenuItem key='_EMPTY_VAL_' value=''>
            <Typography variant='body1'>
              <i>---</i>
            </Typography>
          </MenuItem>
        );
      }
      contentValue = (
        <TextField
          label={label}
          id={paramName}
          select
          fullWidth
          value={value}
          onChange={e => handleChange(paramName, e.target.value)}
          disabled={disabled}
          variant='outlined'
          margin='normal'
          {...extraParams}
        >
          {options}
        </TextField>
      );
      break;

    case 'date':
      contentValue = (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='MM/DD/YYYY'
            margin='normal'
            fullWidth
            id={paramName}
            label={label}
            value={value}
            inputVariant='outlined'
            onChange={newDate => handleChange(paramName, newDate)}
            KeyboardInputProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
      );
      break;

    case 'time':
      contentValue = (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardTimePicker
            margin='normal'
            fullWidth
            inputVariant='outlined'
            id={paramName}
            label={label}
            value={value}
            onChange={newDate => handleChange(paramName, newDate)}
            KeyboardInputProps={{
              'aria-label': 'Change Time'
            }}
          />
        </MuiPickersUtilsProvider>
      );
      break;

    case 'number':
    case 'text':
    default:

    if (inputData.type === 'number') {
      extraParams['step'] = '.01';
    }

    if (errorMessage) {
      extraParams['error'] = true
      extraParams['helperText'] = errorMessage
    }

      contentValue = (
        <TextField
          id={paramName}
          label={label}
          placeholder={inputData.placeholder}
          onChange={e => handleChange(paramName, e.target.value)}
          value={value}
          type={inputData.type}
          fullWidth
          variant='outlined'
          margin='normal'
          disabled={disabled}
          {...extraParams}
        />
      );

  }

  if (inputData.tooltip) {
    return (
      <Tooltip title={inputData.tooltip} arrow>
        {contentValue}
      </Tooltip>
    );
  } else {
    return contentValue;
  }
}

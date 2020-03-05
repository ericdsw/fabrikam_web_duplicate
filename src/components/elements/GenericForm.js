import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, CircularProgress } from "@material-ui/core";
import { parseIn, parseOut, createInput, applyRules } from "../../functions";
import { red, grey } from "@material-ui/core/colors";

const style = theme => ({
  cancelButton: {
    fontSize: "18px",
    color: "#BD2429",
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    border: "1px solid #BD2429",
    with: "108px",
    height: "45px"
  },
  submitButton: {
    fontSize: "18px",
    color: "#FFFFFF",
    margin:  theme.spacing(1,4,1,1),
    backgroundColor: "#BD2429",
    borderRadius: "20px",
    boxShadow: "2px 2px 10px",
    with: "108px",
    height: "45px"
  },
  inputStyles:{
    border: "1px solid #D3D3D3",
    boxSizing: "border-box",
    borderRadius: "5px"
  },
  additionalText: {
    color: grey[500]
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: "auto"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

const GenericForm = props => {
  const classes = makeStyles(style)();

  // Parameterses
  const {
    initialDataSet = {},
    schema = {},
    buttonText = "Create",
    disabledInputs = [],
    buttonColor = "primary",
    fullWidthButton = false,
    loading = false,
    cancelButton = false
  } = props;

    // Methods
  const { handleSubmit, handleCancelButtonClick } = props;

  const { parameters, additionalText } = schema;
  
  const [formData, updateFormData] = useState(
    parseIn({ ...initialDataSet }, parameters)

  );
  const [errors, updateErrors] = useState({});

  const handleInputChange = (inputName, newValue) => {
    // Update form data
    const newData = { ...formData };
    newData[inputName] = newValue;
    updateFormData(newData);

    // Update errors
    const newErrors = { ...errors };
    delete newErrors[inputName];

    updateErrors(newErrors);
  };



  const onSubmit = event => {

    event.preventDefault();

    let errors = {};
    for (const formDataKey in schema.parameters) {

      const currentData = schema.parameters[formDataKey];

      // Check for required
      if (currentData.required) {
        if (currentData.type !== "boolean" && !formData[formDataKey]) {
          errors[formDataKey] = "Field is required";
          continue;
        }
      }

      // Check for defined rules
      const rules = schema.parameters[formDataKey].rules;
      if (rules) {
        const checkValue = formData[formDataKey];
        const errorMessage = applyRules(checkValue, rules, formData);
        if (errorMessage !== null) {
          errors[formDataKey] = errorMessage;
        }
      }
    }

    updateErrors(errors);


    if (Object.keys(errors).length === 0) {
      const resultData = parseOut(formData, parameters);
      handleSubmit(resultData);
    }
  };


  return (
    <form

     onSubmit={e => onSubmit(e)}>
      {Object.keys(parameters).map((inputName, index) => (
        <React.Fragment key={inputName}>
          {createInput(
            inputName,
            parameters[inputName],
            formData[inputName],
            handleInputChange,
            disabledInputs.includes(inputName),
            index === 0 ? { autoFocus: true } : {},
            errors[inputName] ? errors[inputName] : ""
          )}
        </React.Fragment>
      ))}
      <br />
      <br />
      {additionalText && (
        <Typography variant="body2" className={classes.additionalText}>
          <i>{additionalText}</i>
        </Typography>
      )}
      <Grid container justify="flex-end">
        <div align="center"
          className={classes.buttonWrapper}
          style={{ width: "100%" , }}
        >
          <Button
            variant="contained"
            className={classes.submitButton}
            type="submit"
            fullWidth={fullWidthButton}
            disabled={loading}
          >
            {buttonText}
          </Button>
          {cancelButton && handleCancelButtonClick && (
            <React.Fragment>
              <Button
                variant="contained"
                className={classes.cancelButton}
                onClick={handleCancelButtonClick}
              >
                Cancelar
              </Button>
              &nbsp;&nbsp;&nbsp;
            </React.Fragment>
          )}

          {loading && (
            <CircularProgress
              size={24}
              className={classes.buttonProgress}
              color="secondary"
            />
          )}
        </div>
      </Grid>
    </form>
  );
};

export default GenericForm;

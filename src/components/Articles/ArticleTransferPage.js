import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Stepper, Step, StepLabel, Typography
} from '@material-ui/core';
import DashboardPage from '../BasePages/DashboardPage';

import { getBranchOffices } from '../../actions/branchOfficeActions';
import { requestArticlesPerBranch, enterArticleToBranchOffice } from '../../actions/articlesActions';

import TargetBranchSelect from './components/TargetBranchSelect';
import SmallArticleSelect from './components/SmallArticleSelect';
import TransferReport from './components/TransferReport';
import FinishPage from './components/FinishPage';

import { session } from '../../network';

const styles = theme => ({
  stepper: {
    background: 'transparent'
  },
});

const ArticleTransferPage = props => {

  useEffect(() => {
    props.getBranchOffices();
  }, []);

  const classes = makeStyles(styles)();

  const [activeStep, setActiveStep] = useState(0);
  const [sourceBranchOffice, updateSourceBranchOffice] = useState(null);
  const [destinationBranchOffice, updateDestinationBranchOffice] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});

  function reset() {
    setActiveStep(0);
    updateSourceBranchOffice(null);
    updateDestinationBranchOffice(null);
    setSelectedItems({});
  }

  const steps = [
    "Sucursal Origen",
    "Catálogos de artículos",
    "Sucursal de Destino",
    "Confirmación de Traslado"
  ]

  function handleNext() {
    setActiveStep(prevStep => prevStep + 1);
  }

  function handleBack() {
    setActiveStep(prevStep => prevStep - 1);
  }

  function handleArticleToggle(article, toggle) {

    const articleId = article.idArticulo;

    const newSelectedItems = {...selectedItems}

    if (toggle) {
      newSelectedItems[articleId] = {
        amount: 1,
        articleData: article
      }
    } else {
      delete newSelectedItems[articleId];
    }

    setSelectedItems(newSelectedItems);
  }

  function handleArticleAmountChange(article, amount) {
    const articleId = article.idArticulo;
    const newSelectedItems = {...selectedItems};
    if (articleId in newSelectedItems) {
      newSelectedItems[articleId] = {
        amount: amount,
        articleData: article
      };
    }
    setSelectedItems(newSelectedItems)
  }

  function handleFinalize() {

    let data = {
      contenido: []
    }

    // Global values
    data["idOrigen"] = sourceBranchOffice.id;
    data["idUsuario"] = session.getUserData().idUsuario;
    data["cTipoMov"] = 3

    // Item values
    Object.keys(selectedItems).forEach(selectedItemId => {
      data.contenido.push({
        "idDestino": destinationBranchOffice.id,
        "cantidad": selectedItems[selectedItemId].amount,
        "idArticulo": selectedItemId
      });
    });

    props.enterArticleToBranchOffice(data);
  }

  const sourceBranchContent = (
    <TargetBranchSelect
      activeStep={activeStep}
      handleNext={() => handleNext()}
      handleBack={() => handleBack()}
      selectionTitle='¿Desde qué sucursal hacer el traslado?'
      branchOfficeList={props.branchOfficeList}
      selectedBranch={sourceBranchOffice}
      handleUpdateBranch={branchData => {
        props.requestArticlesPerBranch(branchData.id);
        updateSourceBranchOffice(branchData);
        setSelectedItems({});
      }}
    />
  );

  const articleSelectContent = (
    <SmallArticleSelect
      reduced={true}
      activeStep={activeStep}
      handleNext={() => handleNext()}
      handleBack={() => handleBack()}
      selectedItems={selectedItems}
      articleList={props.articlesPerBranch}
      handleCheckbox={(data, checked) => handleArticleToggle(data, checked)}
      handleAmountChange={(data, value) => handleArticleAmountChange(data, value)}
    />
  );

  const destinationBranchContent = (
    <TargetBranchSelect
      activeStep={activeStep}
      handleNext={() => handleNext()}
      handleBack={() => handleBack()}
      selectionTitle='¿Hacia cuál sucursal desea hacer el traslado?'
      branchOfficeList={props.branchOfficeList}
      selectedBranch={destinationBranchOffice}
      handleUpdateBranch={branchData => updateDestinationBranchOffice(branchData)}
    />
  );

  const reportContent = (
    <TransferReport
      activeStep={activeStep}
      handleNext={() => {
        handleFinalize()
        handleNext()
      }}
      handleBack={() => handleBack()}
      nextButtonText='Transferir'
      selectedItems={selectedItems}
      sourceBranch={sourceBranchOffice}
      destinationBranch={destinationBranchOffice}
    />
  );

  let currentContent = sourceBranchContent;
  switch(activeStep) {
    case 0:
      currentContent = sourceBranchContent;
      break;
    case 1:
      currentContent = articleSelectContent;
      break;
    case 2:
      currentContent = destinationBranchContent;
      break;
    case 3:
      currentContent = reportContent;
      break;
  }

  return (
    <DashboardPage>
      <Typography variant='h5'>
        <b>Artículos</b> / Traslados
      </Typography>
      <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
        {steps.map(stepLabel => (
          <Step key={stepLabel}>
            <StepLabel>{stepLabel}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <FinishPage
            loadingMessage='Trasladando Artículos...'
            loading={props.requesting}
            finishMessage='Artículo trasladado'
            buttonMessage='Trasladar otro artículo'
            handleButtonClick={() => {
              reset();
            }}
          />
          ) : (currentContent)
        }
      </div>
    </DashboardPage>
  )
}

const mapStateToProps = state => ({
  branchOfficeList: state.branches.branchList,
  articlesPerBranch: state.articles.articlesPerBranch,
  requesting: state.articles.requestingEnterItemToBranch
});
export default connect(mapStateToProps, {
  getBranchOffices, requestArticlesPerBranch, enterArticleToBranchOffice
})(ArticleTransferPage);
import React from 'react';
import i18n from 'i18next';
import PropTypes from 'prop-types';

function LegalContent(props) {
	const pdfUrl = process.env.PUBLIC_URL + "/legal-content/" + props.filename;
	window.location.replace(pdfUrl);
  return (<div />);
}

LegalContent.propTypes = {
  filename: PropTypes.string.isRequired,
};

function TermsOfUse() {
  return (
    <LegalContent filename={ i18n.t('legalContent.termsOfUse') } />
  );
}

function PrivacyNotice() {
  return (
    <LegalContent filename={ i18n.t('legalContent.privacyNotice') } />
  );
}


export default LegalContent;
export { TermsOfUse, PrivacyNotice } ;

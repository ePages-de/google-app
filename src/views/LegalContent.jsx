import i18n from 'i18next';

function LegalContent(props) {
	if (props.filename) {
		const pdfUrl = process.env.PUBLIC_URL + "/legal-content/" + props.filename;
		window.location.replace(pdfUrl);
    return (<div />);
	} else {
		return (<div><h1>404 Not Found</h1></div>);
	}
}

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

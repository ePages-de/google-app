function LegalContent(props) {
	if (props.filename) {
		const pdfUrl = process.env.PUBLIC_URL + "/legal-content/" + props.filename;
		window.location.replace(pdfUrl);
	} else {
		return (<div><h1>404 Not Found</h1></div>);
	}
}

export default LegalContent;

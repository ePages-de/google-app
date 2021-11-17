import React from 'react';
import i18n from 'i18next';

function Footer() {
  return (
    <footer className="bg-black text-center py-5">
      <div className="container px-5">
          <div className="text-white-50 small">
              <div className="mb-2">{ i18n.t('views.homepage.legal.copyrightNotice.label') }</div>
              <a href={ i18n.t('views.homepage.legal.imprintLink.label') }>{ i18n.t('views.homepage.legal.imprint.label') }</a>
          </div>
      </div>
    </footer>
	);
}

export default Footer;

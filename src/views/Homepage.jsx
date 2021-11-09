import './styles.css';
import './tiles.css';
import './custom.css';
import i18n from 'i18next';


function Homepage() {
  
  return (
    <div className="App">
    
    <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
        <div className="container px-5">
            TODO: ePages logo...
          
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i className="bi-list"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
                    <li className="nav-item">
                      <a className="nav-link me-lg-3" href="#features">
                        { i18n.t('views.homepage.navbar.features.label') }
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link me-lg-3" href="#concept">
                        { i18n.t('views.homepage.navbar.concept.label') }
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link me-lg-3" href="#legal">
                        { i18n.t('views.homepage.navbar.legal.label') }
                      </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
    <header className="masthead">
        <div className="container px-5">
            <div className="row gx-5 align-items-center">
              <div className="col-lg-12">
                  
                  <div className="mb-7 mb-lg-0 text-center text-lg-start">
                      <h1 className="display-4 lh-4 mb-6">Google Smart Shopping App</h1>
                      <p className="lead fw-normal text-muted mb-5">
                        { i18n.t('views.homepage.tagline.label') }
                      </p>
                  </div>
              </div>

            </div>
        </div>
    </header>
    
    <aside className="text-center bg-gradient-primary-to-secondary">
        <div className="container px-5">
            <div className="row gx-5 justify-content-center">
                <div className="col-xl-12">
                  <div className="container-fluid p-0">
                    <div className="row no-gutters popup-gallery">
                      <div className="col-lg-4 col-sm-2">
                        TODO: Screenshot
                      </div>
                      <div className="col-lg-4 col-sm-2">
                        TODO: Screenshot
                      </div>
                      <div className="col-lg-4 col-sm-2">
                        TODO: Screenshot
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </aside>
    
    
    <section id="features">
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
              <div className="col-lg-12 order-lg-1 mb-5 mb-lg-0">
                  <div className="container-fluid px-5">
                      <div className="row gx-5">
                          <div className="col-md-4 mb-5">
                              
                              <div className="text-center">
                                  <i className="bi bi-check2-square icon-feature text-gradient d-block mb-3"></i>
                                  <h3 className="font-alt">
                                    { i18n.t('views.homepage.feature1.heading.label') }
                                  </h3>
                                  <p className="text-muted mb-0">
                                    { i18n.t('views.homepage.feature1.description.label') }
                                  </p>
                              </div>
                          </div>
                          <div className="col-md-4 mb-5">
                              
                              <div className="text-center">
                                  <i className="bi bi-check2-square icon-feature text-gradient d-block mb-3"></i>
                                  <h3 className="font-alt">
                                    { i18n.t('views.homepage.feature2.heading.label') }
                                  </h3>
                                  <p className="text-muted mb-0">
                                    { i18n.t('views.homepage.feature2.description.label') }
                                  </p>
                              </div>
                          </div>

                          <div className="col-md-4 mb-5">
                              
                              <div className="text-center">
                                  <i className="bi bi-check2-square icon-feature text-gradient d-block mb-3"></i>
                                  <h3 className="font-alt">
                                    { i18n.t('views.homepage.feature3.heading.label') }
                                  </h3>
                                  <p className="text-muted mb-0">
                                    { i18n.t('views.homepage.feature3.description.label') }
                                  </p>
                              </div>
                          </div>

                      </div>
                      <div className="row gx-5">
                          <div className="col-md-4 mb-5">
                              
                              <div className="text-center">
                                  <i className="bi bi-check2-square icon-feature text-gradient d-block mb-3"></i>
                                  <h3 className="font-alt">
                                    { i18n.t('views.homepage.feature4.heading.label') }
                                  </h3>
                                  <p className="text-muted mb-0">
                                    { i18n.t('views.homepage.feature4.description.label') }
                                  </p>
                              </div>
                          </div>
                          <div className="col-md-4 mb-5">
                              
                              <div className="text-center">
                                  <i className="bi bi-check2-square icon-feature text-gradient d-block mb-3"></i>
                                  <h3 className="font-alt">
                                    { i18n.t('views.homepage.feature5.heading.label') }
                                  </h3>
                                  <p className="text-muted mb-0">
                                    { i18n.t('views.homepage.feature5.description.label') }
                                  </p>
                              </div>
                          </div>
                          <div className="col-md-4 mb-5">
                              
                              <div className="text-center">
                                  <i className="bi bi-check2-square icon-feature text-gradient d-block mb-3"></i>
                                  <h3 className="font-alt">
                                    { i18n.t('views.homepage.feature6.heading.label') }
                                  </h3>
                                  <p className="text-muted mb-0">
                                    { i18n.t('views.homepage.feature6.description.label') }
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-lg-4 order-lg-0">
                  
                  <div className="features-device-mockup">
                      
                  </div>
              </div>
          </div>
        </div>
    </section>
    
    
    <section id="concept" className="bg-light">
        <div className="container px-5">
          <div className="row gx-5 align-items-center justify-content-center justify-content-lg-between">
            
              <div className="col-12 col-lg-5">
                  <h2 className="display-4 lh-1 mb-4">
                    { i18n.t('views.homepage.concept.heading.label') }
                  </h2>
                  <p className="lead fw-normal text-muted mb-5 mb-lg-0">
                    { i18n.t('views.homepage.concept.description.label') }
                  </p>
              </div>
              <div className="col-sm-8 col-md-6">
                  TODO: Concept image
              </div>
              
          </div>

        </div>
    </section>
    
    
    <section id="legal">
      <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="cta-content">

              <div className="mb-7 mb-lg-0 text-center text-lg-start">
                  <h2 className="display-4 lh-4 mb-6">
                    { i18n.t('views.homepage.legal.heading.label') }
                  </h2>

                  <div className="row">
                    <div className="col-sm-6">
                      
                        <a href="#">
                          <div className="tile blue">
                            <h3 className="title"><i className="bi bi-file-text"></i>
                              { i18n.t('views.homepage.legal.privacyNotice.label') }
                            </h3>
                            { i18n.t('views.homepage.legal.downloadHint.label') }
                          </div>
                        </a>					
                    </div>
                    <div className="col-sm-6">
                        <a href="#">
                          <div className="tile blue">
                              <h3 className="title"><i className="bi bi-file-text"></i>
                                { i18n.t('views.homepage.legal.termsOfUse.label') }
                              </h3>
                              { i18n.t('views.homepage.legal.downloadHint.label') }
                          </div>
                        </a>
                    </div>  
                  </div>

              </div>


            </div>
          </div>
      </div>
        
    </section>
    
    <footer className="bg-black text-center py-5">
      <div className="container px-5">
          <div className="text-white-50 small">
              <div className="mb-2">{ i18n.t('views.homepage.legal.copyrightNotice.label') }</div>
              <a href={ i18n.t('views.homepage.legal.imprintLink.label') }>{ i18n.t('views.homepage.legal.imprint.label') }</a>
          </div>
      </div>
    </footer>
    
    </div>
  );
}

export default Homepage;

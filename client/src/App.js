import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import { Link } from 'react-scroll';
import Headroom from 'react-headroom';
import Recaptcha from 'react-recaptcha';
import { withAlert } from 'react-alert';

import { projects } from './data';

import cciLogo from './img/cci-logo.png';
import dataxplorerLogo from './img/dataxplorer-logo.png';
import githubLogo from './img/icons/github-icon.svg';
import iutLogo from './img/iut-logo.jpeg';
import nijiLogo from './img/niji-logo.png';
import npmLogo from './img/icons/npm-icon.svg';
import pdfLogo from './img/pdf-logo.png';
import renePerrinLogo from './img/lycee-rene-perrin-logo.png';
import scalairLogo from './img/scalair-logo.png';
import stackOverflowLogo from './img/icons/stackoverflow-icon.svg';
import stackshareLogo from './img/icons/stackshare-icon.svg';
import timetLogo from './img/timet-logo.png';

import './App.css';
import './timeline.css';

const reCaptchaSitekey = '6LfcRDYUAAAAAE96MzPjUwFcAvs06fTnGWiC4Vp7';

let captcha;

class App extends Component {
  constructor(props) {
    super(props);
    this.captchaLoaded = this.captchaLoaded.bind(this);
    this.captchaExpired = this.captchaExpired.bind(this);
    this.captchaVerified = this.captchaVerified.bind(this);
    this.submitEmail = this.submitEmail.bind(this);

    this.state = {
      captchaLoaded: false,
      captchaExpired: false,
      captchaVerified: false,
      captchaToken: null,
      contactName: null,
      contactEmail: null,
      contactContent: null,
      contactFormMessage: null
    };
  }

  showError = (msg) => {
    this.props.alert.show(msg, {
      timeout: 20000,
      type: 'error'
    });
  }

  captchaLoaded() {
    this.setState({
      captchaLoaded: true
    });
  }
  captchaExpired() {
    this.setState({
      captchaExpired: true,
      captchaToken: null
    });
  }
  captchaVerified(token) {
    this.setState({
      captchaVerified: true,
      captchaExpired: false,
      captchaToken: token
    });
  }
  resetRecaptcha() {
    if (captcha) {
      captcha.reset();
    }
    this.setState({
      captchaVerified: false,
      captchaExpired: false,
      captchaToken: null
    });
  };

  async submitEmail() {
    const {
      contactName,
      contactEmail,
      contactContent,
      captchaToken
    } = this.state;
    if (!contactName || contactName === '' || !contactEmail || contactEmail === '' || !contactContent || contactContent === '' || !captchaToken) {
      this.showError('Please fill in all the fields.');
      return;
    }
    try {
      const response = await axios.post('/api/email', {
        name: contactName,
        email: contactEmail,
        content: contactContent,
        'g-recaptcha-response': captchaToken
      });
      const { message } = response.data;
      this.setState({
        contactFormMessage: message
      });
    } catch(err) {
      let message = err.message
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message
      }
      console.error(message);
      this.showError(message);
      this.resetRecaptcha();
      return;
    }
  }

  render() {
    const birthday = new Date(1995, 1, 24); // Hardcoded birthday date \o/
    const age = moment().diff(birthday, 'years', false);

    const {
      captchaLoaded,
      captchaExpired,
      captchaVerified,
      contactFormMessage
    } = this.state;
    const contactButtonReady = captchaLoaded && !captchaExpired && captchaVerified;

    return (
      <div className="App">
        <Headroom style={{ zIndex: 200, backgroundColor: '#222' }}>
          <nav className="App-nav">
            <ul className="App-nav__list">
              <li className="App-nav__link">
                <Link activeClass="App-nav__link--active" to="curriculum" spy={true} smooth={true} offset={-60} duration={500} onSetActive={this.handleSetActive}>
                  My career
                </Link>
              </li>
              <li className="App-nav__link">
                <Link activeClass="App-nav__link--active" to="projects" spy={true} smooth={true} offset={-60} duration={500} onSetActive={this.handleSetActive}>
                  My projects
                </Link>
              </li>
              <li className="App-nav__link">
                <Link activeClass="App-nav__link--active" to="stack" spy={true} smooth={true} offset={-60} duration={500} onSetActive={this.handleSetActive}>
                My tools
                </Link>
              </li>
              <li className="App-nav__link">
                <Link activeClass="App-nav__link--active" to="contact" spy={true} smooth={true} offset={-60} duration={500} onSetActive={this.handleSetActive}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </Headroom>

        <header className="App-header App-section">
          <div className="container">
            <div id="description" className="row">
              <div className="col-sm-12 col-md-3 col-lg-3">
                <div className="LI-profile-badge" data-version="v1" data-size="medium" data-locale="fr_FR" data-type="vertical" data-theme="dark" data-vanity="nicolascoutin">
                  <a className="LI-simple-link" href='https://fr.linkedin.com/in/nicolascoutin?trk=profile-badge'>Nicolas Coutin</a>
                </div>
              </div>
              <div className="App-description col-sm-12 col-md-9 col-lg-9">
                <div>
                  <p>
                    My name is Nicolas, and I'm {age}.
                  </p>
                  <p>
                    I'm a full stack developer. I mainly use Node.js and Vue, and formerly used React, PHP & jQuery.<br/>
                    Modernity is a special interest of mine, so I keep myself updated by attending multiple public events like meetups or conferences. My current whim is cloud architectures and distributed systems.<br/>
                    My ultimate goal is to keep aiming for better skills and continuously improve.
                  </p>
                  <p>
                    I'm also interested by the DevOps philosophy, that I practice on Terraform, Ansible & Kubernetes.<br/>
                    I consider myself a Jack of all trades, as I often develop interests in areas close to mine and I like expanding my confort zone. I accept responsibilities and all challenges.
                  </p>
                  <p>I aspire to be a solution architect some day.</p>
                  <div className="text-right">
                    <small>
                      <i>"Javascript enthusiast pushing buttons for a living."</i>
                    </small>
                  </div>
                </div>
              </div>
              <div id="curriculum-vitae-download" className="col-sm-3 col-md-3 col-lg-3">
                <a href="/pdf/cv.pdf">
                  <img src={pdfLogo} alt="My curriculum Vitae" />
                </a>
              </div>
              <div id="social-buttons" className="col-sm-6 col-md-6 col-lg-6">
                <a href="https://github.com/Ilshidur" target="_blank" rel="noopener noreferrer" className="App-social-icon">
                  <img src={githubLogo} alt="GitHub" className="App-social-icon__image App-social-icon__image--GitHub" />
                </a>
                <a href="https://stackshare.io/Ilshidur/personal-stack" target="_blank" rel="noopener noreferrer" className="App-social-icon">
                  <img src={stackshareLogo} alt="Stackshare" className="App-social-icon__image App-social-icon__image--Stackshare" />
                </a>
                <a href="https://www.npmjs.com/~ilshidur" target="_blank" rel="noopener noreferrer" className="App-social-icon">
                  <img src={npmLogo} alt="npm" className="App-social-icon__image App-social-icon__image--Npm" />
                </a>
                <a href="https://stackoverflow.com/story/nicolas-coutin" target="_blank" rel="noopener noreferrer" className="App-social-icon">
                  <img src={stackOverflowLogo} alt="StackOverflow" className="App-social-icon__image App-social-icon__image--StackOverflow" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <div id="curriculum" className="App-section">
          <div className="container">
            <div className="page-header">
              <h1 id="timeline">My career</h1>
            </div>
            <ul className="timeline">
              <li>
                <div className="timeline-badge info"><i className="glyphicon glyphicon-briefcase"></i></div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4 className="timeline-title">Research & development engineer</h4>
                    <p><i>Permanent position</i> (59510, Hem)</p>
                    <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i> Since October 2018</small></p>
                  </div>
                  <div className="timeline-body">
                    <p className="row">
                      <a href="https://www.scalair.fr" target="_blank" rel="noopener noreferrer" className="col-md-8 col-md-offset-2">
                        <img src={scalairLogo} alt="Scalair" className="App-company-logo img-responsive" />
                      </a>
                    </p>
                    <ul>
                      <li>Rework of <a href="https://status.scalair.fr" target="_blank" rel="noopener noreferrer">status.scalair.fr</a></li>
                      <li>Rework of <a href="https://dashboard.scalair.fr" target="_blank" rel="noopener noreferrer">dashboard.scalair.fr</a> and <a href="https://manager.scalair.fr" target="_blank" rel="noopener noreferrer">manager.scalair.fr</a> : services</li>
                      <li>Setup of <a href="https://konghq.com" target="_blank" rel="noopener noreferrer">Kong</a> & custom plugins, microservices</li>
                      <li>Services monitoring with <a href="https://prometheus.io">Prometheus</a> + <a href="https://grafana.com">Grafana</a></li>
                      <li>Gitlab CI/CD, Kubernetes deployments</li>
                      <li>REST APIs : authentication/permissions, VMs monitoring/configuration, carts, file explorer, newsletters...</li>
                      <li>Internal tools</li>
                    </ul>
                    <div className="App-company-stack">
                      <p>Node.js, Lua, MongoDB, Redis, Mercure, Prometheus, Grafana, Docker, Kubernetes - Vue</p>
                    </div>
                  </div>
                </div>
              </li>
              <li className="timeline-inverted">
                <div className="timeline-badge primary"><i className="glyphicon glyphicon-briefcase"></i></div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4 className="timeline-title">Research engineer</h4>
                    <p><i>Permanent position</i> (59000, Lille)</p>
                    <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i> January 2018 - October 2018</small></p>
                  </div>
                  <div className="timeline-body">
                    <p className="row">
                      <a href="https://www.niji.fr" target="_blank" rel="noopener noreferrer" className="col-md-4 col-md-offset-4">
                        <img src={nijiLogo} alt="Niji" className="App-company-logo img-responsive" />
                      </a>
                    </p>
                    <ul>
                      <li>Set up of an advertising management & delivery system for <a href="https://www.cotep.fr" target="_blank" rel="noopener noreferrer">Cotep</a></li>
                      <li>Front end reworking for <a href="https://www.cmacgm-group.com" target="_blank" rel="noopener noreferrer">CMA CGM</a></li>
                      <li>Fixes on some Vue integrations</li>
                    </ul>
                    <div className="App-company-stack">
                      <p>Node.js, ES8, MongoDB, Redis, Docker, Traefik, nginx - React, Vue, jQuery, gulp</p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="timeline-badge warning"><i className="glyphicon glyphicon-briefcase"></i></div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4 className="timeline-title">Développeur front end</h4>
                    <p><i>Permanent position</i> (59200, Tourcoing)</p>
                    <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i> November 2016 - January 2018</small></p>
                  </div>
                  <div className="timeline-body">
                    <p>
                      <a href="https://dataxplorer.fr" target="_blank" rel="noopener noreferrer">
                        <img src={dataxplorerLogo} alt="DataXplorer" className="App-company-logo img-responsive" />
                      </a>
                    </p>
                    <ul>
                      <li>Maintenance & running of <a href="https://www.rapid-flyer.com" target="_blank" rel="noopener noreferrer">Rapid Flyer</a> (3 mois)</li>
                      <li>Front end development of analytics & data mining user interfaces ("Data Management Platforms")</li>
                      <li>Web designs integrations</li>
                      <li>Front end development of <a href="https://espacefidelite.pizzapai.fr" target="_blank" rel="noopener noreferrer">Pizza Paï - Fidélité</a> (2 mois)</li>
                    </ul>
                    <div className="App-company-stack">
                      <p>PHP, Symfony 3, Memcached, MySQL, MongoDB<br/>SCSS + Bootstrap/Materialize, ES6, jQuery, Babel, Grunt</p>
                    </div>
                  </div>
                </div>
              </li>
              <li className="timeline-inverted">
                <div className="timeline-badge success"><i className="glyphicon glyphicon-briefcase"></i></div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4 className="timeline-title">Analyste développeur</h4>
                    <p><i>Stage + alternance + CDD</i> (73400, Ugine)</p>
                    <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i> Avril 2014 - Décembre 2015</small></p>
                  </div>
                  <div className="timeline-body">
                    <p>
                      <a href="http://www.timet.com" target="_blank" rel="noopener noreferrer">
                        <img src={timetLogo} alt="TIMET Savoie" className="App-company-logo img-responsive" />
                      </a>
                    </p>
                    <ul>
                      <li>Développement d'un logiciel d'aide à l'optimisation/déçision (4 mois)</li>
                      <li>Développement d'un <i>Manufacturing Execution System</i> (+ d'1 an)</li>
                    </ul>
                    <div className="App-company-stack">
                      <p>VB .NET, MSSQL, WinForms</p>
                    </div>
                    <p>Stage de 2 mois, apprentissage de 1 an puis CDD de 6 mois</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="timeline-badge danger"><i className="glyphicon glyphicon-education"></i></div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4 className="timeline-title">License Pro. <i>DIM</i></h4>
                    <p><i>Bac +3</i> (74000, Annecy)</p>
                    <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i> Septembre 2014 - Juin 2015</small></p>
                  </div>
                  <div className="timeline-body">
                    <a href="http://www.formation-cci.fr/formations-diplomantes-en-alternance/nos-formations-en-alternance/digital/4-licence-professionnelle-developpeur-informatique-multisupports-dim" target="_blank" rel="noopener noreferrer">
                      <img src={cciLogo} alt="CCI Formation Multimédia" className="App-company-logo img-responsive" />
                    </a>
                    <p>
                      Licence professionnelle <i>Développeur Informatique Multisupports</i>
                    </p>
                    <ul>
                      <li>Alternance d'une année chez TIMET Savoie</li>
                      <li>Programmation Web et mobile : Java, C, Javascript + Node.js, HTML5, CSS3, PHP + Symfony, MySQL, Postgres...</li>
                      <li>Algorithmie, UML, bases de données, sécurité</li>
                      <li>Communication, gestion de projets</li>
                      <li>Anglais</li>
                      <li>Projet collectif de fin d'année</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="timeline-inverted">
              <div className="timeline-badge info"><i className="glyphicon glyphicon-education"></i></div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4 className="timeline-title">DUT Informatique</h4>
                    <p><i>Bac +2</i> (74940, Annecy-le-Vieux / Université de Savoie)</p>
                    <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i> Septembre 2012 - Mars 2014</small></p>
                  </div>
                  <div className="timeline-body">
                    <a href="https://www.iut-acy.univ-smb.fr/departement_info/le_departement_info" target="_blank" rel="noopener noreferrer">
                      <img src={iutLogo} alt="IUT Annecy" className="App-company-logo img-responsive" />
                    </a>
                    <ul>
                      <li>Algorithmie, programmation, réseaux</li>
                      <li>Bases de données, sécurité</li>
                      <li>Communication, gestion de projets</li>
                      <li>Mathématiques, anglais</li>
                      <li>Projet tutoré</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div className="timeline-badge warning"><i className="glyphicon glyphicon-education"></i></div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4 className="timeline-title">Bac. STI Génie Électronique</h4>
                    <p>(73400, Ugine)</p>
                    <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i> Septembre 2009 - Juin 2012</small></p>
                  </div>
                  <div className="timeline-body">
                    <a href="http://rene-perrin.elycee.rhonealpes.fr" target="_blank" rel="noopener noreferrer">
                      <img src={renePerrinLogo} alt="Lycée René Perrin" className="App-company-logo img-responsive" />
                    </a>
                    <ul>
                      <li>Programmation C, Basic</li>
                      <li>Architecture matérielle, électronique, mécanique</li>
                      <li>Mathématiques, anglais</li>
                    </ul>
                    <span className="text-center">
                      Mention Bien.
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div id="projects" className="App-section">
          <h1>My projects</h1>
          <div className="App-projects row">
            {projects.filter(project => project.show).map((project, index) =>
              <div key={index} className="App-project col-xs-12 col-sm-6 col-md-4 col-lg-4">
                <img className="App-project__preview img-responsive" src={project.img} alt={project.name} />
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="App-project__link" >
                  <div className="App-project__box">
                    <h2 className="App-project__name">{project.name}</h2>
                    <p>{project.summary}</p>
                    <i className="fa fa-plus-circle"></i>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>

        <div id="stack" className="App-section">
          <h1>My everyday tools</h1>
          <div className="container">
            <div className="App-stack">
              <a frameBorder="0" data-theme="dark" data-stack-embed="true" data-layers="1,2,3,4" href="https://embed.stackshare.io/stacks/embed/654e809fa0b6235b129efd854398a8">My stack</a>
            </div>
          </div>
        </div>

        <div id="contact" className="App-section">
          <div className="container">
            <h1>Contact</h1>
            <div className="App-contact__form row">
              {!contactFormMessage
                ? (
                <div>
                  <div className="col-md-6">
                    <input
                      className="App-contact__field form-control"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required=""
                      ref={el => this.contactName = el}
                      onChange={e => this.setState({ contactName: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="App-contact__field form-control"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      required=""
                      onChange={e => this.setState({ contactEmail: e.target.value })}
                    />
                  </div>
                  <div className="col-md-12">
                    <textarea
                      className="App-contact__field form-control"
                      name="message"
                      placeholder="Your message"
                      onChange={e => this.setState({ contactContent: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="col-md-12" style={{ marginBottom: '20px' }}>
                    <Recaptcha
                      sitekey={reCaptchaSitekey}
                      render="explicit"
                      verifyCallback={this.captchaVerified}
                      onloadCallback={this.captchaLoaded}
                      expiredCallback={this.captchaExpired}
                      theme="dark"
                    />
                  </div>
                  <div className="col-md-12 form-actions">
                    <button
                      className={'btn btn-large btn-default ' + (!contactButtonReady ? 'disabled' : '') }
                      type="submit"
                      disabled={!contactButtonReady}
                      onClick={this.submitEmail}
                    >
                      Send an email
                    </button>
                    {captchaExpired
                      ? <p className="text-center">The captcha expired.</p>
                      : null
                    }
                  </div>
                </div>
                ) : (
                <p className="text-center">
                  {contactFormMessage}
                </p>
              )
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(App);

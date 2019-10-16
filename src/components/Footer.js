import React from 'react'
import { Link } from 'gatsby'

import linkedin from '../img/social/linkedin.svg'
import twitter from '../img/social/twitter.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-text-white-ter">
        <div className="content has-text-centered  has-text-white-ter">
          <div className="container has-text-white-ter">
            <div className="columns">
              <div className="column is-4">
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="navbar-item">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/offer">
                        Notre Offre
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/contact/startup">
                        Déposer un dossier
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4">
                <section>
                  <ul className="menu-list">
                    <li>
                      <Link className="navbar-item" to="/blog">
                        Actualités
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/partners">
                        Les partners
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/contact">
                        Nous rejoindre
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4 social">
                <a title="linkedin" href="https://linkedin.com">
                  <img
                    src={linkedin}
                    alt="linkedin"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="twitter" href="https://twitter.com">
                  <img
                    className="fas fa-lg"
                    src={twitter}
                    alt="Twitter"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer

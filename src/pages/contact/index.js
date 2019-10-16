import React from 'react'
import Link from 'gatsby-link'
import Layout from '../../components/Layout'

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <section className="section section--gradient">
          <div className="container">
            <div className="column is-10 is-offset-1 content">
              <h1 className="title is-size-3 has-text-weight-bold is-bold-light">
                Contacter CTO Parners
              </h1>
              <p>
                Si vous êtes une startup ou êtes porteur d'un projet, vous pouvez nous déposez vos coordonnées ainsi
                qu'un deck de présentation. Si vous souhaitez nous rejoindre ou prendre contact avec la direction de notre fond,
                 veuillez utiliser le formulaire de contact
              </p>
              <div className="columns">
                <div className="column">
                  <Link to="/contact/partner/" className="btn">Je veux devenir Partner !</Link>
                </div>
                <div className="column">
                  <Link to="/contact/startup/" className="btn">Je souhaite déposer un dossier</Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

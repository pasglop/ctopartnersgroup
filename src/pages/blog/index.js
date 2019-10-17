import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'
import {graphql, StaticQuery} from "gatsby";
import BackgroundImage from "gatsby-background-image";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
          <StaticQuery
              query={graphql`
      query {
        desktop: file(relativePath: { eq: "kelly-sikkema-qaFKsIMv01Y-unsplash.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
              render={data => {
                  // Set ImageData.
                  const imageData = data.desktop.childImageSharp.fluid
                  return (
                      <BackgroundImage
                          Tag="section"
                          className="hero is-large"
                          fluid={imageData}
                      >
                          <div className="hero-body">
                              <div className="container tile">
                                  <h1
                                      className="tile-item is-vertical has-text-weight-bold is-size-1"
                                      style={{
                                          backgroundColor: 'rgba(28,28,28,0.54)',
                                          color: 'white',
                                          padding: '1rem',
                                      }}
                                  >
                                      Actualités
                                  </h1>
                              </div>
                          </div>
                      </BackgroundImage>
                  )
              }}
          />
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

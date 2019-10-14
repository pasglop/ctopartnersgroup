import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Img from "gatsby-image";

import Layout from '../components/Layout';
import BlogRoll from '../components/BlogRoll';

export const IndexPageTemplate = ({
  heroimg,
  heroheading,
  herosubheading,
  mainpitch
}) => (
  <div>
    <section
      className="hero is-fullheight-with-navbar"
      style={{
        backgroundImage: `url(${
            !!heroimg.childImageSharp ? heroimg.childImageSharp.fluid.src : heroimg
        })`,
        backgroundPosition: `top left`,
      }}
    >
      <div className="container hero-bodyr">
          <div className="tile box is-vertical is-3" style={{ backgroundColor: 'rgba(28,28,28,0.54)', marginTop: '15%',  marginLeft: '75%' }}>
                  <h1 className="title has-text-white is-size-2 is-spaced">
                      {heroheading}
                  </h1>
                  <h2 className="subtitle has-text-white is-size-4 has-text-weight-light">
                      {herosubheading}
                      <Link to="/contact" className="hero-buttons button has-text-white is-primary is-medium" >Déposez votre dossier</Link>
                  </h2>
          </div>
      </div>
    </section>
    <section className="section section-gradient" style={{ backgroundColor: 'rgb(46,163,242)' }}>
      <div className="container" >
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
                <ul class="tile">
                {mainpitch.arguments.map( ( pitchItem, i ) => {
                    return  <li key={i} className="tile">
                        <div className="card">
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-left">
                                        <picture className="image is-64x64 has-text-white">
                                            <Img className="" fixed={pitchItem.iconarg.childImageSharp.fixed} alt=""  />
                                        </picture>
                                    </div>
                                    <div className="media-content">
                                        <p className="title is-4"><ReactMarkdown source={pitchItem.textarg} /></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </li>;
                })}
                </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className="container" >
        <div className="section">
      <div className="columns">
        <div className="column is-6 has-text-centered">
          <Link className="btn" to="/offer">
            L'offre CTO Partners Group
          </Link>
        </div>
          <div className="column is-6 has-text-centered">
              <Link className="btn" to="/offer">
                  Devenir Partner
              </Link>
          </div>
      </div>
      <div className="column is-12">
        <h3 className="has-text-weight-semibold is-size-2">
          Actualités
        </h3>
        <BlogRoll />
        <div className="column is-12 has-text-centered">
          <Link className="btn" to="/blog">
            Read more
          </Link>
        </div>
      </div>
        </div>
      </div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
    heroimg: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heroheading: PropTypes.string,
  herosubheading: PropTypes.string,
  mainpitch: PropTypes.object,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
          heroimg={frontmatter.heroimg}
          heroheading={frontmatter.heroheading}
          herosubheading={frontmatter.herosubheading}
        mainpitch={frontmatter.mainpitch}
      />
    </Layout>
  )
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        heroimg {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heroheading
        herosubheading
        mainpitch {
          title
          arguments {
            iconarg {
                childImageSharp {
                    fixed(width: 64, quality: 100) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
            textarg
          }
        }
      }
    }
  }
`;

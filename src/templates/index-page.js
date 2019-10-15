import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import BackgroundImage from 'gatsby-background-image';

import Layout from '../components/Layout';
import BlogRoll from '../components/BlogRoll';

export const IndexPageTemplate = ({
  heroimg,
  heroheading,
  herosubheading,
  mainpitch
}) => (
  <div>
      <BackgroundImage
          Tag="section"
          className="hero is-fullheight-with-navbar"
          fluid={heroimg.childImageSharp.fluid}
          backgroundColor={`#2ea3f2`}
      >
      <div className="container hero-body">
          <div className="tile box is-vertical is-3" style={{ backgroundColor: 'rgba(28,28,28,0.54)' }}>
                  <h1 className="title has-text-white is-size-2 is-spaced">
                      {heroheading}
                  </h1>
                  <h2 className="subtitle has-text-white is-size-4 has-text-weight-light">
                      {herosubheading}
                      <Link to="/contact" className="hero-buttons button has-text-white is-primary is-medium" >Déposez votre dossier</Link>
                  </h2>
          </div>
      </div>
    </BackgroundImage>
    <section className="section section-gradient" style={{ backgroundColor: 'rgb(46,163,242)' }}>
      <div className="container" >
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
                <div className="tile">
                    <h3 className="title has-text-white">{mainpitch.title}</h3>
                </div>
                <div className="columns">
                {mainpitch.arguments.map( ( pitchItem, i ) => {
                    return  <div className="column has-text-white" key={i}>
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-left">
                                            <picture className="image is-64x64 has-text-white">
                                                <Img className="has-text-white" fixed={pitchItem.iconarg.childImageSharp.fixed} alt=""  />
                                            </picture>
                                        </div>
                                        <div className="media-content">
                                            <div className="title is-4 has-text-white"><ReactMarkdown source={pitchItem.textarg} /></div>
                                        </div>
                                    </div>

                                </div>
                            </div>;
                })}
                </div>

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


            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className="container" >
        <div className="section">
            <div className="column is-12">
                <h3 className="has-text-weight-semibold is-size-2">
                    Actualités
                </h3>

            </div>
            <BlogRoll />
            <div className="column is-12 has-text-centered">
                {/* <Link className="btn" to="/blog">Read more</Link> */}
            </div>
        </div>
      </div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
    heroimg: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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

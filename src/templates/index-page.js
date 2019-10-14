import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

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
      className="hero is-primary is-fullheight-with-navbar"
      style={{
        backgroundImage: `url(${
            !!heroimg.childImageSharp ? heroimg.childImageSharp.fluid.src : heroimg
        })`,
        backgroundPosition: `top left`,
      }}
    >
      <div className="hero-body ">
          <div className="container">
              <h1 className="title">
                  {heroheading}
              </h1>
              <h2 className="subtitle">
                  {herosubheading}
              </h2>
          </div>
      </div>
    </section>
    <section className="section section-gradient" style={{ backgroundColor: 'rgb(46,163,242)' }}>
      <div className="container" >
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h3 className="title">{mainpitch.title}</h3>
                  </div>
                  <ul className="tile">
                      {mainpitch.arguments.map( ( pitchItem, i ) => {
                         return  <li key={i}><img src={pitchItem.iconarg} alt="" /> {pitchItem.icontext}</li>;
                      })}
                  </ul>
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
      <div className="columns">
        <div className="column is-12 has-text-centered">
          <Link className="btn" to="/offer">
            L'offre CTO Partners Group
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
                    fluid(maxWidth: 240, quality: 64) {
                        ...GatsbyImageSharpFluid
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

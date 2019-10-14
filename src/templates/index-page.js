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
  <div>hero:{heroimg}
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
            !!heroimg && !!heroimg.childImageSharp ? heroimg.childImageSharp.fluid.src : heroimg
        })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '150px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column',
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            boxShadow:
              'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
            backgroundColor: 'rgb(46,163,242)',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {heroheading}
        </h1>
        <h2
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            boxShadow:
              'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
            backgroundColor: 'rgb(46,163,242)',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {herosubheading}
        </h2>
      </div>
    </div>
    <section className="section section--gradient" style={{ backgroundColor: 'rgb(46,163,242)' }}>
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
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.heroimg}
        heading={frontmatter.heroheading}
        subheading={frontmatter.herosubheading}
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

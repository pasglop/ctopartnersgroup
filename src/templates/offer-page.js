import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import GatsbyImage from "gatsby-image";
import BackgroundImage from 'gatsby-background-image';

export const OfferPageTemplate = ({
  image,
  title,
  heading,
  intro,
  main,
  testimonials,
  fullImage
}) => (
  <div className="content">
    <BackgroundImage Tag="section"
                     className="hero is-large"
                     fluid={image.childImageSharp.fluid}
                     backgroundColor={`#2ea3f2`}
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
            {title}
          </h1>
        </div>
      </div>

    </BackgroundImage>
      <section className="section section--gradient">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-7 is-offset-1">
                <h3 className="has-text-weight-semibold is-size-2">{intro.heading}</h3>
              </div>
            </div>
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <Features gridItems={intro.offers} />
                <div className="columns">
                  <div className="column is-7">
                    <h3 className="has-text-weight-semibold is-size-3">
                      {main.heading}
                    </h3>
                    <p>{main.description}</p>
                  </div>
                  <div className="column is-5">
                    <GatsbyImage fluid={fullImage.childImageSharp.fluid} />
                  </div>
                </div>
                <div className="tile is-ancestor">
                  <div className="tile is-vertical">
                    <div className="tile">
                      {!!main.bizcases && main.bizcases.map(bizcase => {
                            return (
                                <div className="tile is-parent is-vertical">
                                  <article className="tile is-child">
                                    <div className="is-2">
                                      <GatsbyImage fixed={bizcase.image.childImageSharp.fixed} />
                                    </div>
                                    <h5>{bizcase.heading}</h5>
                                    <p>{bizcase.description}</p>
                                  </article>
                                </div>
                            );
                          }
                      )}
                    </div>
                  </div>
                </div>
                {/* <Testimonials testimonials={testimonials} /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
  </div>
);

OfferPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  intro: PropTypes.shape({
    offers: PropTypes.array,
  }),
  main: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    bizcases: PropTypes.shape({
      image: PropTypes.array,
      heading: PropTypes.string,
      description: PropTypes.string,
    }),
  }),
  testimonials: PropTypes.array,
  fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

};

const OfferPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <OfferPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        intro={frontmatter.intro}
        main={frontmatter.main}
        testimonials={frontmatter.testimonials}
        fullImage={frontmatter.full_image}
      />
    </Layout>
  )
};

OfferPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default OfferPage;

export const productPageQuery = graphql`
  query OfferPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        heading
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        intro {
          offers {
            heading
            text
          }
          heading
          description
        }
        full_image {
          childImageSharp {
            fluid(maxWidth: 500, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        main {
          heading
          description
          bizcases {
            heading
            description
            image {
              childImageSharp {
                fixed(width: 80, quality: 92) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
        testimonials {
          author
          quote
        }


      }
    }
  }
`;

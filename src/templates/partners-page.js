import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import Img from "gatsby-image";
import ReactMarkdown from "react-markdown";

export const AboutPageTemplate = ({ title, content, partners, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
              {partners.map( ( pItem, i ) => {
                return  <div className="tile is-ancestor">
                      <div className="tile is-parent">
                        <div className="tile is-child card">
                          <div className="card-content">
                            <div className="media">
                              <div className="media-left">
                                <figure className="image">
                                  <Img fixed={pItem.photo.childImageSharp.fixed} alt={pItem.partnername} />
                                </figure>
                              </div>
                              <div className="media-content">
                                <p className="title is-4">{pItem.partnername}</p>
                                <p className="title is-4">{pItem.partnerjob}</p>
                              </div>
                            </div>

                            <div className="content">{pItem.partnerresume}</div>
                          </div>
                        </div>
                      </div>
                    </div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  partners: PropTypes.object,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const PartnersPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        partners={post.frontmatter.partners}
        content={post.html}
      />
    </Layout>
  )
};

PartnersPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PartnersPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title,
        partners {
          photo {
            childImageSharp {
              fixed(width: 100, quality: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          partnerjob
          partnername
          partnerresume
        }
      }
    }
  }
`;

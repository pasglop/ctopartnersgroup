import React from "react";
import { graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image';

const BackgroundSection = ({ path, className, title }) => (
    <StaticQuery
        query={graphql`
      query getImage($path: String) {
        desktop: file(relativePath: { eq: $path }) {
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
                    className={className}
                    fluid={imageData}
                >
                    <h1>{title}</h1>
                </BackgroundImage>
            )
        }}
    />
);

import React from 'react';
import PropTypes from 'prop-types';
import { AboutPageTemplate } from '../../templates/partners-page';

const PartnersPagePreview = ({ entry, widgetFor }) => (
  <AboutPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
);

PartnersPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default PartnersPagePreview;

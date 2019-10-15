import React from 'react';
import PropTypes from 'prop-types';
import { AboutPageTemplate } from '../../templates/partners-page';

const PartnersPagePreview = ({ entry, widgetFor }) => {
  const entryPartners = entry.getIn(['partners']);
  const partners = entryPartners ? entryPartners.toJS() : [];

  return <AboutPageTemplate
    title={entry.getIn(['data', 'title'])}
    partners={partners}
    content={widgetFor('body')}
  />
};

PartnersPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default PartnersPagePreview;

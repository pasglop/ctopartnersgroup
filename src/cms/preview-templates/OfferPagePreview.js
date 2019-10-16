import React from 'react';
import PropTypes from 'prop-types';
import { OfferPageTemplate } from '../../templates/offer-page';

const OfferPagePreview = ({ entry, getAsset }) => {
  const entryBlurbs = entry.getIn(['data', 'intro', 'offers']);
  const offers = entryBlurbs ? entryBlurbs.toJS() : [];

  const entryTestimonials = entry.getIn(['data', 'testimonials']);
  const testimonials = entryTestimonials ? entryTestimonials.toJS() : [];

  const entryBizCases = entry.getIn(['data', 'bizcases']);
  const bizcases = entryBizCases ? entryBizCases.toJS() : [];

  return (
    <OfferPageTemplate
      image={entry.getIn(['data', 'image'])}
      title={entry.getIn(['data', 'title'])}
      heading={entry.getIn(['data', 'heading'])}
      intro={{ offers }}
      main={{
        heading: entry.getIn(['data', 'main', 'heading']),
        description: entry.getIn(['data', 'main', 'description']),
        bizcases: {bizcases}
      }}
      testimonials={testimonials}
      fullImage={entry.getIn(['data', 'full_image'])}
    />
  )
};

OfferPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default OfferPagePreview;

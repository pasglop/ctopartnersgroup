import React from 'react';
import PropTypes from 'prop-types';
import { PartnerPageTemplate } from '../../templates/partners-page';
import {HTMLContent} from "../../components/Content";


const PartnersPagePreview = ({ entry, widgetFor }) => (
    <PartnerPageTemplate
        title={entry.getIn(['data', 'title'])}
        partners={entry.getIn(['data', 'partnerlist'])}
        content={widgetFor('body')}
        contentComponent={HTMLContent}
    />
);

PartnersPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default PartnersPagePreview;

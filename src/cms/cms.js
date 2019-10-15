import CMS from 'netlify-cms-app';
import uploadcare from 'netlify-cms-media-library-uploadcare';
import cloudinary from 'netlify-cms-media-library-cloudinary';

import PartnersPagePreview from './preview-templates/PartnersPagePreview';
import BlogPostPreview from './preview-templates/BlogPostPreview';
import OfferPagePreview from './preview-templates/OfferPagePreview';
import IndexPagePreview from './preview-templates/IndexPagePreview';

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('index', IndexPagePreview);
CMS.registerPreviewTemplate('about', PartnersPagePreview);
CMS.registerPreviewTemplate('offer', OfferPagePreview);
CMS.registerPreviewTemplate('blog', BlogPostPreview);

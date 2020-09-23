import styled from 'styled-components/macro';
import { CircularProgress } from '@material-ui/core';
import { lighten } from 'polished';
import { Link } from 'react-router-dom';

import FacebookAdsLogo from '../assets/images/facebook-ads-logo.png';
import GoogleAdsLogo from '../assets/images/google-ads-logo.png';
import GoogleAnalyticsLogo from '../assets/images/google-analytics-logo.png';
import MailchimpLogo from '../assets/images/mailchimp-logo.png';
import { ImageComponent } from 'app/components/Image';

export const SOURCES_IMAGES = {
  114: MailchimpLogo,
  115: GoogleAnalyticsLogo,
  116: FacebookAdsLogo,
  117: GoogleAdsLogo,
};

export const StyledCircularProgress = styled(CircularProgress)`
  justify-self: center;
`;

export const StyledSourcesList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  grid-auto-rows: min-content;
  max-width: 900px;
`;

export const StyledSource = styled(ImageComponent)`
  background-size: 20%;
  padding-top: 66%;
  position: relative;
  background-color: ${lighten(0.05, '#eeeeee')};

  &:hover {
    background-color: #eeeeee;
  }

  transition: background-color 0.3s ease-out;
`;

export const StyledSourceName = styled(Link)`
  position: absolute;
  left: 5%;
  top: 7%;
`;

export const StyledFavouriteIcon = styled.div`
  position: absolute;
  right: 5%;
  bottom: 7%;
`;

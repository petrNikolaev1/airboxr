import { useMediaQuery } from 'react-responsive';
import { generateMedia } from 'styled-media-query';
import React, { FC, ReactNode } from 'react';

export const WIDTHS = {
  minDesktop: 1400,
  maxTablet: 1200,
  minTablet: 995,
  maxMobile: 994,
  minDefault: 767,
  maxDefault: 768,
};

type ResponsiveWrapperProps = {
  children: ReactNode;
  force?: boolean;
};

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: WIDTHS.minDesktop });
  return isDesktop ? children : null;
};

export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({
    minWidth: WIDTHS.minTablet,
    maxWidth: WIDTHS.maxTablet,
  });
  return isTablet ? children : null;
};

export const DesktopAndTablet: FC<ResponsiveWrapperProps> = ({
  children,
  force,
}) => {
  const isTablet = useMediaQuery({
    minWidth: WIDTHS.minTablet,
  });
  return <>{((isTablet || force) && children) || null}</>;
};

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: WIDTHS.maxMobile });
  return isMobile ? children : null;
};

export const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: WIDTHS.maxDefault });
  return isNotMobile ? children : null;
};

export const customMedia = generateMedia({
  desktop: `${WIDTHS.minDesktop}px`,
  semiDesktop: `${WIDTHS.maxTablet}px`,
  tablet: `${WIDTHS.minTablet}px`,
  mobile: `${WIDTHS.maxMobile}px`,
  default: `${WIDTHS.minDefault}px`,
  maxDefault: `${WIDTHS.maxDefault}px`,
});

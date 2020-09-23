import React, { FC, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import {
  FixedMiddleBodyWithVerticalScroll,
  FixedTopBar,
  PageContainer,
  TopbarBackButton,
} from 'app/components/UI';

interface LayoutProps {
  headerConfig: {
    title: string;
    withBackNavigation?: boolean;
    withNavigation?: boolean;
    subtitle?: string;
  };
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ headerConfig, children }) => {
  const history = useHistory();

  const topbarLeftButton: TopbarBackButton = {
    type: 'back',
    onClick: () => history.goBack(),
  };

  return (
    <PageContainer>
      <FixedTopBar
        title={headerConfig.title}
        leftButton={
          headerConfig.withBackNavigation ? topbarLeftButton : undefined
        }
        subtitle={headerConfig.subtitle}
        withNavigation={headerConfig.withNavigation}
      />

      <FixedMiddleBodyWithVerticalScroll>
        {children}
      </FixedMiddleBodyWithVerticalScroll>
    </PageContainer>
  );
};

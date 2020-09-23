import React, { FC, useCallback } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { OutlinedButton } from 'app/components/UI';

interface HomePageContainerProps {}

export const HomePageContainer: FC<HomePageContainerProps> = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push('sources');
  }, [history]);

  return (
    <Box display="grid" gridGap="50px">
      <Typography variant="body1">{t('home page subtitle')}</Typography>
      <Box display="grid" gridGap="10px" maxWidth="450px">
        <OutlinedButton onClick={handleClick}>
          {t('import data')}
        </OutlinedButton>
        <OutlinedButton onClick={handleClick} color="secondary">
          {t('lookup data')}
        </OutlinedButton>
      </Box>
    </Box>
  );
};

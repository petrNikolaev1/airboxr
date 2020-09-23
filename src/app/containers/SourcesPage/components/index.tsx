import React, { FC, useCallback, useMemo } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from 'app/containers/SourcesProvider/slice';
import {
  selectFavouriteSources,
  selectSources,
} from 'app/containers/SourcesProvider/selectors';

import {
  SOURCES_IMAGES,
  StyledCircularProgress,
  StyledFavouriteIcon,
  StyledSource,
  StyledSourceName,
  StyledSourcesList,
} from './styled';

interface SourcesPageContainerProps {}

export const SourcesPageContainer: FC<SourcesPageContainerProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading, sourcesList, error } = useSelector(selectSources);
  const { favouriteSources } = useSelector(selectFavouriteSources);

  const handleFavouriteIconClick = useCallback(
    (sourceId: number) => {
      dispatch(actions.toggleFavouriteSource(sourceId));
    },
    [dispatch],
  );

  const sourcesListSorted = useMemo(() => {
    return sourcesList.sort((sourceA, sourceB) => {
      const isSourceAFavourite = favouriteSources.includes(sourceA.id);
      const isSourceBFavourite = favouriteSources.includes(sourceB.id);

      if (isSourceAFavourite && !isSourceBFavourite) {
        return -1;
      } else if (!isSourceAFavourite && isSourceBFavourite) {
        return 1;
      } else {
        return sourceA.id - sourceB.id;
      }
    });
  }, [sourcesList, favouriteSources]);

  return (
    <Box
      display="grid"
      gridGap="150px"
      height="100%"
      gridTemplateRows="auto 1fr"
    >
      <Typography variant="body1">{t('sources page subtitle')}</Typography>
      {loading ? (
        <StyledCircularProgress />
      ) : error ? (
        <Typography>{`${t('sources error')}: ${error.message}`}</Typography>
      ) : (
        <StyledSourcesList>
          {sourcesListSorted.map(source => (
            <StyledSource key={source.id} imageUrl={SOURCES_IMAGES[source.id]}>
              <StyledSourceName to={`sources/${source.id}`}>
                <Typography variant="body1">{source.name}</Typography>
              </StyledSourceName>
              <StyledFavouriteIcon
                onClick={() => handleFavouriteIconClick(source.id)}
              >
                {favouriteSources.includes(source.id) ? (
                  <Favorite />
                ) : (
                  <FavoriteBorder />
                )}
              </StyledFavouriteIcon>
            </StyledSource>
          ))}
        </StyledSourcesList>
      )}
    </Box>
  );
};

import React, { FC, useCallback, useMemo, useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { get, keyBy, values, debounce } from 'lodash';

import { selectSources } from 'app/containers/SourcesProvider/selectors';
import { FixedBottomPominentButton } from 'app/components/UI';
import { StyledHR } from './styled';

interface SourcePageContainerProps {}

export const SourcePageContainer: FC<SourcePageContainerProps> = () => {
  const { t } = useTranslation();
  const { sourceId, intendedTable } = useParams();
  const history = useHistory();

  const [selectedTable, selectTable] = useState<number | null>(null);
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(
    debounce(value => {
      setQuery(value);
    }, 200),
    [],
  );

  const { sources } = useSelector(selectSources);

  const handleChange = useCallback((tableId: string) => {
    selectTable(+tableId);
  }, []);

  const source = useMemo(() => {
    const source = get(sources, sourceId);
    if (source) {
      return {
        ...source,
        tables: values(
          source.tables.reduce((res, cur) => {
            const tableTitles = cur.title.split('||');
            const mainTableTitle = tableTitles[0];
            const secondaryTableTitle = tableTitles[1];
            if (!intendedTable && !res[mainTableTitle]) {
              res[mainTableTitle] = {
                ...cur,
                title: mainTableTitle,
                isIntendedTable: !!secondaryTableTitle,
              };
            } else if (
              intendedTable &&
              mainTableTitle.toLowerCase() === intendedTable.toLowerCase()
            ) {
              res[secondaryTableTitle] = {
                ...cur,
                title: secondaryTableTitle,
              };
            }
            return res;
          }, {}),
        ).filter(
          table => !query || new RegExp('^' + query, 'i').test(table.title),
        ),
      };
    }
  }, [sources, sourceId, intendedTable, query]);

  const sourceTables = useMemo(() => keyBy(source?.tables, 'id'), [source]);

  const onNextClick = useCallback(() => {
    const selectedTableData = sourceTables[selectedTable];
    if (selectedTableData) {
      if (selectedTableData.isIntendedTable) {
        history.push(
          `/sources/${sourceId}/${selectedTableData.title.toLowerCase()}`,
        );
      } else {
        console.log('TODO - Go to SelectColumnsPage');
      }
    }
  }, [sourceId, history, sourceTables, selectedTable]);

  if (!source) return null;

  return (
    <Box
      display="grid"
      gridGap="150px"
      height="100%"
      gridTemplateRows="auto 1fr"
    >
      <Typography variant="body1">
        {t('source page subtitle', { source: source.name })}
      </Typography>
      <Box display="grid" gridAutoRows="min-content">
        <TextField
          id="table-search"
          label={t('filter')}
          type="search"
          onChange={e => handleSearch(e.target.value)}
        />
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="table"
            value={selectedTable}
            onChange={e => handleChange(e.target.value)}
          >
            {source.tables.map(table => (
              <Fragment key={table.id}>
                <FormControlLabel
                  value={table.id}
                  control={<Radio />}
                  label={table.title}
                />
                <StyledHR />
              </Fragment>
            ))}
          </RadioGroup>
        </FormControl>
        <FixedBottomPominentButton
          disabled={!selectedTable}
          title={t('next')}
          onClick={onNextClick}
        />
      </Box>
    </Box>
  );
};

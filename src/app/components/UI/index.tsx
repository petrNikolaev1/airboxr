import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Home, ChatOutlined } from '@material-ui/icons';
import ArrowBack from '@material-ui/icons/ArrowBack';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

export interface TopbarBackButton {
  type: 'back';
  onClick: () => void | Promise<void>;
}

interface TopBarProps {
  leftButton?: TopbarBackButton;
  title: string;
  subtitle?: string;
  withNavigation?: boolean;
}

export const FixedTopBar: React.FunctionComponent<TopBarProps> = ({
  leftButton,
  title,
  subtitle,
  withNavigation,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      style={{
        padding: 0,
        top: 0,
        right: 0,
        bottom: 'auto',
        left: 0,
        position: 'fixed',
        minHeight: 60,
      }}
      pt={1}
    >
      {withNavigation && (
        <Box
          style={{
            backgroundColor: '#E6E6E6',
            padding: 8,
            paddingRight: 15,
            paddingLeft: 15,
          }}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link to={'/'}>
            <Home fontSize={'small'} />
          </Link>
          <Button
            color="secondary"
            style={{ height: 25, textTransform: 'uppercase' }}
          >
            <ChatOutlined style={{ fontSize: 13, marginRight: 7 }} />
            {t('chat')}
          </Button>
        </Box>
      )}
      <Box
        style={{ padding: 15 }}
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        {!!leftButton && (
          <IconButton
            edge="start"
            color="secondary"
            aria-label="menu"
            onClick={leftButton.onClick}
          >
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h2">{title}</Typography>
      </Box>
      {!!subtitle && <Typography variant="subtitle1">{subtitle}</Typography>}
    </Box>
  );
};

interface BottomButtonProps {
  processing?: boolean;
  onClick: () => void | Promise<void>;
  title: string;
  disabled?: boolean;
}

export const FixedBottomPominentButton: React.FunctionComponent<BottomButtonProps> = ({
  processing,
  title,
  onClick,
  disabled,
}) => {
  return (
    <Box
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        height: 50,
        top: 'auto',
        right: 0,
        bottom: 0,
        left: 0,
        position: 'fixed',
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {processing || false ? (
        <CircularProgress />
      ) : (
        <Button
          style={{ height: 50, width: '100%' }}
          onClick={onClick}
          disabled={disabled}
        >
          {title}
        </Button>
      )}
    </Box>
  );
};

export const FixedMiddleBodyWithVerticalScroll: React.FunctionComponent<{}> = props => {
  return (
    <Box
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        top: 120,
        right: 0,
        bottom: 65,
        left: 0,
        position: 'fixed',
        overflowY: 'scroll',
      }}
      display="flex"
      flexDirection="column"
    >
      {props.children}
    </Box>
  );
};

export const PageContainer: React.FunctionComponent<{}> = props => {
  return (
    <Box display="flex" flexDirection="column">
      {props.children}
    </Box>
  );
};

interface OutlinedButtonProps extends ButtonProps {}

export const OutlinedButton: FC<OutlinedButtonProps> = props => (
  <Button
    style={{
      textTransform: 'capitalize',
    }}
    variant="outlined"
    {...props}
  >
    {props.children}
  </Button>
);

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

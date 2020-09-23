import React, { FC, useEffect, useState, HTMLProps } from 'react';
import styled from 'styled-components';

interface OwnProps extends HTMLProps<HTMLDivElement> {
  imageUrl: string;
  className?: string;
}

export const ImageComponent: FC<OwnProps> = ({
  imageUrl,
  className,
  children,
  onClick,
}) => {
  const [sourceLoaded, setSourceLoaded] = useState<Maybe<string>>(null);

  useEffect(() => {
    const setImage = () => {
      setSourceLoaded(imageUrl);
    };

    const img = new Image();
    img.addEventListener('load', setImage, false);
    img.src = imageUrl;
    img.onerror = () => setSourceLoaded(null);
    return () => {
      img.removeEventListener('load', setImage);
    };
  }, [imageUrl]);

  return (
    <ImageBackgroundComponent
      imageUrl={sourceLoaded}
      className={className}
      onClick={onClick}
    >
      {children}
    </ImageBackgroundComponent>
  );
};

type ImageBackgroundComponentProps = {
  imageUrl?: Maybe<string>;
};

const ImageBackgroundComponent = styled.div<ImageBackgroundComponentProps>`
  background: ${props =>
    props.imageUrl ? `url(${props.imageUrl})` : '#f1f1f1'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  ${p =>
    !p.imageUrl
      ? `
      animation-duration: 4.5s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-name: placeHolderShimmer;
      animation-timing-function: linear;
      background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);

      @keyframes placeHolderShimmer {
        0% {
          background-position: -468px 0;
        }
        100% {
          background-position: 468px 0;
        }
      }
  `
      : ``}
`;

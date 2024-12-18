import { Devvit } from '@devvit/public-api';

export default function ImageButton({
  onPressMethod,
  url,
  width,
  height,
  mode,
  disable,
}: {
  onPressMethod: () => void;
  url: string;
  width?: `${number}px` | number;
  height?: `${number}px` | number;
  mode?: 'none' | 'fit' | 'fill' | 'cover' | 'scale-down';
  disable?: boolean;
}): JSX.Element {
  width = width ?? '30px';
  const emptyMethod = () => {};
  console.assert(typeof onPressMethod === 'function');
  return (
    <image
      onPress={disable ? emptyMethod : onPressMethod}
      url={url}
      imageWidth={width}
      imageHeight={height ?? width}
      resizeMode={mode ?? 'scale-down'}
    />
  );
}

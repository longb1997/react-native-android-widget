import {
  Image,
  ImageRequireSource,
  ImageResolvedAssetSource,
} from 'react-native';
import { ClickActionProps, convertClickAction } from './utils/click-action';
import type { CommonInternalProps } from './utils/common-internal.props';
import type { CommonStyleProps } from './utils/style.props';
import { convertCommonStyle } from './utils/style.utils';

interface ImageWidgetInternalProps extends CommonInternalProps {
  imageWidth: number;
  imageHeight: number;
  image: ImageResolvedAssetSource;
}

type ImageWidgetStyle = CommonStyleProps;

export interface ImageWidgetProps extends ClickActionProps {
  style?: ImageWidgetStyle;

  /**
   * Width of the image
   */
  imageWidth: number;
  /**
   * Height of the image
   */
  imageHeight: number;
  /**
   * Image loaded using `require('./path/to/image')`
   */
  image: ImageRequireSource;
  /**
   * Image radius
   */
  radius?: number;
}

export function ImageWidget(_: ImageWidgetProps) {
  return null;
}
ImageWidget.__name__ = 'ImageWidget';
ImageWidget.convertProps = (
  props: ImageWidgetProps
): ImageWidgetInternalProps => {
  return {
    ...convertCommonStyle(props.style ?? {}),
    ...convertClickAction(props),
    imageHeight: props.imageHeight,
    imageWidth: props.imageWidth,
    image: Image.resolveAssetSource(props.image),
    ...(props.radius ? { radius: props.radius } : {}),
  };
};

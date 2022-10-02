import type { IconWidgetInternalProps } from './widgets/IconWidget';
import type { ImageWidgetInternalProps } from './widgets/ImageWidget';
import type { TextWidgetInternalProps } from './widgets/TextWidet';
import type { FlexWidgetInternalProps } from './widgets/FlexWidget';
import type { OverlapWidgetInternalProps } from './widgets/OverlapWidget';

interface IconNode {
  type: 'IconWidget';
  props: IconWidgetInternalProps;
}

interface ImageNode {
  type: 'ImageWidget';
  props: ImageWidgetInternalProps;
}

interface TextNode {
  type: 'TextWidget';
  props: TextWidgetInternalProps;
}

interface FlexNode {
  type: 'FlexWidget';
  props: FlexWidgetInternalProps;
  children: WidgetTree[];
}

interface OverlapNode {
  type: 'OverlapWidget';
  props: OverlapWidgetInternalProps;
  children: WidgetTree[];
}

export type WidgetTree =
  | FlexNode
  | OverlapNode
  | IconNode
  | ImageNode
  | TextNode;

export function buildTree(jsxTree: JSX.Element): WidgetTree {
  if (typeof jsxTree === 'string' || typeof jsxTree === 'number') {
    return jsxTree;
  }

  while (!jsxTree.type.__name__) {
    jsxTree = jsxTree.type(jsxTree.props);
  }

  const { children, ...otherProps } = jsxTree.props;

  const updatedChildren =
    jsxTree.type.processChildren?.(otherProps, children ?? []) ??
    children ??
    [];

  return {
    type: jsxTree.type.__name__,
    props: jsxTree.type.convertProps(otherProps),
    ...(updatedChildren
      ? {
          children: (Array.isArray(updatedChildren)
            ? updatedChildren
            : [updatedChildren]
          )
            .filter((x) => !!x)
            .map((x) => buildTree(x))
            .flat(1),
        }
      : {}),
  };
}

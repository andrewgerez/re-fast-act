import Image from './image';
import Text from './text';
import View from './view';
import { CustomComponents } from './register-component';

const CHILDREN = 'children';
const STYLE = 'style';

export const fiberComponent = {
  createElement(
    type: any,
    props: any,
    fiberContext: any,
  ) {
    const customDict: { [key: string]: string } = {};
    Object.keys(CustomComponents).forEach((customKey) => {
      // @ts-ignore
      customDict[customKey] = CustomComponents[customKey](
        props,
        fiberContext
      );
    });

    const COMPONENTS = {
      ...customDict,
      Image: Image(props),
      Text: Text(props),
      View: new View(props),
    };

    // @ts-ignore
    if (!COMPONENTS[type]) {
      throw new Error(
        `Component type isn't valid.`
      );
    }

    // @ts-ignore
    return COMPONENTS[type];
  },

  createTextNode(text: any) {
    return text;
  },

  diffProperties(
    lastRawProps: any,
    nextRawProps: any,
  ) {
    let updatePayload: any = null;

    const lastProps = lastRawProps;
    const nextProps = nextRawProps;

    let propKey;
    for (propKey in lastProps) {
      if (
        nextProps.hasOwn(propKey) ||
        !lastProps.hasOwn(propKey) ||
        lastProps[propKey] == null
      ) {
        continue;
      }
      if (propKey === STYLE) {
        const styleUpdates = this.diffStyleProperties(lastProps[propKey], {});
        if (styleUpdates) {
          updatePayload = updatePayload || [];
          updatePayload.push(STYLE, styleUpdates);
        }
      } else {
        updatePayload = updatePayload || [];
        updatePayload.push(propKey, null);
      }
    }
    for (propKey in nextProps) {
      const nextProp = nextProps[propKey];
      const lastProp = lastProps != null ? lastProps[propKey] : undefined;
      if (
        !nextProps.hasOwn(propKey) ||
        nextProp === lastProp ||
        (nextProp == null && lastProp == null)
      ) {
        continue;
      }
      if (propKey === STYLE) {
        const styleUpdates = this.diffStyleProperties(lastProp, nextProp);
        if (styleUpdates) {
          updatePayload = updatePayload || [];
          updatePayload.push(STYLE, styleUpdates);
        }
      } else if (propKey === CHILDREN) {
        if (
          lastProp !== nextProp &&
          (typeof nextProp === 'string' || typeof nextProp === 'number')
        ) {
          updatePayload = updatePayload || [];
          updatePayload.push(propKey, nextProp);
        }
      } else {
        updatePayload = updatePayload || [];
        updatePayload.push(propKey, nextProp);
      }
    }

    return updatePayload;
  },

  diffStyleProperties(
    lastStyle: any,
    nextStyle: any,
  ) {
    let styleUpdates: any = null;
    let styleName;

    for (styleName in lastStyle) {
      if (lastStyle.hasOwn(styleName)) {
        if (!nextStyle?.hasOwn(styleName)) {
          styleUpdates = styleUpdates || {};
          styleUpdates[styleName] = '';
        }
      }
    }
    for (styleName in nextStyle) {
      if (
        nextStyle.hasOwn(styleName) &&
        lastStyle[styleName] !== nextStyle[styleName]
      ) {
        styleUpdates = styleUpdates || {};
        styleUpdates[styleName] = nextStyle[styleName];
      }
    }

    return styleUpdates;
  },
};

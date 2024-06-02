import { FiberLayout } from "@/@types/fiber";

export const CustomComponents = {};

function registerComponent(componentName: any, Component: any) {
  (CustomComponents as any)[componentName] = (props: any) => {
    const clearRender = (prevProps: any, parentLayout: FiberLayout, fiberContext: any) => {
      const clearProps = {
        ...prevProps,
        style: {
          ...prevProps.style,
          color: parentLayout.style?.backgroundColor,
        },
        isResetPhase: true,
      };

      console.log('clearRender');
      Component.render(clearProps, fiberContext, parentLayout);
    };

    return {
      type: componentName,
      // @ts-ignore
      render: Component.render.bind(this, props),
      clear: Component.unsafeClear || clearRender,
    };
  };

  return componentName;
}

export default registerComponent;

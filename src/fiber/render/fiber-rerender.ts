import { ReactNode } from 'react';
import ReactFiberReconciler, { BundleType } from 'react-reconciler';
import { fiberComponent } from '../components/fiber-component';
import { scaleDPI } from '../utils/scale-resize';
import {renderElement, renderQueue} from './fiber-render';
import { precacheFiberNode, updateFiberProps } from './fiber-tree';
import { FiberParentInstance, FiberChild, FiberElement, CanvasComponentContext } from "@/@types/fiber";
import {
  scheduleReconcilerTimeout,
  cancelReconcilerTimeout,
} from './fiber-timeout';

let fiberContext: CanvasComponentContext | null = null;
let surfaceHeight = 0;

const devToolsPreset = {
  bundleType: 0 as BundleType,
  version: '0.1.0',
  rendererPackageName: 'CustomReactReconciler',
}

const CustomRerender = {
  supportsMutation: true,

  createInstance(
    type: any,
    props: any,
    rootContainerInstance: HTMLCanvasElement,
    internalInstanceHandle: any
  ) {
    if (!fiberContext && rootContainerInstance.getContext) {
      const rootContainerInstanceContext =
        rootContainerInstance.getContext('2d');

      if (!rootContainerInstanceContext) return;

      scaleDPI(rootContainerInstance, rootContainerInstanceContext);

      fiberContext = {
        type: 'canvas',
        getSurfaceHeight: () => surfaceHeight,
        setSurfaceHeight: (height: number) => {
          surfaceHeight = height;
        },
        ctx: rootContainerInstanceContext,
        renderQueue: [],
      };
    }

    const fiberElement = fiberComponent.createElement(
      type,
      props,
      fiberContext,
    );

    precacheFiberNode(internalInstanceHandle, fiberElement);
    updateFiberProps(fiberElement, props);
    return fiberElement;
  },

  appendInitialChild(parentInstance: FiberParentInstance, child: FiberChild) {
    if (parentInstance.appendChild && child.type !== 'View') {
      let layout = {};
      if (child.instructions?.relative) {
        layout = {
          ...layout,
          ...parentInstance.getAndUpdateCurrentLayout(),
        };
      }
      parentInstance.appendChild({...child, layout});

      child.getParentLayout = parentInstance.getLayoutDefinitions;
    }
  },

  finalizeInitialChildren(parentInstance: FiberParentInstance, type: string) {
    if (type === 'View') {
      parentInstance.render(fiberContext);
    }

    return false;
  },

  createTextInstance(text: any) {
    return text;
  },

  getChildHostContext(parentHostContext: any) {
    return parentHostContext;
  },

  prepareUpdate(
    element: FiberElement,
    type: any,
    oldProps: any,
    newProps: any,
  ) {
    if (newProps) {
      const diff = fiberComponent.diffProperties(
        oldProps,
        newProps,
      );

      // if (!fiberContext) return null;

      if (diff) {
        const parentLayout = element.parentLayout || element.getParentLayout();
        if (type === 'Text') {
          parentLayout.resetLayout();
        }

        element.clear(oldProps, parentLayout, fiberContext);

        const fiberElement = fiberComponent.createElement(
          type,
          newProps,
          fiberContext
        );

        fiberElement.parentLayout = parentLayout;

        if (diff.length && diff.indexOf('children') === -1) {
          renderElement(fiberContext!, fiberElement);
          return null;
        }

        fiberContext?.renderQueue.push(fiberElement);

        return null;
      }

      if (type === 'Text' && newProps.children?.join) {
        const parentLayout = element.parentLayout || element.getParentLayout();
        element.clear(oldProps, parentLayout, fiberContext);

        const fiberElement = fiberComponent.createElement(
          type,
          {...newProps, children: newProps.children.join('')},
          fiberContext
        );

        renderElement(fiberContext!, fiberElement);
      }
    }
  },

  resetAfterCommit() {
    if (!fiberContext) return;

    renderQueue(fiberContext, () => {
      fiberContext?.setSurfaceHeight(0);
    });
  },

  removeChild(parentInstance: FiberParentInstance, child: FiberChild) {
    if (child?.type === 'View') {
      child.clear(
        fiberContext,
        parentInstance.getLayoutDefinitions()
      );
    }
  },

  shouldSetTextContent(props: any) {
    return (
      typeof props.children === 'string' || typeof props.children === 'number'
    );
  },

  getPublicInstance(inst: any) {
    return inst;
  },
  
  prepareForCommit() {
    return {};
  },

  scheduleTimeout: scheduleReconcilerTimeout,
  cancelTimeout: cancelReconcilerTimeout,
  noTimeout: 0,
  isPrimaryRenderer: true,
  supportsPersistence: true,
  supportsHydration: true,
  getCurrentEventPriority: () => 0,
  getInstanceFromNode: () => undefined,
  getRootHostContext: () => {},
  preparePortalMount: () => {},
  beforeActiveInstanceBlur: () => {},
  afterActiveInstanceBlur: () => {},
  prepareScopeUpdate: () => {},
  getInstanceFromScope: () => {},
  detachDeletedInstance: () => {},
  appendChildToContainer : () => {},
  clearContainer: () => {},
};

const CustomReconciler = ReactFiberReconciler(CustomRerender);

CustomReconciler.injectIntoDevTools({...devToolsPreset});

const defaultContainer = {};
const roots = typeof WeakMap === 'function' ? new WeakMap() : new Map();

const ReactFiberRerender = {
  render(
    fiberElement: ReactNode,
    canvasDOMElement: HTMLCanvasElement,
    callback?: any
  ) {
    const containerKey = canvasDOMElement ?? defaultContainer;

    let root = roots.get(containerKey);
    if (!root) {
      // @ts-ignore
      root = CustomReconciler.createContainer(containerKey);
      roots.set(canvasDOMElement, root);
      fiberContext = null;
    }

    CustomReconciler.updateContainer(fiberElement, root, null, callback);

    return CustomReconciler.getPublicRootInstance(root);
  },
};

export default ReactFiberRerender;

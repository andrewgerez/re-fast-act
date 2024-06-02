export type CustomCanvasRenderingContext2D = CanvasRenderingContext2D & {
  webkitBackingStorePixelRatio?: number;
  mozBackingStorePixelRatio?: number;
  msBackingStorePixelRatio?: number;
  oBackingStorePixelRatio?: number;
  backingStorePixelRatio?: number;
  type?: string;
};

export type CanvasRect = {
  x: number;
  y: number;
  width?: number;
  height?: number;
};

export type SpatialGeometry = {
  x: number;
  y: number;
};

export type FiberElement = {
  render: (context: CanvasComponentContext, layout: FiberLayout) => void;
  clear: (oldProps: any, parentLayout: FiberLayout, fiberContext: any) => void;
  parentLayout: FiberLayout;
  getParentLayout: () => FiberLayout;
};

export type FiberLayout = {
  style?: {
    width: number;
    height: number;
    backgroundColor: string;
    borderColor: string;
    overflow: string;
  };
  spatialGeometry: SpatialGeometry;
  resetLayout: () => void;
};

export type CanvasComponentContext = {
  renderQueue: Array<FiberElement>;
  type: 'canvas';
  ctx: CustomCanvasRenderingContext2D;
  getSurfaceHeight: () => number;
  setSurfaceHeight: (height: number) => void;
};

export type FiberParentInstance = {
  appendChild: (element: any) => void;
  getAndUpdateCurrentLayout: () => FiberLayout;
  getLayoutDefinitions: () => FiberLayout;
  render: (fiberContext: any) => void;
}

export type FiberChild = {
  type: string;
  instructions?: {
    relative: boolean;
  };
  getParentLayout?: () => FiberLayout;
  clear: (fiberContext: any, layoutDefinitions: FiberLayout) => void;
}

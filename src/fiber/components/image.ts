import type { CanvasComponentContext, FiberLayout } from '@/@types/fiber';

const cacheImageObject: { [src: string]: any } = {};

type ImageStyle = {
  width?: number;
  height?: number;
  x: number;
  y: number;
  left: number;
  top: number;
  position: string;
  overflow?: string;
}

type Props = {
  style: ImageStyle;
  src: string;
  imageElement: any;
  width?: number;
  height?: number;
}

const handleCacheImage = (
  src: string,
  element: any,
  width: number,
  height: number
) => {
  // @ts-ignore
  cacheImageControl[src] = {
    element,
    width,
    height,
  };
}

const handleDrawImage = (
  ctx: CanvasRenderingContext2D,
  imageElement: any,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  ctx.drawImage(imageElement, x, y, width, height);
}

const handleRenderImage = (
  props: Props,
  fiberContext: CanvasComponentContext,
  parentLayout: FiberLayout
) => {
  const { ctx } = fiberContext;
  const { spatialGeometry = { x: 0, y: 0 } } = parentLayout || {};
  const { style, imageElement, src, width, height } = props;

  if (!src && !imageElement) {
    return null;
  }

  let x = style.left || spatialGeometry.x;
  let y = style.top || spatialGeometry.y;

  if (style.position === 'absolute') {
    x = style.left || 0;
    y = style.top || 0;

  } else if (!spatialGeometry) {
    return null;
  }

  const cachedImage = cacheImageObject[src];

  let w = width ?? style.width;
  let h = height ?? style.height;

  if (parentLayout.style?.overflow === 'hidden') {
    h = parentLayout.style.height;
    w = parentLayout.style.width;
  }

  if (cachedImage) {
    handleDrawImage(
      ctx,
      cachedImage.element,
      x,
      y,
      w ?? cachedImage.width,
      h ?? cachedImage.height
    );
    return;
  }

  if (imageElement?.src) {
    handleDrawImage(
      ctx,
      imageElement,
      x,
      y,
      w ?? imageElement.naturalWidth,
      h ?? imageElement.naturalHeight
    );
    return;
  }

  const newImageElement = new Image();
  newImageElement.src = src;

  const handleLoadImage = () => {
    if (!newImageElement) {
      return;
    }
    const imageWidth = Number(w ?? newImageElement.naturalWidth);
    const imageHeight = Number(h ?? newImageElement.naturalHeight);
    handleDrawImage(ctx, newImageElement, x, y, imageWidth, imageHeight);
    handleCacheImage(src, newImageElement, imageWidth, imageHeight);
  }

  if (newImageElement.complete) {
    handleLoadImage();
  } else {
    newImageElement.addEventListener('load', handleLoadImage);
    newImageElement.addEventListener('error', () => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('failed to load image:', src);
      }
    });
  }
}

export default function CreateImageInstance(props: Props) {
  return {
    type: 'Image',
    render: handleRenderImage,
    clear: () => {},
  };
}

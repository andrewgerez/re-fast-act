import type { CanvasComponentContext, FiberElement } from '@/@types/fiber';

export const renderElement = (
  fiberContext: CanvasComponentContext,
  element: FiberElement
) => {
  element.render(fiberContext, element.parentLayout);
}

export const renderQueue = (
  fiberContext: CanvasComponentContext,
  onFinish: () => void
) => {
  if (fiberContext?.renderQueue.length) {
    const queue = fiberContext.renderQueue;

    let reqId: number;
    const frame = () => {
      if (queue.length) {
        const element = queue.shift();
        element?.render(fiberContext, element.parentLayout);

        reqId = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(reqId);
        onFinish();
      }
    };
    frame();
  }
}

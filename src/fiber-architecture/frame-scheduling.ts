let scheduledCb: (() => unknown) | null = null
let frameDeadline: number = 0

const hasNativePerformanceNow =
  typeof performance === 'object' &&
  typeof performance.now === 'function'

export const now = hasNativePerformanceNow
  ? () => performance.now()
  : () => Date.now()

function timeoutCb() {
  frameDeadline = now()

  const cb = scheduledCb
  scheduledCb = null
  if (cb !== null) {
    cb()
  }
}

export function scheduleDeferredCallback(
  cb: () => unknown,
): any {
  scheduledCb = cb
  const timeoutId = setTimeout(timeoutCb, 1)

  return timeoutId
}

export function cancelDeferredCallback(cbID: number): void {
  scheduledCb = null
  clearTimeout(cbID)
}

export function shouldYield(): boolean {
  return frameDeadline <= now()
}

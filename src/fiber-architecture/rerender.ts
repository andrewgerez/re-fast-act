import reconciler from 'react-reconciler'

const defaultContainer = {}
const roots = typeof WeakMap === 'function' ? new WeakMap() : new Map()

const isProduction = false // TO-DO: in the future, differentiate environments

export const mutationRerender = {
  render(element: React.ReactElement, canvasDOMElement: HTMLCanvasElement, cb?: () => void) {
    const containerKey = !canvasDOMElement ? defaultContainer : canvasDOMElement
    let root = roots.get(containerKey)

    if (!root) {
      root = reconciler.createContainer(
        containerKey,
        1,
        null,
        isProduction,
        null,
        'canvas-rerender',
        () => {},
        null
      )
      roots.set(canvasDOMElement, root)
    }

    reconciler.updateContainer(element, root, null, cb)

    return reconciler.getPublicRootInstance(root)
  }
}

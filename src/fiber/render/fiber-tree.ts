const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function createUniqueUUID() {
  let id = "";
  for (let i = 0; i < 10; i++) {
    id += alphabet.charAt(Math.random() * alphabet.length | 0);
  }
  return id + Date.now().toString(36);
}

const randomKey = createUniqueUUID();
const internalInstanceKey = '__reactInternalInstance$' + randomKey;
const internalEventHandlersKey = '__reactEventHandlers$' + randomKey;

export function precacheFiberNode(hostInst: any, node: any) {
  node[internalInstanceKey] = hostInst;
}

export function getFiberCurrentPropsFromNode(node: any) {
  return node[internalEventHandlersKey] || null;
}

export function updateFiberProps(node: any, props: any) {
  node[internalEventHandlersKey] = props;
}

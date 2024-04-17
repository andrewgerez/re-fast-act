export enum NavigationEvents {
  "KEY_DOWN" = "keydown",
}

export enum NavigationDirections {
  "ARROW_UP" = "ArrowUp",
  "ARROW_LEFT" = "ArrowLeft",
  "ARROW_DOWN" = "ArrowDown",
  "ARROW_RIGHT" = "ArrowRight",
}

export enum FocusKey {
  "HERO" = "hero",
  "CAROUSEL" = "carousel",
  "CANVAS" = "canvas",
}

export interface NavigationHandlerParams {
  elementOnFocus: string;
  setElementOnFocus: React.Dispatch<React.SetStateAction<string>>;
}

export interface FocusHandlerParams {
  elementId?: string;
  focusStateDispatcher: React.Dispatch<React.SetStateAction<string>>;
}

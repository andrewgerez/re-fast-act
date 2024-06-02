import ReactFiberRerender from './render/fiber-rerender';
import RegisterComponent from './components/register-component';
import RenderFocusedComponent from './navigation/render-focused-component';
import RenderNavigableComponent from './navigation/render-navigable-component';
import StyleSheetService from './stylization';
import DimensionsService from './utils/dimensions';

export const registerComponent = RegisterComponent;
export const customFiber = ReactFiberRerender;
export const customRender = ReactFiberRerender.render;

export const Image = 'Image';
export const View = 'View';
export const Text = 'Text';

export const StyleSheet = StyleSheetService;
export const Dimensions = DimensionsService;
export const FocusedComponent = RenderFocusedComponent;
export const NavigableComponent = RenderNavigableComponent;

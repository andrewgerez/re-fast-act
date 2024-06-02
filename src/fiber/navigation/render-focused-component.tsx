import { ComponentType, useContext } from 'react';
import { FocusContext, FocusContextMapper } from './focus-context';

type ExtraComponentProps = {
  focused: boolean | void;
  setFocus: (key: string) => void;
}

const RenderFocusedComponent = (
  CustomComponent: ComponentType<ExtraComponentProps>,
  focusKey: string
) => {
  return (props: any) => {
    const { currentFocusPath, setFocus } = useContext(FocusContext);

    const contextValue = {
      currentFocusPath: focusKey,
      setFocus: setFocus,
    };
    
    const renderWithFocusPath = () => {
      FocusContextMapper.push(focusKey);
  
      return (
        <FocusContext.Provider value={contextValue}>
          <CustomComponent
            focused={currentFocusPath === focusKey}
            setFocus={setFocus}
          />
        </FocusContext.Provider>
      );
    }
  
    return (
      <FocusContext.Consumer>
        {renderWithFocusPath}
      </FocusContext.Consumer>
    );
  }
}

export default RenderFocusedComponent;

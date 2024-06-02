import { ComponentType, useEffect, useMemo, useState } from 'react';
import { FocusContext, FocusContextMapper } from './focus-context';

const RenderNavigableComponent = (CustomComponent: ComponentType) => {
  return (props: any) => {
    const [currentFocusKey, setCurrentFocusKey] = useState("teste");

    useEffect(() => {
      window.addEventListener('keydown', (e) => handleKeyDown(e));
  
      return () => {
        window.removeEventListener('keydown', (e) => handleKeyDown(e));
      }
    }, []);
  
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === String(38)) {
        const idx = FocusContextMapper.indexOf(currentFocusKey) - 1;
        const next = idx - 1;
        const nextFocusKey = FocusContextMapper[next];
        setCurrentFocusKey(nextFocusKey);
      } else if (e.key === String(40)) {
        const idx = FocusContextMapper.indexOf(currentFocusKey) + 1;
        const next = idx + 1;
        const nextFocusKey = FocusContextMapper[next];
        setCurrentFocusKey(nextFocusKey);
      }
    };
  
  
    const setFocusCallback = (key: string) => {
      setCurrentFocusKey(key);
    }
  
    const contextValue = useMemo(() => ({
      currentFocusPath: currentFocusKey,
      setFocus: setFocusCallback,
    }), [currentFocusKey]);
    return (
      <FocusContext.Provider value={contextValue}>
        <CustomComponent />
      </FocusContext.Provider>
    );
  }
}

export default RenderNavigableComponent;

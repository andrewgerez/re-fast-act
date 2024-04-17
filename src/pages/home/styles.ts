import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: gray;
  overflow: hidden;
`;

export const Hero = styled.div`
  width: 100%;
  height: 37rem;
  background-color: black;
`;

export const CarouselsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 36.5rem;
  gap: 1rem;
  overflow-y: scroll;
`;

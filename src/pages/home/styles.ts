import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: gray;
`;

export const Hero = styled.div`
  width: 100%;
  height: 37rem;
  background-color: black;
`;

export const CarouselsWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 40rem;
  gap: 1rem;
`;

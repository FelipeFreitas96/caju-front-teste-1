import styled from "styled-components";

export const Background = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.5s;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Container = styled.div`
  background-color: white;
  color: black;
  width: 40vw;
  height: 300px;
  margin: auto;
  text-align: center;
  align-content: center;
`;

export const BtnsList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  gap: 10px;
`;

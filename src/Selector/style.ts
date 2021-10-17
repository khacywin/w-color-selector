import styled from 'styled-components';

const WColor = styled.div`
  position: relative;
`;

const WColorHeading = styled.div`
  font-size: .8em;
  text-indent: .3em;
  position: relative;
  margin-bottom: 3px;
`;

const WColorAdd = styled.button`
  display: block;
  width: 1.4em;
  height: 1.4em;
  background-color: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 0;
  box-sizing: border-box;

  &::before{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.1;
    transform: scale(0);
    transition: transform 0.2s ease-in;
    top: 0;
    left: 0;
    border-radius: 50%;
  }

  &:hover{
    &::before{
      transform: scale(1);
    }
  }

  &:focus{
    outline: 0;
  }

  img{
    margin: 20%;
    width: 60%;
    height: 60%;
  }
`;

export {
  WColor,
  WColorHeading,
  WColorAdd
}
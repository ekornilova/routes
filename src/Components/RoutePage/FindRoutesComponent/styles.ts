import styled from 'styled-components';
import Button from '../../BasicElements/Button';
import Select from '../../BasicElements/Select';

export const Wrapper = styled.div``;
export const WrapperSelectPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  > * {
    flex-grow: 0.3;
  }
`;
export const SelectFrom = styled(Select)``;
export const SelectTo = styled(Select)``;
export const UpdateRoute = styled(Button)``;

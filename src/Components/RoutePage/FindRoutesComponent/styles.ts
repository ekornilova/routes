import styled from 'styled-components';
import Button from '../../BasicElements/Button';
import Select from '../../BasicElements/Select';
import Input from '../../BasicElements/Input';
import Checkbox from '../../BasicElements/Checkbox';

export const Wrapper = styled.div``;
export const WrapperSettingsPart = styled.div`
  width: 80%;
  grid-template-columns: 1fr 1fr;
  display: grid;
  grid-gap: 12px;
`;
export const WrapperSelectPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
export const MaxStopInput = styled(Input)``;
export const MaxCostInput = styled(Input)``;
export const CanTwiceCheckBox = styled(Checkbox)``;
export const SelectFrom = styled(Select)``;
export const SelectTo = styled(Select)``;
export const UpdateRoute = styled(Button)``;

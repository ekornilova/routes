import styled from 'styled-components';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '../BasicElements/Button';
// import Button from '@material-ui/core/Button';
import Tabs from '../BasicElements/Tab';

export const WrapperSettingPart = styled.div`
  padding: 15px 5vw;
`;
export const WrapperInputStrRoutes = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  button {
    margin-left: 5vw;
  }
`;
export const InputStrRoutes = styled(TextareaAutosize)`
  width: 60vw;
  border-color: #3f51b5;
`;
export const UpdateStrRoutes = styled(Button)``;
export const StyledTabs = styled(Tabs)``;
export const WrapperReadyStrRoutes = styled.div`
  padding-top: 15px;
`;
export const ReadyStrRoutes = styled.div``;

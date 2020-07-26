import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

export const TagInput = styled(Input)`
  input {
    padding: 0px;
  }
`;
export const TagsWrapper = styled.div``;
export const TagWrapper = styled.span`
  user-select: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  display: inline-block;
  height: auto;
  margin-right: 8px;
  padding: 0 7px;
  font-size: 14px;
  line-height: 26px;
  white-space: nowrap;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  cursor: default;
  opacity: 1;
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
`;
export const TagLabel = styled.span``;
export const TagIcon = styled(IconButton)`
  padding-left: 7px;
`;
export const EditTagWrapper = styled.span`
  background: #fff;
  border-style: dashed;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  display: inline-block;
  height: auto;
  margin-right: 8px;
  padding: 0 7px;
  font-size: 14px;
  line-height: 26px;
  white-space: nowrap;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  cursor: default;
  opacity: 1;
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
`;

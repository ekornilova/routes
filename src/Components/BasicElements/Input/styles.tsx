import styled, { css } from 'styled-components';
import FormElWraper from '../FormElWraper';

export const StyledFormElWraper = styled(FormElWraper)`
  ${() => css`
    overflow: hidden;
  `}
`;

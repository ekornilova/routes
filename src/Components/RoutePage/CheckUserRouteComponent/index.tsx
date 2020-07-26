import React, { FC, useState } from 'react';
import { getRoutesResult } from '../helpers';
import { TabPanelProps, RouteResult } from '../interfaces';
import { Wrapper, WrapperTagPart, StyledTags, CheckRoute, WrapperOutPart } from './styles';

const CheckUserRouteComponent: FC<TabPanelProps> = ({ letters, routes }) => {
  const [chooseLetters, setChooseLetters] = useState<string[]>([]);
  const [result, setResult] = useState<RouteResult[]>([]);

  const onChange = (values: string[]) => {
    setChooseLetters(values);
  };
  const onFindRoutes = () => {
    if (chooseLetters.length > 1) {
      setResult(getRoutesResult(chooseLetters[0], chooseLetters[chooseLetters.length - 1], routes));
    }
  };

  return (
    <Wrapper>
      <WrapperTagPart>
        <StyledTags label="New Stop" values={chooseLetters} onChange={onChange} letters={letters} />
        <CheckRoute onClick={onFindRoutes}>Check Route</CheckRoute>
      </WrapperTagPart>
      <WrapperOutPart>{JSON.stringify(result)}</WrapperOutPart>
    </Wrapper>
  );
};
export default CheckUserRouteComponent;

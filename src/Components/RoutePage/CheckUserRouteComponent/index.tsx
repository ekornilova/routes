import React, { FC, useState } from 'react';
import { getRoutesResult } from '../helpers';
import { TabPanelProps, RouteResult } from '../interfaces';
import { Wrapper, WrapperTagPart, StyledTags, CheckRoute, Header } from './styles';
import TabResult from '../TabResult';

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
      <Header>Choose your route stops:</Header>
      <WrapperTagPart>
        <StyledTags label="New Stop" values={chooseLetters} onChange={onChange} letters={letters} />
        <CheckRoute disabled={chooseLetters.length < 2} onClick={onFindRoutes}>
          Check Route
        </CheckRoute>
      </WrapperTagPart>
      <TabResult result={result} />
    </Wrapper>
  );
};
export default CheckUserRouteComponent;

import React, { FC, useState, useEffect } from 'react';
import { checkUserRoute } from '../helpers';
import { TabPanelProps, RouteResult } from '../interfaces';
import { Wrapper, WrapperTagPart, StyledTags, CheckRoute, Header } from './styles';
import TabResult from '../TabResult';

const CheckUserRouteComponent: FC<TabPanelProps> = ({ letters, routes, table }) => {
  const [chooseLetters, setChooseLetters] = useState<string[]>([]);
  const [result, setResult] = useState<RouteResult[]>([]);
  useEffect(() => {
    setChooseLetters([]);
    setResult([]);
  }, [routes]);
  const onChange = (values: string[]) => {
    setChooseLetters(values);
  };
  const onFindRoutes = () => {
    if (chooseLetters.length > 1) {
      setResult(checkUserRoute(chooseLetters, table));
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

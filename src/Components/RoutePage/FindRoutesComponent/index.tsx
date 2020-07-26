import React, { FC, useState, ChangeEvent } from 'react';
import { getRoutesResult } from '../helpers';
import { TabPanelProps, RouteResult } from '../interfaces';
import {
  Wrapper,
  WrapperSelectPart,
  SelectFrom,
  SelectTo,
  UpdateRoute,
  WrapperOutPart,
} from './styles';

const FindRoutesComponent: FC<TabPanelProps> = ({ letters, routes }) => {
  const [letterTo, setLetterTo] = useState<string>('');
  const [letterFrom, setLetterFrom] = useState<string>('');
  const [result, setResult] = useState<RouteResult[]>([]);

  const onFindRoutes = () => {
    setResult(getRoutesResult(letterTo, letterFrom, routes));
  };

  const onSelectChange = (isLetterTo?: boolean) => (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => {
    const setFunction = isLetterTo ? setLetterTo : setLetterFrom;
    setFunction(event.target.value as string);
  };
  const letterValues = letters.map((letter) => {
    return {
      id: letter,
      label: letter,
    };
  });
  return (
    <Wrapper>
      <WrapperSelectPart>
        <SelectTo
          forForm
          labelText="From"
          value={letterTo}
          values={letterValues}
          onChange={onSelectChange(true)}
        />
        <SelectFrom
          forForm
          labelText="To"
          value={letterFrom}
          values={letterValues}
          onChange={onSelectChange(true)}
        />
        <UpdateRoute disabled={!letterTo || !letterFrom} onClick={onFindRoutes}>
          FIND ROUTES
        </UpdateRoute>
      </WrapperSelectPart>
      <WrapperOutPart>{JSON.stringify(result)}</WrapperOutPart>
    </Wrapper>
  );
};
export default FindRoutesComponent;

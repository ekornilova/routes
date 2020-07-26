import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import { getRoutesResult } from '../helpers';
import { TabPanelProps, RouteResult } from '../interfaces';
import { columns } from './tableSettings';
import {
  Wrapper,
  WrapperSelectPart,
  SelectFrom,
  SelectTo,
  UpdateRoute,
  WrapperOutPart,
  StTable,
  WrapperResult,
} from './styles';

const FindRoutesComponent: FC<TabPanelProps> = ({ letters, routes }) => {
  const [letterTo, setLetterTo] = useState<string>('');
  const [letterFrom, setLetterFrom] = useState<string>('');
  const [result, setResult] = useState<RouteResult[]>([]);
  useEffect(() => {
    setLetterTo('');
    setLetterFrom('');
    setResult([]);
  }, [routes]);
  const onFindRoutes = () => {
    const newResult = getRoutesResult(letterFrom, letterTo, routes);
    setResult(newResult);
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
          value={letterFrom}
          values={letterValues}
          onChange={onSelectChange(false)}
        />
        <SelectFrom
          forForm
          labelText="To"
          value={letterTo}
          values={letterValues}
          onChange={onSelectChange(true)}
        />
        <UpdateRoute disabled={!letterTo || !letterFrom} onClick={onFindRoutes}>
          FIND ROUTES
        </UpdateRoute>
      </WrapperSelectPart>
      <WrapperResult>
        {result.length ? (
          <StTable columns={columns} rows={result} />
        ) : (
          <WrapperOutPart>No suitable routes</WrapperOutPart>
        )}
      </WrapperResult>
    </Wrapper>
  );
};
export default FindRoutesComponent;

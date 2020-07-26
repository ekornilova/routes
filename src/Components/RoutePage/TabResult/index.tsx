import React, { FC } from 'react';
import { RouteResult } from '../interfaces';
import { columns } from './tableSettings';
import { WrapperOutPart, StTable, WrapperResult } from './styles';

interface TabResultProps {
  result: RouteResult[];
}
const TabResult: FC<TabResultProps> = ({ result }) => {
  return (
    <WrapperResult>
      {result.length ? (
        <StTable columns={columns} rows={result} />
      ) : (
        <WrapperOutPart>No suitable routes</WrapperOutPart>
      )}
    </WrapperResult>
  );
};
export default TabResult;

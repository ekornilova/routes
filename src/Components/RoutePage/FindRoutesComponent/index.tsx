import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import { getRoutesResult } from '../helpers';
import { TabPanelProps, RouteResult } from '../interfaces';
import TabResult from '../TabResult';
import {
  Wrapper,
  WrapperSelectPart,
  SelectFrom,
  SelectTo,
  UpdateRoute,
  MaxCostInput,
  MaxStopInput,
  CanTwiceCheckBox,
  WrapperSettingsPart,
  CountRoutes,
} from './styles';

interface SettingI {
  letterTo: string;
  letterFrom: string;
  maxStop: number;
  maxCost: number;
  canTwice: boolean;
}
const defaultSettingValue = {
  letterTo: '',
  letterFrom: '',
  maxStop: 0,
  maxCost: 0,
  canTwice: false,
};
const FindRoutesComponent: FC<TabPanelProps> = ({ letters, routes, table }) => {
  const [setting, setSetting] = useState<SettingI>(defaultSettingValue);
  const [result, setResult] = useState<RouteResult[]>([]);
  useEffect(() => {
    setSetting(defaultSettingValue);
    setResult([]);
  }, [routes]);

  const { letterFrom, letterTo, maxStop, maxCost, canTwice } = setting;
  const onFindRoutes = () => {
    const newResult = getRoutesResult(
      letterFrom,
      letterTo,
      table,
      canTwice,
      Number(maxCost),
      Number(maxStop),
    );
    setResult(newResult);
  };
  const onLetterChange = (field: string) => (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => {
    setSetting((oldSetting) => {
      return {
        ...oldSetting,
        [field]: event.target.value as string,
      };
    });
  };
  const onMaxSettingChange = (field: string) => (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => {
    const num = (event.target.value || '').replace(/[\D]*/g, '');
    setSetting((oldSetting) => {
      return {
        ...oldSetting,
        [field]: num as string,
      };
    });
  };
  const onChangeCheckBox = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSetting((oldSetting) => {
      return {
        ...oldSetting,
        [field]: event.target.checked,
      };
    });
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
        <WrapperSettingsPart>
          <SelectTo
            forForm
            labelText="From"
            value={letterFrom}
            values={letterValues}
            onChange={onLetterChange('letterFrom')}
          />
          <SelectFrom
            forForm
            labelText="To"
            value={letterTo}
            values={letterValues}
            onChange={onLetterChange('letterTo')}
          />
          <MaxStopInput
            value={maxStop}
            onChange={onMaxSettingChange('maxStop')}
            labelText="Max stops"
          />
          <MaxCostInput
            value={maxCost}
            onChange={onMaxSettingChange('maxCost')}
            labelText="Max cost"
          />
          <CanTwiceCheckBox
            checked={canTwice}
            label="Using same route twice"
            onChange={onChangeCheckBox('canTwice')}
          />
        </WrapperSettingsPart>
        <UpdateRoute disabled={!letterTo || !letterFrom} onClick={onFindRoutes}>
          FIND ROUTES
        </UpdateRoute>
      </WrapperSelectPart>
      {!!result.length && <CountRoutes>{`Count of possible routes: ${result.length}`}</CountRoutes>}
      <TabResult result={result} />
    </Wrapper>
  );
};
export default FindRoutesComponent;

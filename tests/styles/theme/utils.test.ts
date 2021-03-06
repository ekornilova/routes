import { getRoutesFromStr, getRoutesResult } from '../../../src/Components/RoutePage/helpers';

const routes = `AB1, AC4`;
const routesArr = `[{"begin":"A","end":"B","cost":1,"id":"AB1","unicId":"AB"},{"begin":"A","end":"C","cost":4,"id":"AC4","unicId":"AC"}]`;
test(`function getRoutesFromStr expect to get from routesStr array with values routesArr`, () => {
  expect(JSON.stringify(getRoutesFromStr(routes).routes)).toEqual(routesArr);
});

const routes2 = `AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1`;
test(`function getRoutesResult expect to get from routes2 array with length 2`, () => {
  expect(getRoutesResult('E', 'D', getRoutesFromStr(routes2).table).length).toEqual(6);
});

test(`function getRoutesResult expect to get from routes2, max cost 11 - array with length 4`, () => {
  expect(getRoutesResult('E', 'E', getRoutesFromStr(routes2).table, false, 11).length).toEqual(4);
});

test(`function getRoutesResult expect to get from routes2,  max cost 20, canTwice true - array with length 4`, () => {
  expect(getRoutesResult('E', 'E', getRoutesFromStr(routes2).table, true, 20).length).toEqual(30);
});

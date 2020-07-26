import { getRoutesFromStr } from '../../../src/Components/RoutePage/helpers';

const routes = `AB1, AC4`;
const routesArr = `[{"begin":"A","end":"B","cost":1,"id":"AB1"},{"begin":"A","end":"C","cost":4,"id":"AC4"}]`;
test(`function getRoutesFromStr expect to get from routesStr array with values routesArr`, () => {
  expect(JSON.stringify(getRoutesFromStr(routes))).toEqual(routesArr);
});

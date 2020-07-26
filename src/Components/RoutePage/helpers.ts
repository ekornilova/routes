//  const routes = `AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1`
import { RouteI, RouteTree, RouteResult } from './interfaces';

export const getRoutesFromStr = (
  routesStr: string,
): {
  routes: RouteI[];
  letters: string[];
} => {
  const routes = routesStr.replace(/[\s]/g, '');
  const letters = new Set();
  const routesResult = routes.split(',').reduce((result: RouteI[], route: string) => {
    if (route.match(/^[a-z]{2}[0-9]+$/i)) {
      const [begin, end] = route.slice(0, 2).split('');
      const routeObj: RouteI = {
        begin,
        end,
        cost: Number(route.slice(2)),
        id: route,
      };
      result.push(routeObj);
      letters.add(begin);
      letters.add(end);
    }
    return result;
  }, []);

  return {
    routes: routesResult,
    letters: Array.from(letters) as string[],
  };
};
// const defaultDeliveryRoute = {
//   routeStr: '',
//   cost: 0,
//   routeArr: []
// }
const defaultResult: RouteTree = {
  route: [],
  cost: 0,
  routes: [],
  ids: {},
};
export const getNextRoute = (result: RouteTree, route: RouteI): RouteTree => {
  const newRoute = result.route.concat([route.end]);
  const { cost, ids: oldIds } = result;
  const ids = {
    ...oldIds,
  };
  if (ids[route.id]) {
    ids[route.id] += 1;
  } else {
    ids[route.id] = 1;
  }
  const newRouteForArr = {
    routes: [],
    route: newRoute,
    cost: cost + route.cost,
    ids,
  };
  return newRouteForArr;
};
export const getDeliveryRoute = (
  routesArr: RouteI[],
  beginL: string,
  endL: string,
  result: RouteTree,
  canTwice?: boolean,
): RouteTree => {
  const findRoute = routesArr.find((route) => route.begin === beginL && route.end === endL);
  if (!findRoute) {
    const possibleRoutes = routesArr.filter((route) => {
      const extraCondition = canTwice
        ? !result.ids[route.id] || result.ids[route.id] < 2
        : !result.ids[route.id];
      return route.begin === beginL && extraCondition;
    });
    if (possibleRoutes.length) {
      possibleRoutes.forEach((route) => {
        const newRouteForArr = getNextRoute(result, route);
        const continueRoute = getDeliveryRoute(routesArr, route.end, endL, newRouteForArr);
        if (
          !continueRoute.routes.length &&
          continueRoute.route[continueRoute.route.length - 1] !== endL
        ) {
          return;
        }
        result.routes.push(continueRoute);
      });
    }
    return result;
  }
  const findNextRoute = getNextRoute(result, findRoute);
  result.routes.push(findNextRoute);
  return result;
};
export const goTreeResult = (tree: RouteTree, routes: RouteResult[]) => {
  if (!tree.routes.length) {
    routes.push({
      route: tree.route,
      cost: tree.cost,
    });
  } else {
    tree.routes.forEach((treeRoute) => {
      goTreeResult(treeRoute, routes);
    });
  }
};
export const getRoutesResult = (
  beginLetter: string,
  endLetter: string,
  routesArr: RouteI[],
): RouteResult[] => {
  //   const routesArr = getRoutes(routes);
  const result = getDeliveryRoute(routesArr, beginLetter, endLetter, {
    ...defaultResult,
    route: [beginLetter],
  });
  //   console.log('result', JSON.stringify(result))
  const treeResult: RouteResult[] = [];
  goTreeResult(result, treeResult);
  return treeResult;
  //   console.log('treeResult', JSON.stringify(treeResult), treeResult.length)
};
// getResult('E','E');
// // getResult('D','E');

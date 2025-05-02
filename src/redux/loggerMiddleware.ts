const loggerMiddleware =
  (store: { getState: () => any }) =>
  (next: (arg0: any) => any) =>
  (action: any) => {
    // console.log("Dispatching action:", action);
    const result = next(action); // Pass the action to the next middleware or the reducer
    // console.log("New state:", store.getState()); // Log the new state after the action is dispatched
    return result;
  };

export default loggerMiddleware;

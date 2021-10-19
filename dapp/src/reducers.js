import { Actions } from "./constants";

const deepMergeState = (payload, oldState) => {
  return ["balances", "staking", "migrate", "bonding", "exercise"].reduce((newState, prop) => {
    return {
      ...newState,
      [prop]: {
        ...oldState[prop],
        ...payload[prop],
      },
    };
  }, {});
};

export function app(state = {}, action) {
  switch (action.type) {
    case Actions.FETCH_APP_SUCCESS:
      return deepMergeState(action.payload, state);
    case Actions.FETCH_ACCOUNT_SUCCESS:
      return deepMergeState(action.payload, state);
    case Actions.FETCH_STAKE_SUCCESS:
      return deepMergeState(action.payload, state);
    case Actions.FETCH_MIGRATE_SUCCESS:
      return deepMergeState(action.payload, state);
    case Actions.FETCH_EXERCISE_SUCCESS:
      return deepMergeState(action.payload, state);
    default:
      return state;
  }
}

export function bonding(state = {}, action) {
  switch (action.type) {
    case Actions.FETCH_BOND_SUCCESS:
      if (action.payload && action.payload.bond) {
        return {
          ...state,
          [action.payload.bond]: {
            ...state[action.payload.bond],
            ...action.payload,
          },
        };
      }
    default:
      return state;
  }
}

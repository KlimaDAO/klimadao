import { Actions } from "./constants";

const deepMergeState = (payload, oldState) => {
  return {
    ...oldState,
    bonding: { ...oldState.bonding, ...payload.bonding },
    balances: { ...oldState.balances, ...payload.balances },
    staking: { ...oldState.staking, ...payload.staking },
    migrate: { ...oldState.migrate, ...payload.migrate },
    exercise: { ...oldState.exercise, ...payload.exercise },
  };
};

export function app(state = {}, action) {
  switch (action.type) {
    case Actions.FETCH_APP_SUCCESS:
      return { ...state, ...action.payload };
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

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
    case Actions.INCREMENT_STAKE:
      return {
        ...state,
        balances: {
          ...state.balances,
          ohm: (Number(state.balances.ohm) - Number(action.payload)).toString(),
          sohm: (Number(state.balances.sohm) + Number(action.payload)).toString(),
        },
      };
    case Actions.DECREMENT_STAKE:
      return {
        ...state,
        balances: {
          ...state.balances,
          ohm: (Number(state.balances.ohm) + Number(action.payload)).toString(),
          sohm: (Number(state.balances.sohm) - Number(action.payload)).toString(),
        },
      };
    case Actions.INCREMENT_STAKE_APPROVAL:
      return {
        ...state,
        staking: {
          ...state.staking,
          ohmStake: action.payload,
        },
      };
    case Actions.INCREMENT_UNSTAKE_APPROVAL:
      return {
        ...state,
        staking: {
          ...state.staking,
          ohmUnstake: action.payload,
        },
      };
    case Actions.INCREMENT_PKLIMA_APPROVAL:
      return {
        ...state,
        exercise: {
          ...state.exercise,
          pExercise: action.payload,
        },
      };
    case Actions.INCREMENT_BCT_APPROVAL:
      return {
        ...state,
        exercise: {
          ...state.exercise,
          bctExercise: action.payload,
        },
      };
    case Actions.DECREMENT_PKLIMA:
      return {
        ...state,
        balances: {
          ...state.balances,
          pKLIMA: (Number(state.balances.pKLIMA) - Number(action.payload)).toString(),
          ohm: (Number(state.balances.ohm) + Number(action.payload)).toString(),
        },
        exercise: {
          ...state.exercise,
          pklimaVestable: (Number(state.exercise.pklimaVestable) - Number(action.payload)).toString(),
        },
      };
    case Actions.INCREMENT_AKLIMA_APPROVAL:
      return {
        ...state,
        migrate: {
          ...state.migrate,
          aKlimaAllowance: action.payload,
        },
      };
    case Actions.INCREMENT_ALKLIMA_APPROVAL:
      return {
        ...state,
        migrate: {
          ...state.migrate,
          alKlimaAllowance: action.payload,
        },
      };
    case Actions.DECREMENT_AKLIMA:
      return {
        ...state,
        balances: {
          ...state.balances,
          aKLIMA: (Number(state.balances.aKLIMA) - Number(action.payload)).toString(),
          ohm: (Number(state.balances.ohm) + Number(action.payload)).toString(),
        },
      };
    case Actions.DECREMENT_ALKLIMA:
      return {
        ...state,
        balances: {
          ...state.balances,
          alKLIMA: (Number(state.balances.alKLIMA) - Number(action.payload)).toString(),
          ohm: (Number(state.balances.ohm) + Number(action.payload)).toString(),
        },
      };
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
//

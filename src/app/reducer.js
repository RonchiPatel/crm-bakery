const SET_INDICATOR = "SET_INDICATOR";

export const set_indicator = (data) => {
  return { type: SET_INDICATOR, payload: data };
};

const initialState = {
  indicator: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INDICATOR:
      return { indicator: action.payload };

    default:
      return state;
  }
};

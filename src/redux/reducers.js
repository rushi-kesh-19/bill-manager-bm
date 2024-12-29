import { 
  ADD_BILL, 
  EDIT_BILL, 
  REMOVE_BILL, 
  SET_FILTER, 
  SET_BUDGET, 
  HIGHLIGHT_BILLS 
} from "./actions";

const initialState = {
  bills: [],
  filter: "All",
  budget: 0,
  highlightedBills: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BILL:
      return { 
        ...state, 
        bills: [...state.bills, action.payload] 
      };

    case EDIT_BILL:
      return {
        ...state,
        bills: state.bills.map((bill) =>
          bill.id === action.payload.id ? { ...bill, ...action.payload } : bill
        ),
      };

    case REMOVE_BILL:
      return { 
        ...state, 
        bills: state.bills.filter((bill) => bill.id !== action.payload) 
      };

    case SET_FILTER:
      return { 
        ...state, 
        filter: action.payload 
      };

    case SET_BUDGET:
      return { 
        ...state, 
        budget: action.payload 
      };

    case HIGHLIGHT_BILLS:
      return { 
        ...state, 
        highlightedBills: action.payload 
      };

    default:
      return state;
  }
};

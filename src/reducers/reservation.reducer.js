import { userConstants } from '../constants';

export function reservation(state = {}, action) {
  switch (action.type) {
    case userConstants.RESERVATION_REQUEST:
      return { addingReservation: true };
    case userConstants.RESERVATION_SUCCESS:
      return {};
    case userConstants.RESERVATION_FAILURE:
      return {};
    default:
      return state
  }
}
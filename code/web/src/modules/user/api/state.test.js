import { ADD_USER_STYLE} from './actions';
import { userUpdates } from './state'
describe('State', () => {
    it('should update the user\'s style in state', () => {
      const initialState = {
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null,
      }
      const userDetails = {id: 1, style: 'colonial' }
      const expectedAction = {
        type: ADD_USER_STYLE,
        user: userDetails.style,
      }
      const result = userUpdates(initialState, expectedAction)
      expect(result).toEqual({
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: {
          style: 'colonial'
        },
      })
    })
  })

import * as fromAuth from './auth.actions';
import { User } from './user.model';

export interface State  {
    user: User;
}

const initState: State = {
    user:  null
};

export function authReducer  ( state = initState, action: fromAuth.Actions  ): State {

    switch ( action.type )  {

            case fromAuth.SET_USER:
            return {
                user: { ... action.user }
            };

            case fromAuth.UNSET_USER:
            return {
                user: null
            };

            default:
            return state;
    }

}

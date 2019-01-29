import * as fromAuth from './auth.actions';
import { User } from './user.model';


export interface State  {
    user: User;
}

const initState: State = {
    user:  null
};

export function uiReducer  ( state = initState, action: fromAuth.Actions  ): State {

    switch ( action.type )  {

            case fromAuth.SET_USER:
            return {
                user: { ... action.user }
            };

            default:
            return state;
    }

}

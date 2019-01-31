import * as fromIU from './ui.actions';


export interface State  {
    isLoading: boolean;
}

const initState: State = {
    isLoading: true
};

export function uiReducer  ( state = initState, action: fromIU.Actions  ): State {

    switch ( action.type )  {

            case fromIU.BEGIN_LOADING:
            return {
                isLoading: true
            };

            case fromIU.END_LOADING:
            return {
                isLoading: false
            };

            default:
            return state;
    }

}

import * as fromItems from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface State  {
    itemsIngresoEgreso: IngresoEgreso[];
}
export interface IngresoEgresoAppState extends AppState {
    IngresoEgreso: State;
}

const initState: State = {
    itemsIngresoEgreso: []
};

export function IngresoEgresoReducer  ( state = initState, action: fromItems.Actions  ): State {

    switch ( action.type )  {

            case fromItems.SET_ITEMS:
            return {
                itemsIngresoEgreso: [
                             ...action.item
                              .map( i =>  {
                                 return {
                                     ...i
                                 };
                             })
                ]
            };

            case fromItems.UNSET_ITEMS:
            return {
                itemsIngresoEgreso: []
            };

            default:
            return state;
    }

}

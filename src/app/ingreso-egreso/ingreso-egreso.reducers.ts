import * as fromItems from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';



export interface State  {
    itemsIngresoEgreso: IngresoEgreso[];
}

const initState: State = {
    itemsIngresoEgreso: []
};

export function uiReducer  ( state = initState, action: fromItems.Actions  ): State {

    switch ( action.type )  {

            case fromItems.SET_ITEMS:
            return {
                itemsIngresoEgreso: [
                             ...action.item
                             // .map( i =>  {
                            //     return {
                            //         ...i
                            //     };
                            // })
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

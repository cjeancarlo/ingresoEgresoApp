import { ActionReducerMap } from '@ngrx/store';
import * as fromUi from './shared/ui.reducers';
import * as fromAuth from './auth/auth.reducers';
import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducers'

export interface AppState {
    ui: fromUi.State;
    userAuth: fromAuth.State;
    ingresoEgreso: fromIngresoEgreso.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    ui: fromUi.uiReducer,
    userAuth: fromAuth.uiReducer,
    ingresoEgreso: fromIngresoEgreso.uiReducer
};

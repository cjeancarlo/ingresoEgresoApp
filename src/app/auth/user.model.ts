interface userObject {
    nombre: string;
    email: string;
    uid: string;
}

export class User {

    public nombre: string;
    public email: string;
    public uid: string;

    constructor( obj: userObject ) {
        this.nombre = obj && obj.nombre || null;
        this.email  = obj && obj.email  || null;
        this.uid    = obj && obj.uid    || null;
    }

}

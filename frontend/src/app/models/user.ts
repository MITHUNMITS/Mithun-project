import {ResponseError} from "./response-error";

export class Users {
    id: number = 0;
    email: string = "";
    password: string = "";
    name : string = "";
    phone : string = "";
    type:number = 0;
    status:number=0;
    licence:string="";

    public static saveToLocalStorage(user: Users) {
        localStorage.setItem('MSaloodoUser', JSON.stringify(user));
    }
    public static getFromLocalStorage(): Users {
        let local = localStorage.getItem('MSaloodoUser')
        return local ? JSON.parse(local) : null;
    }
    /**
     * Remove user from storage
     */
    public static removeFromLocalStorage() {
        localStorage.removeItem('MSaloodoUser');
    }
    /**
     * 
     * @param isUser 
     * @returns User
     */
    public static getCurrentUser(isUser: boolean = true): Users {
        let currentUser: Users = new Users();
        if (Users.getFromLocalStorage()) {
            currentUser = Users.getFromLocalStorage();
        }
        return currentUser;
    }
}

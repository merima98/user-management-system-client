import { set } from "react-hook-form";
import create, { SetState } from "zustand";
import { User } from "./models/User";

type Auth = {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean, userId: string, token?: string) => void;
    setLoggedOut: (value: boolean) => void;
};

type Users = {
    stateUsers: User[];
    setUsers: (value: {
        email: string;
        firstName: string;
        id: number;
        lastName: string;
        password: string;
        permissionId: number;
        status: number;
        username: string;
    }) => void;
};


const useAuth = create<Auth>((set: SetState<Auth>) => ({
    isLoggedIn: Boolean(window.localStorage.getItem("token")) || false,
    setIsLoggedIn: (value: boolean, userId: string, token?: string) => {
        if (value && token) {
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("userId", userId.toString());
            return set({ isLoggedIn: value });
        }
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userId");
        return set({ isLoggedIn: value });
    },
    setLoggedOut(value: boolean) {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userId");
        return set({ isLoggedIn: value });
    }
}));

const useUsers = create<Users>((set: SetState<Users>) => ({
    stateUsers: [],
    setUsers(value: any) {
        return set({ stateUsers: [...value] });
    }
}))


export { useAuth, useUsers, };
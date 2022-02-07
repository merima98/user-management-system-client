import create, { SetState } from "zustand";

type Auth = {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean, userId: string, token?: string) => void;
    setLoggedOut: (value: boolean) => void;
};
type User = {
    userId: string | null;
    setUserId: (userId: string) => void;
    removeUserId: () => void;
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

const useUser = create<User>((set: SetState<User>) => ({
    userId: window.localStorage.getItem("userId") || null,
    setUserId: (userId: string) => {
        window.localStorage.setItem("userId", userId.toString());
        return set({ userId: userId });
    },
    removeUserId() {
        window.localStorage.removeItem("userId");
        return set({ userId: null });
    }
}));

export { useAuth, useUser };
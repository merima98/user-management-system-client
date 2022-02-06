import UserListHeader from "../components/header/UserListHeader";
import Login from "../components/Login";
import NewUserForm from "../components/user/NewUserForm";
import UserDetails from "../components/user/UserDetails";

const LOGGED_IN_DEFAULT_LAYOUT_ROUTES = [
    {
        path: "/",
        element: UserListHeader,
    },
    {
        path: "/new-user",
        element: NewUserForm,
    },
    {
        path: "/user/:id",
        element: UserDetails,
    },
];

const LOGGED_OUT_NO_LAYOUT_ROUTES = [
    {
        path: "/",
        element: UserListHeader,
    },
    {
        path: "/login",
        element: Login,
    },
];

export { LOGGED_OUT_NO_LAYOUT_ROUTES, LOGGED_IN_DEFAULT_LAYOUT_ROUTES };
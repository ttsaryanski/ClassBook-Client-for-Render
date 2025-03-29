import { api } from "../utils/requester";

const endPoints = {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    profile: "/auth/profile",
    editProfile: "/auth",
};

async function register(data) {
    return await api.post(endPoints.register, data);
}

async function login(data) {
    return await api.post(endPoints.login, data);
}

async function logout() {
    return await api.post(endPoints.logout);
}

async function profile(signal) {
    const user = await api.get(endPoints.profile, signal);

    return user;
}

async function editUser(id, data) {
    const editedUser = await api.put(endPoints.editProfile + `/${id}`, data);

    return editedUser;
}

export const authService = {
    register,
    login,
    logout,
    profile,
    editUser,
};

import { api } from "../utils/requester";

const endPoints = {
    getAll: "/teacher",
    // createNew: '/data/cars',
    // apiById: "/item",
    search: (query) => `/teacher?email=${query}`,
};

async function getAll(signal) {
    return await api.get(endPoints.getAll, signal);
}

async function createNew(data) {
    return await api.post(endPoints.getAll, data);
}

async function getById(id, signal) {
    return await api.get(endPoints.getAll + `/${id}`, signal);
}

async function editById(id, data) {
    return await api.put(endPoints.getAll + `/${id}`, data);
}

async function delById(id) {
    return await api.del(endPoints.getAll + `/${id}`);
}

async function searchTeacher(query, signal) {
    return await api.get(endPoints.search(query, signal));
}

// async function getMyCar(userId) {
//     return await api.get(endPoints.getMyCar(userId));
// }

export const teacherService = {
    getAll,
    createNew,
    getById,
    editById,
    delById,
    searchTeacher,
    // getMyCar
};

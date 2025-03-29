import { api } from "../utils/requester";

const endPoints = {
    getAll: "/clss",
    // createNew: '/data/cars',
    // apiById: "/item",
    // search: (query) => `/data/cars?where=year%3D${query}`,
    getMyClasses: (teacherId) => `/teacher?_ownerId=${teacherId}`,
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

async function getByIdPopulate(id, signal) {
    return await api.get(endPoints.getAll + `/${id}/populate`, signal);
}

async function editById(id, data) {
    return await api.put(endPoints.getAll + `/${id}`, data);
}

async function delById(id) {
    return await api.del(endPoints.getAll + `/${id}`);
}

// async function searchItem(query) {
//     return await api.get(endPoints.search(query));
// }

async function getMyClasses(userId, signal) {
    return await api.get(endPoints.getMyClasses(userId, signal));
}

export const clssService = {
    getAll,
    createNew,
    getById,
    getByIdPopulate,
    editById,
    delById,
    getMyClasses,
};

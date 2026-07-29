// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:3000/api/auth",
//     withCredentials: true
// });

// export async function register({ name, username, email, password }) {
//     const response = await api.post("/register", { name, username, email, password });
//     return response.data;
// }

// export async function login({ username, email, password }) {
//     const response = await api.post("/login", { username, email, password });
//     return response.data;
// }
// export async function getMe() {
//     const response = await api.get("/get-Me");
//     return response.data;
// }
// export async function logout() {
//     const response = await api.get("/logout");
//     return response.data;
// }

import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
    withCredentials: true,
});

export async function register({ name, username, email, password }) {
    const response = await api.post("/register", { name, username, email, password });
    return response.data;
}

export async function login({ username, email, password }) {
    const response = await api.post("/login", { username, email, password });
    return response.data;
}

export async function getMe() {
    const response = await api.get("/get-Me");
    return response.data;
}

export async function logout() {
    const response = await api.get("/logout");
    return response.data;
}

// frontend/src/api.js

import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const register = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const getPosts = () => axios.get(`${API_URL}/posts`, { headers: { 'x-auth-token': localStorage.getItem('token') } });
export const createPost = (postData) => axios.post(`${API_URL}/posts`, postData, { headers: { 'x-auth-token': localStorage.getItem('token') } });
export const updatePost = (id, postData) => axios.put(`${API_URL}/posts/${id}`, postData, { headers: { 'x-auth-token': localStorage.getItem('token') } });
export const deletePost = (id) => axios.delete(`${API_URL}/posts/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') } });

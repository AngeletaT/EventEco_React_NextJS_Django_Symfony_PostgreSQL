import axios from "axios";

export const djangoAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DJANGO_P,
});

export const symfonyAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SYMFONY_P,
});

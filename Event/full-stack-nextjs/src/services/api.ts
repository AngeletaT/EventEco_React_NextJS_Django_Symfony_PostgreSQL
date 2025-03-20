import axios from "axios";

export const djangoAPI_E = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DJANGO_E,
});

export const symfonyAPI_E = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SYMFONY_E,
});

export const djangoAPI_P = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DJANGO_P,
});

export const symfonyAPI_P = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SYMFONY_P,
});

export const ultramessage = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ULTRAMESSAGE,
});

export const resend = axios.create({
    baseURL: process.env.NEXT_PUBLIC_RESEND,
});

export const stripe = axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRIPE,
});

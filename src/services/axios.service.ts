import { useUserStore } from '@/stores/userStore';
import axios from 'axios';
import { storeToRefs } from 'pinia';

const DEFAULT_TIMEOUT = 10000;
const UNAUTHORIZED = 401;



export const axiosInstance = axios.create({
    // baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000',
    // baseURL: 'https://cream-api/api',
    baseURL: 'https://localhost:8081/api',
    timeout: DEFAULT_TIMEOUT,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        console.log('intercepted request', config);
        // const userStore = useUserStore();

        // const { hash, auth_date, user } = userStore;

        // if (!hash || !auth_date || !user) {
        //     throw new Error('User is not authenticated from Telegram');
        // }

        // config.headers['auth_data'] = { hash, auth_date, user };

        return config;
    }
)

axiosInstance.interceptors.response.use(
    async (response) => {
        console.log('intercepted response', response);

        const { auth_date, hash, user } = useUserStore();

        if (response.status !== UNAUTHORIZED) {
            return response;
        }

        const { status, data } = await axiosInstance.post(
            '/auth/refresh',
            { hash, auth_date, user }
        )

        if (status > 299) {
            throw new Error('User is not authenticated from Telegram');
        }

        console.log('User is authenticated from Telegram', data);

        return axiosInstance.request(response.config);
    }
)
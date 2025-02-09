import axios from 'axios';
import * as GoogleService from '~/Services/GoogleService';
import { store } from '~/redux/store';
import { logout } from '~/redux/slices/userSlice';
import { toast } from 'react-toastify';

// Create Axios (authorizedAxiosInstance) purpose for use custom and configuration for project
let authorizedAxiosInstance = axios.create();

// Max time waiting for a request is 10 minutes
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;

// WithCredentials is true to send cookies with requests (Use for save token in cookies) when httpOnly is true in backend
authorizedAxiosInstance.defaults.withCredentials = true;

// Configuration Interceptors
authorizedAxiosInstance.interceptors.request.use(
    (config) => {
        // // Before request is sent then get accessToken from local storage to check accessToken
        // const accessToken = localStorage.getItem('accessToken');

        // if (accessToken) {
        //     // Bearer is comply with the OAuth 2.0 bearer token usage
        //     config.headers.Authorization = `Bearer ${accessToken}`;
        // }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Create a promise to call api refresh token
// Purpose to receive request api refresh token first then hold call api refresh token until complete then retry
// before call api error instead of calling api refresh token continuous
let refreshTokenPromise = null;

authorizedAxiosInstance.interceptors.response.use(
    (response) => {
        // Do something with response data
        return response;
    },
    (error) => {
        // Any http status code that lie within the range of 200 - 299 will is error

        // Important area: Handle refresh token
        // If receive status code is 401 BE then call logout
        if (error.response?.status === 401) {
            // Logout google
            GoogleService.LogoutGoogle();

            // Remove user info in local storage
            localStorage.removeItem('user');

            // Logout info user in redux
            store.dispatch(logout());

            // Navigation to home page
            window.location.href = '/';
        }

        // If receive status code is 410 GONE from BE then call API refresh token
        // Firstly, need get request API error from error.config
        const originalRequest = error.config;

        if (error.response?.status === 410 && originalRequest) {
            if (!refreshTokenPromise) {
                // TH1: Get refreshToken from local storage
                // const refreshToken = localStorage.getItem('refreshToken');

                // TH2: Get refreshToken from cookies
                // No need get refreshToken

                // Call API refresh token
                refreshTokenPromise = GoogleService.RefreshToken() // Th1: Local storage then pass refreshToken as a parameter
                    .then(() => {
                        // Th1: Local storage
                        // Take and reassign accessToken
                        // const { accessToken } = res.data;
                        // localStorage.setItem('accessToken', accessToken);
                        // authorizedAxiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
                        // Th2: Cookies
                        // Access token is saved in cookies, no need to do anything
                    })
                    .catch((_err) => {
                        // If any error form api refresh token then call logout
                        GoogleService.LogoutGoogle();
                        localStorage.removeItem('user');
                        store.dispatch(logout());
                        window.location.href = '/';
                        // Return error
                        return Promise.reject(_err);
                    })
                    .finally(() => {
                        //Thought api refresh token success or error set refreshTokenPromise = null
                        refreshTokenPromise = null;
                    });
            }

            // Finally, return refreshTokenPromise when success
            return refreshTokenPromise.then(() => {
                // Return axios instance our combined with the originalRequest to call initial api error
                return authorizedAxiosInstance(originalRequest);
            });
        }

        // Centralized error handling displays error messages returned from api (Write code once)
        // console.log(error) will display the error message returned from the api
        // Uses toastify to display error messages - Except error 410 to refresh token
        if (error.response?.status !== 410) {
            toast.error(error.response?.data.message || error?.message);
        }
        return Promise.reject(error);
    },
);

export default authorizedAxiosInstance;

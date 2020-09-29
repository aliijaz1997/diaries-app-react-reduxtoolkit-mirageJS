import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';

// 1 we have to make an instance for baseURL

const instance : AxiosInstance = axios.create({
    baseURL: 'api',

    // you can write much more properties
}) 

instance.interceptors.response.use(
    // what this async function will do fetch the respnse and will check 
    // the status because the standard code should be in the range of 2xx
    // otherwise error will be occur
    async (response : AxiosResponse) : Promise <any> => {
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
    },
    (error : AxiosError) => {
         const {response , request} : {response ?: AxiosResponse , request ?: XMLHttpRequest} = error;
         if (response) {
             if (response.status >= 400 && response.status < 500)
             {
                 return null;
             }
         } else if (request) {
             return null;
         }

         return Promise.reject(error);

    }
)
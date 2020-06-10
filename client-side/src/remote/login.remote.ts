import { internalAxios } from './internal-axios'
import { LoginCredentials } from '../models/LoginCredentials';


export const checkLoginCredentials = async (loginCredentials: LoginCredentials) => {
    const response = await internalAxios.post('/authentication/login', loginCredentials);
    return response;
}

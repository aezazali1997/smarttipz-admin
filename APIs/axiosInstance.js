import axios from "axios";
export const USER_API_BASE_URL = process.env.BASE_URL;
import { parseCookies } from 'nookies';

class AxiosInstance {

    getUserInfo() {
        const cookie = parseCookies();
        let token = cookie?.token || null;
        // console.log('token', token);
        return token;
    }

    getAuthHeader() {
        return { headers: { Authorization: "Bearer " + this.getUserInfo() } };
    }

    async signup(payload) {
        console.log('In signup API')
        return await axios.post(USER_API_BASE_URL + "api/user/signup", payload);
    }

    async login(credentials) {
        console.log(USER_API_BASE_URL, process.env.BASE_URL)
        return await axios.post(USER_API_BASE_URL + "api/auth/signin", credentials);
    }

    async authenticate(payload) {
        return await axios.post(USER_API_BASE_URL + "api/user/authenticate", payload);
    }

    async forgetPassword(email) {
        return await axios.post(USER_API_BASE_URL + "api/auth/forgot", { email });
    }

    async changePassword(data) {
        return await axios.put(USER_API_BASE_URL + "api/user/password", data, this.getAuthHeader());
    }

    async resendOTP(data) {
        return await axios.post(USER_API_BASE_URL + "api/user/resend", data);
    }


    async getAllAdmins() {
        console.log('In request GetAllAdmin Api: ');
        return await axios.get(USER_API_BASE_URL + "api/admin", this.getAuthHeader());
    }

    async setAdminRole(id, payload) {
        console.log('In set Admin Role Api: ');
        return await axios.put(USER_API_BASE_URL + `api/admin/${id}`, payload, this.getAuthHeader());
    }

    async createAdmin(payload) {
        console.log('In createAdmin API')
        return await axios.post(USER_API_BASE_URL + "api/admin", payload, this.getAuthHeader());
    }

    async editAdmin(payload) {
        console.log('In editAdmin API')
        return await axios.put(USER_API_BASE_URL + "api/admin", payload, this.getAuthHeader());
    }

    async deleteAdmin(id) {
        console.log('In delete Admin Api: ');
        return await axios.delete(USER_API_BASE_URL + `api/admin/${id}`, this.getAuthHeader());
    }

    async getAllBusinessUsers() {
        console.log('In request GetAllBusinessUsers Api: ');
        return await axios.get(USER_API_BASE_URL + "api/user/business", this.getAuthHeader());
    }

    async verifyBusinessUser(id) {
        console.log('In verify business user API')
        return await axios.post(USER_API_BASE_URL + "api/user/business/verify", id, this.getAuthHeader());
    }

    async blockBusinessUser(payload) {
        console.log('In block business user API')
        return await axios.post(USER_API_BASE_URL + "api/user/business/block", payload, this.getAuthHeader());
    }

    async editVerifiedBusinessUser(payload) {
        console.log('In edit Verified Business User API: ');
        return await axios.put(USER_API_BASE_URL + "api/user/business", payload, this.getAuthHeader());
    }

    async deleteBusinessUser(id) {
        console.log('In delete Business User Api: ');
        return await axios.delete(USER_API_BASE_URL + `api/user/business/${id}`, this.getAuthHeader());
    }

    async getAllPersonalUsers() {
        console.log('In request Get All Personal Users Api: ');
        return await axios.get(USER_API_BASE_URL + "api/user/personal", this.getAuthHeader());
    }
    async editPersonalUser(payload) {
        console.log('In edit Personal User API: ');
        return await axios.put(USER_API_BASE_URL + "api/user/personal", payload, this.getAuthHeader());
    }

    async deletePersonalUser(id) {
        console.log('In delete Personal User Api: ');
        return await axios.delete(USER_API_BASE_URL + `api/user/personal/${id}`, this.getAuthHeader());
    }



}

export default new AxiosInstance;
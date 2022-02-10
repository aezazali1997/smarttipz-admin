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
        console.log("trying to loogin");
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


    async getAllAdmins(search) {
        console.log('In request GetAllAdmin Api: ');
        return await axios.get(USER_API_BASE_URL + `api/admin?search=${search}`, this.getAuthHeader());
    }

    async setAdminAccess(id, payload) {
        console.log('In set Admin Access Api: ');
        return await axios.put(USER_API_BASE_URL + `api/admin/${id}`, payload, this.getAuthHeader());
    }

    async createAdmin(payload) {
        console.log('In createAdmin API', payload)
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

    async getAllBusinessUsers(search) {
        console.log('In request GetAllBusinessUsers Api: ');
        return await axios.get(USER_API_BASE_URL + `api/user/business?search=${search}`, this.getAuthHeader());
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

    async getAllPersonalUsers(search) {
        console.log('In request Get All Personal Users Api: ');
        return await axios.get(USER_API_BASE_URL + `api/user/personal?search=${search}`, this.getAuthHeader());
    }
    async editPersonalUser(payload) {
        console.log('In edit Personal User API: ');
        return await axios.put(USER_API_BASE_URL + "api/user/personal", payload, this.getAuthHeader());
    }

    async deletePersonalUser(id) {
        console.log('In delete Personal User Api: ');
        return await axios.delete(USER_API_BASE_URL + `api/user/personal/${id}`, this.getAuthHeader());
    }

    async getContentVideos(search, page) {
        console.log('In Get User Media Content Api: ');
        return await axios.get(USER_API_BASE_URL + `api/admin/content?search=${search}&&page=${page}`, this.getAuthHeader());
    }

    async removeVideo(values) {
        console.log('In remove Video Content Api: ');
        return await axios.post(USER_API_BASE_URL + `api/admin/content`, values, this.getAuthHeader());
    }

    async changePassword(values) {
        console.log('In Change Password Api: ');
        return await axios.put(USER_API_BASE_URL + `api/user/change-password`, values, this.getAuthHeader());
    }

    async getUserProfile(username) {
        console.log('In Get user profile Api: ');
        return await axios.get(USER_API_BASE_URL + `api/user/profile?username=${username}`, this.getAuthHeader());
    }

    async getVideos(username) {
        return await axios.get(USER_API_BASE_URL + `api/user/profile/videos?username=${username}`, this.getAuthHeader());
    }

    async getCatalogues(username) {
        return await axios.get(USER_API_BASE_URL + `api/user/profile/catalogue?username=${username}`, this.getAuthHeader());
    }

    async getBusinessCard(username) {
        return await axios.get(USER_API_BASE_URL + `api/user/profile/businesscard?username=${username}`, this.getAuthHeader());
    }

    async getTestimonial(username) {
        return await axios.get(USER_API_BASE_URL + `api/user/profile/testimonial?username=${username}`, this.getAuthHeader());
    }
    async getFollow(username) {
        return await axios.get(USER_API_BASE_URL + `api/user/profile/follow?username=${username}`, this.getAuthHeader());
    }

}

export default new AxiosInstance;
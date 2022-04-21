import axios from "axios";
export const USER_API_BASE_URL = process.env.BASE_URL;
import { parseCookies } from 'nookies';

class AxiosInstance {

    getUserInfo() {
        const cookie = parseCookies();
        let token = cookie?.token || null;
        return token;
    }

    getAuthHeader() {
        return { headers: { Authorization: "Bearer " + this.getUserInfo() } };
    }

    async signup(payload) {
        return await axios.post(USER_API_BASE_URL + "api/user/signup", payload);
    }

    async login(credentials) {
       
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
        return await axios.get(USER_API_BASE_URL + `api/admin?search=${search}`, this.getAuthHeader());
    }

    async setAdminAccess(id, payload) {
        return await axios.put(USER_API_BASE_URL + `api/admin/${id}`, payload, this.getAuthHeader());
    }

    async createAdmin(payload) {
        return await axios.post(USER_API_BASE_URL + "api/admin", payload, this.getAuthHeader());
    }

    async editAdmin(payload) {
        return await axios.put(USER_API_BASE_URL + "api/admin", payload, this.getAuthHeader());
    }

    async deleteAdmin(id) {
        return await axios.delete(USER_API_BASE_URL + `api/admin/${id}`, this.getAuthHeader());
    }

    async getAllBusinessUsers(search) {
        return await axios.get(USER_API_BASE_URL + `api/user/business?search=${search}`, this.getAuthHeader());
    }

    async verifyBusinessUser(id) {
        return await axios.post(USER_API_BASE_URL + "api/user/business/verify", id, this.getAuthHeader());
    }

    async blockBusinessUser(payload) {
        return await axios.post(USER_API_BASE_URL + "api/user/business/block", payload, this.getAuthHeader());
    }

    async editVerifiedBusinessUser(payload) {
        return await axios.put(USER_API_BASE_URL + "api/user/business", payload, this.getAuthHeader());
    }

    async deleteBusinessUser(id) {
        return await axios.delete(USER_API_BASE_URL + `api/user/business/${id}`, this.getAuthHeader());
    }

    async getAllPersonalUsers(search) {
        return await axios.get(USER_API_BASE_URL + `api/user/personal?search=${search}`, this.getAuthHeader());
    }
    async editPersonalUser(payload) {
        return await axios.put(USER_API_BASE_URL + "api/user/personal", payload, this.getAuthHeader());
    }

    async deletePersonalUser(id) {
        return await axios.delete(USER_API_BASE_URL + `api/user/personal/${id}`, this.getAuthHeader());
    }

    async getContentVideos(search, page) {
        return await axios.get(USER_API_BASE_URL + `api/admin/content?search=${search}&&page=${page}`, this.getAuthHeader());
    }

    async removeVideo(values) {
        return await axios.post(USER_API_BASE_URL + `api/admin/content`, values, this.getAuthHeader());
    }

    async changePassword(values) {
        return await axios.put(USER_API_BASE_URL + `api/user/change-password`, values, this.getAuthHeader());
    }

    async getUserProfile(username) {
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
    async getBalance(adminId) {
        return await axios.get(USER_API_BASE_URL+`api/dashboard/settings?adminId=${adminId}`)
    }
    async topUpProfile(topUp,id) {
        let payload={
            topUp,id
        }
        return await axios.post(USER_API_BASE_URL+`api/dashboard/funds-management/topup`,payload,this.getAuthHeader())
    }
    async withDrawProfile(withDraw,id){
        let payload = {
            withDraw,
            id
        }
        return await axios.post(USER_API_BASE_URL+`api/dashboard/funds-management/withdraw`,payload,this.getAuthHeader())
    }
    async getWithDrawRequests (search){
        return await axios.get(USER_API_BASE_URL+`api/admin/withdrawrequest?search=${search}`,this.getAuthHeader());
    } 
    async adminPay(payload){
        return await axios.post(USER_API_BASE_URL+`api/admin/paynow`,payload,this.getAuthHeader());
    }

}

export default new AxiosInstance;
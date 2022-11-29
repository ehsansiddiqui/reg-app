import { defineStore } from 'pinia'
import axiosApiClient from '../axios'
import notify from '@/composables/notify'
import useFormData from '@/composables/formdata'


export const useAdminStore = defineStore({
  id: 'admin',
  state: () => ({
    users: [],
    captains: [],
    currentUser: [],
    vehicles: {
      categories: [],
      makes: [],
      models: [],
    }
  }),
  getters: {
    getUserProfileImage(){
      let url = () => import('@/assets/user.svg');
      if (this.currentUser.profileImage) {
        url = `${import.meta.env.VITE_BASE_API_URL}${this.currentUser.profileImage}`;
      }
      return url;
    }
  },
  actions: {
    /**
     * Description: getting all users
     * @returns {Object}
     */
    async getAllUsers(){
      return axiosApiClient.post('/user/getAllUsers', {adminId: 1}).then((res) => {
        this.users = res.data.data;
        return res.data;
      }).catch((err) => {
        notify(err.message, 'negative', 'error');
        throw err;
      });
    },
    /**
     * Description: getting single user by id
     * @param {Number} id
     * @returns {Object}
     */
    async getSingleUser(id){
      return axiosApiClient.post('/user/getUserById', {userId: id}).then((res) => {
        this.currentUser = res.data.data;
        return res.data;
      }).catch((err) => {
        notify(err.message, 'negative', 'error');
        throw err;
      })
    },
    /**
     * Description: getting all captains
     * @returns {Object}
     */
    async getAllCaptains(){
      return axiosApiClient.post('/user/getAllCaptains', {adminId: 1}).then((res) => {
        this.captains = res.data.data;
        return res.data;
      }).catch((err) => {
        notify(err.message, 'negative', 'error');
        throw err;
      })
    },
    /**
     * Description: getting all vehicle categories
     * @returns {Object}
     */
    async getVehicleCategories(data){
      return axiosApiClient.post(`/vehicle/get-all-vehicle-categories`, {...data}).then((res) => {
        this.vehicles.categories = res.data.data;
      })
    },
    /**
     * Description: Adding a vehicle category
     * @param {Object} data data to be submitted
     * @returns {Object}
     */
    async addVehicleCategory(data){
      return axiosApiClient.post(`/vehicle/add_category`, useFormData(data)).then((res) => {
        notify('Record Added', 'positive', 'check_circle');
        this.vehicles.categories.push(res.data.data);
      }).catch((err) => {
        throw err;
      })
    },
    /**
     * Description: Change category status
     * @param {Object} data data to be submitted
     * @returns {Object}
     */
    async changeSatus(data){
      return axiosApiClient.post(`/vehicle/change_status`, {...data}).then((res) => {
        this.vehicles.categories.find((x) => x.id == data.id).status = data.status;
        notify('Status Updated', 'positive', 'check_circle');
        return res;
      }).catch((err) => {
        throw err;
      })
    },
    /**
     * Description: Update category
     * @param {Object} data data to be submitted
     * @returns {Object}
     */
    async updateCategory(data){
      return axiosApiClient.post(`/vehicle/update-vehicle-category`, {...data}).then((res) => {
        this.vehicles.categories.find((x) => x.id == data.id).categoryName = data.categoryName;
        notify('Record Updated', 'positive', 'check_circle');
        return res;
      }).catch((err) => {
        throw err;
      })
    },
    /**
     * Description: get vehicle models
     * @returns {Object}
     */
    async getVehicleModels(){
      return axiosApiClient.post(`/vehicle/update-vehicle-meodels`).then((res) => {
        return res;
      }).catch((err) => {
        throw err;
      })
    },

  },
})

import { defineStore } from 'pinia'
import axiosApiClient from '../axios'
import notify from '@/composables/notify'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      data: [],
      token: '',
    }
  }),
  getters: {

  },
  actions: {
    async login (data){
      return axiosApiClient.post('/user/loginUser', {...data}).then((res) => {
        this.user.data = res.data.data;
        this.user.token = res.data.tokken;
        return res;
      }).catch((err) => {
        notify(err.message, 'negative', 'error');
        throw err;
      })
    },
    async logout(){
      this.user.token = null;
      return true;
    }
  },
  persist: true,
})

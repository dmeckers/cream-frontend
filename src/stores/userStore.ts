import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

  const auth_date = ref(0)
  const hash = ref('')

  const user = reactive({
    id: 0,
    name: '',
    username: '',
  })

  return { auth_date, hash, user }
})

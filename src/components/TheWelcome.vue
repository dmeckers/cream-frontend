<template>
  <span></span>
  <!-- <div>Hi!</div>
  <Button>Click me</Button> -->
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { getCurrentInstance, onMounted } from 'vue'
// import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

// import { getCurrentInstance, onMounted } from 'vue'

const userStore = useUserStore()

const { user, auth_date, hash } = userStore

const axios = getCurrentInstance()?.appContext.config.globalProperties.$axios

onMounted(() => {
  axios
    .get('/me')
    .then((response: any) => console.log(response))
    .catch((error: any) => {
      axios
        .post('/auth/refresh', { auth_data: { user, auth_date, hash } })
        .then((response: any) => {
          console.log(response)
        })
    })
})
</script>

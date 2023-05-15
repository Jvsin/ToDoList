<script setup>
// import { onMounted, ref } from 'vue'
// import { mdiHome, mdiInformationOutline, mdiCheckboxMultipleMarkedCircle } from '@mdi/js'
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
// import router from '@/router'
import { useUserStore } from '../src/stores/users'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { email, isLoggedIn } = storeToRefs(userStore)
</script>

<template>
    <v-btn v-if="isLoggedIn" :title="email" variant="tonal" color="red" @click="userStore.handleSingOut">{{
      $t('signOut')
    }}</v-btn>
</template>

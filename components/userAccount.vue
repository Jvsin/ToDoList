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
  <v-div v-if="isLoggedIn" align="center"> {{ $t('loggedAs') + email }} </v-div>

  <v-btn
    v-if="isLoggedIn"
    block
    :title="email"
    variant="tonal"
    color="red"
    @click="userStore.handleSingOut"
    >{{ $t('signOut') }}</v-btn
  >
</template>

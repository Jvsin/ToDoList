<script setup>
//import { mdiHome, mdiInformationOutline, mdiCheckboxMultipleMarkedCircle } from '@mdi/js'
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import router from '@/router'

const isLoggedIn = ref(false)

onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const handleSingOut = () => {
  signOut(getAuth()).then(() => {
    router.push('/')
  })
}
</script>

<template>
  <v-dev v-if="isLoggedIn">
    <v-btn  variant="tonal" color="red" @click="handleSingOut">{{
      $t('signOut')
    }}</v-btn>
  </v-dev>
</template>

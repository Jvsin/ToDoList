<script setup lang="ts">
import { ref } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { useRouter } from 'vue-router'
import { mdiGoogle } from '@mdi/js'

const email = ref('')
const password = ref('')
const router = useRouter()
const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      console.log('Successfully logged in!')
      router.push('/dashboard')
    })
    .catch((error) => {
      console.log(error.message)
      alert(error.message)
    })
}

const registerGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then(() => {
      console.log('Successfully logged with google account!')
      router.push('/dashboard')
    })
    .catch((error) => {
      console.log(error.message)
    })
}
</script>

<template>
  <v-row class="ma-4" justify="center">
    <h1>{{ $t('signingUpWelcome')}}</h1>
  </v-row>

  <v-form>
    <v-row justify="center" class="ma-4">
      <v-col cols="12" md="8"> </v-col>

      <v-col cols="12" md="8">
        <v-text-field
          v-model="email"
          :label="$t('login') "
          placeholder="johndoe@gmail.com"
          type="email"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="8">
        <v-text-field
          v-model="password"
          :label="$t('password')"
          type="input"
          :hint="$t('PasswordHint')"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col align="center" cols="12" md="8">
        <v-btn 
        color="#008000"
        variant="flat" 
        width="70%" 
        @click="register">{{ $t('signUp') }}</v-btn>
      </v-col>

      <v-col align="center" cols="12" md="8">
        <v-btn
          color="green"
          width="50%"
          :append-icon="mdiGoogle"
          class="rounded"
          @click="registerGoogle"
          >{{ $t('signUpWith') }}
        </v-btn>
      </v-col>

      <v-btn
        justify-center
        color="error"
        variant="plain"
        width="50%"
        class="rounded-pill"
        @click="() => $router.push('/register')"
        >{{ $t('IDontHaveAccount') }}
      </v-btn>
    </v-row>
  </v-form>
</template>

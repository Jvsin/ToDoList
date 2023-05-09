<script setup lang="ts">
import { ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { useRouter } from 'vue-router'
import { mdiGoogle } from '@mdi/js'

const email = ref('')
const password = ref('')
const router = useRouter()
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      console.log('Successfully registered!')
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
      console.log('Successfully registered with google!')
      router.push('/dashboard')
    })
    .catch((error) => {
      console.log(error.message)
    })
}
</script>

<template>
  <v-row class="ma-4" justify="center">
    <h1>{{ $t('createAccount') }}</h1>
  </v-row>

  <v-form>
    <v-container>
      <v-row justify="center" class="ma-4">
        <v-col cols="12" md="8">
          <v-text-field
            v-model="email"
            :label="$t('login')"
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
            width="70%"
            class="rounded"
            @click="register"
            >{{ $t('register') }}</v-btn
          >
        </v-col>

        <v-col align="center" cols="12" md="8">
          <v-btn
            color="green"
            width="50%"
            :append-icon="mdiGoogle"
            class="rounded"
            @click="registerGoogle"
            >{{ $t('registerWith') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

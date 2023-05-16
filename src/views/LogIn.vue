<script setup lang="ts">
import { mdiGoogle } from '@mdi/js'
import { useUserStore } from '../stores/users'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { email, password } = storeToRefs(userStore)
</script>

<template>
  <v-row class="ma-4" justify="center">
    <h1>{{ $t('signingUpWelcome') }}</h1>
  </v-row>

  <v-form>
    <v-row justify="center">
      <v-col cols="12" md="10"> </v-col>

      <v-col cols="10" md="7">
        <v-text-field
          v-model="email"
          :label="$t('login')"
          placeholder="email@gmail.com"
          type="email"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="10" md="7">
        <v-text-field
          v-model="password"
          :label="$t('password')"
          type="password"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col align="center" cols="12" md="8">
        <v-btn color="#008000" variant="flat" width="70%" @click="userStore.signIn">{{
          $t('signUp')
        }}</v-btn>
      </v-col>

      <v-col align="center" cols="12" md="8">
        <v-btn
          color="green"
          width="50%"
          :append-icon="mdiGoogle"
          class="rounded"
          @click="userStore.registerGoogle"
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

<script setup lang="ts">
import { mdiGoogle } from '@mdi/js'
import { useUserStore } from '../stores/users'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { email, password } = storeToRefs(userStore)
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
            placeholder="email@gmail.com"
            type="email"
            variant="outlined"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="password"
            :label="$t('password')"
            type="input"
            variant="outlined"
          ></v-text-field>
        </v-col>

        <v-col align="center" cols="12" md="8">
          <v-btn color="#008000" width="70%" class="rounded" @click="userStore.register">{{
            $t('register')
          }}</v-btn>
        </v-col>

        <v-col align="center" cols="12" md="8">
          <v-btn
            color="green"
            width="50%"
            :append-icon="mdiGoogle"
            class="rounded"
            @click="userStore.registerGoogle"
            >{{ $t('registerWith') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

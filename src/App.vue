<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import userAccount from '../components/userAccount.vue'

const drawer = ref(false)
</script>

<template>
  <v-app>
    <v-layout>
      <v-app-bar color="green" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>

        <v-toolbar-title> {{ $t('Titlename') }}</v-toolbar-title>

        <NavBar></NavBar>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        location="left"
        temporary
        color="grey-light"
        style="text-align: center"
      >
        <v-list nav>
          <v-btn block>
            <RouterLink to="/"> {{ $t('home') }}</RouterLink>
          </v-btn>
        </v-list>

        <v-list nav>
          <v-btn block>
            <RouterLink to="/about">{{ $t('about') }}</RouterLink>
          </v-btn>
        </v-list>

        <v-list nav>
          <v-btn block>
            <RouterLink to="/Dashboard">{{ $t('dashboard') }}</RouterLink>
          </v-btn>
        </v-list>

        <v-list nav>
          <v-btn block>
            <RouterLink to="/login"> {{ $t('signUp') }} </RouterLink>
          </v-btn>
        </v-list>

        <v-list nav>
          <userAccount> </userAccount>
        </v-list>

        <v-list nav>
          <v-select
            v-model="$i18n.locale"
            :label="$t('languageLabel')"
            :items="['pl', 'en']"
            :value="$i18n.locale"
          >
          </v-select>
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 65px">
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>

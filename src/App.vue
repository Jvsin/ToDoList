<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from "vue"
import userAccount from "../components/userAccount.vue"

const drawer = ref(false)
</script>

<template>
<v-card>
    <v-layout>
      <v-app-bar
        color="green"
        prominent
      >
        <v-app-bar-nav-icon variant="tonal" @click.stop="drawer = !drawer">
          
        </v-app-bar-nav-icon>

        <font-awesome-icon :icon="['fas', 'check']" />

        <v-toolbar-title> {{ $t('Titlename') }}</v-toolbar-title>
        
        <NavBar></NavBar>

      </v-app-bar>

    
      <v-navigation-drawer 
        v-model="drawer"
        location="left"
        temporary
        color="grey-light">

        <v-list>
          
          <v-btn block>
              <RouterLink to="/"> {{ $t('home') }}</RouterLink>
          </v-btn>

        </v-list>
        
        <v-list>
          
          <v-btn block>
            <RouterLink to="/about">{{ $t('about') }}</RouterLink>
          </v-btn>

        </v-list>

        <v-list>
          
          <v-btn block>
            <RouterLink to="/Dashboard">{{ $t('dashboard') }}</RouterLink>
          </v-btn>

        </v-list>

        <v-list>
          
          <v-btn block>
            <RouterLink to="/login"> {{ $t('signUp') }} </RouterLink>
          </v-btn>

        </v-list>

        <v-list block>
          <userAccount> </userAccount>
        </v-list>

        <v-list>
          <v-select
            v-model="$i18n.locale"
            :label="$t('languageLabel')"
            :items="['pl', 'en']"
            :value="$i18n.locale">
          </v-select>
        </v-list>

      </v-navigation-drawer>
      

      <v-main style="min-height: 65px;" ></v-main>
    </v-layout>
</v-card>

  <RouterView />
</template>

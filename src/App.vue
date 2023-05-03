<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from "vue"

const drawer = ref(false)
</script>

<template>
<v-card>
    <v-layout>
      <v-app-bar
        color="green"
        prominent
      >
        <v-app-bar-nav-icon variant="tonal" :icon="['fas', 'bars']" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Nawigacja</v-toolbar-title>
        <v-spacer></v-spacer>
  
      </v-app-bar>

    
      <v-navigation-drawer 
        v-model="drawer"
        location="left"
        temporary
        color="grey-light">

        <v-list>
          
          <v-btn block>
            <RouterLink to="/">Home</RouterLink>
          </v-btn>

        </v-list>
        
        <v-list>
          
          <v-btn block>
            <RouterLink to="/about">About</RouterLink>
          </v-btn>

        </v-list>
         
      </v-navigation-drawer>

      <v-main style="min-height: 65px;" ></v-main>
    </v-layout>
</v-card>
  <RouterView />
</template>

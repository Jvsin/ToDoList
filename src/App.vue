<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <v-card>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  
</v-card> -->
<v-card>
  <v-layout>
      <v-navigation-drawer>
        <v-list>
          <v-list-item title="Navigation drawer">
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      
      <v-app-bar
         scroll-behavior="collapse inverted"
          scroll-threshold="0">
          
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </v-app-bar>

    </v-layout>
  </v-card>

  
  <RouterView />
</template>

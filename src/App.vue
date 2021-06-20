<template>
  <div class="full-width-container" id="app">
    <v-app light>
      <transition>
        <router-view></router-view>
      </transition>
    </v-app>
  </div>
</template>

<script lang="ts" src='./App.ts'></script>
<template>
    <div class="flex align-center justify-center">
        <AuthorizeForm v-if="currentForm === 'auth'" @changeForm="this.changeForm"/>
        <RegisterForm v-if="currentForm === 'register'" @changeForm="this.changeForm"/>
    </div>
</template>

<script lang="ts" src='./Authorization.ts'></script>
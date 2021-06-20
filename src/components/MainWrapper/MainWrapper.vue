<template>
    <div class="main-wrapper">
        <Aside />
        <div class="main-wrapper-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts" src="./MainWrapper.ts"></script>
<style scoped>
    @import './MainWrapper.scss';
</style>
<template>
    <div class="authorize">
        <h1 class="mb-5">Форма авторизации</h1>
        <v-form v-model="isFormValid" lazy-validation @submit="(e) => onSubmit(e)" class="authorize__form">
            <v-text-field
                v-model="username"
                label="Имя пользователя / логин"
                :rules="usernameRules"
                placeholder=" "
                persistent-placeholder
                :name="Math.random()"
                hide-details="auto"
                required
            />
            <v-text-field
                v-model="password"
                label="Пароль"
                :rules="passwordRules"
                placeholder=" "
                persistent-placeholder
                :name="Math.random()"
                type="password"
                hide-details="auto"
                required
            />
            <v-btn type="submit" outlined class="authorize__form--button" color="success">
                <v-icon>mdi-arrow-right-bold</v-icon>
            </v-btn>
        </v-form>
        <p class="mt-5">
            <span class="mr-2">Еще нет аккаунта?</span> 
            <span class="link cursor" @click.self="goToRegisterForm">Создать аккаунт</span>
        </p>
    </div>
</template>

<script lang="ts" src="./AuthorizeForm.ts"></script>

<style lang="scss" scoped>
    @import "./AuthorizeForm.scss";
    @import "../forms.scss";
</style>
<template>
    <div class="authorize">
        <h1 class="mb-5">Форма регистрации</h1>
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
            <v-text-field
                v-model="passwordConfirm"
                label="Подтверждение пароля"
                :rules="passwordConfirmRules"
                placeholder=" "
                persistent-placeholder
                :name="Math.random()"
                type="password"
                hide-details="auto"
                required
            />
            <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                placeholder=" "
                persistent-placeholder
                :name="Math.random()"
                type="email"
                hide-details="auto"
                required
            />
            <v-text-field
                v-model="first_name"
                label="Имя"
                :rules="first_nameRules"
                placeholder=" "
                persistent-placeholder
                :name="Math.random()"
                hide-details="auto"
                required
            />
            <v-text-field
                v-model="last_name"
                label="Отчество"
                :rules="last_nameRules"
                placeholder=" "
                persistent-placeholder
                :name="Math.random()"
                hide-details="auto"
                required
            />
            <v-btn type="submit" outlined class="authorize__form--button" color="success">
                <v-icon>mdi-arrow-right-bold</v-icon>
            </v-btn>
        </v-form>
        <p class="mt-5">
            <span class="mr-2">Уже есть аккаунт?</span> 
            <span class="link cursor" @click="goToAuthForm">Войти</span>
        </p>
    </div>
</template>

<script lang="ts" src="./RegisterForm.ts"></script>

<style lang="scss" scoped>
    @import "./RegisterForm.scss";
    @import "../forms.scss";
</style>
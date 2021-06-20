import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import validateEmail from '@/utils/functions';

const namespace = 'user';

@Component({
    name: 'RegisterForm',
})

export default class RegisterForm extends Vue {
    public isFormValid = false;
    public username = '';
    private usernameRules = [
        (value: string) => !!value || 'Обязательное поле',
        (value: string) => /[a-zA-Z0-9]/.test(value) || 'Поле должно содержать латинские буквы и цифры',
        (value: string) => value.length > 3 || 'Поле должно содержать больше 3 символов',
    ]
    public password = '';
    private passwordRules = [
        (value: string) => !!value || 'Обязательное поле',
        (value: string) => value.length > 4 || 'Поле должно содержать больше 4 символов',
    ]
    public passwordConfirm = '';
    private passwordConfirmRules = [
        (value: string) => !!value || 'Обязательное поле',
        (value: string) => value.length > 4 || 'Поле должно содержать больше 4 символов',
        () => this.comparePasswords() || 'Поле должно совпадать с основным паролем',
    ]
    public email = '';
    private emailRules = [
        (value: string) => !!value || 'Обязательное поле',
        (value: string) => value.length > 3 || 'Поле должно содержать больше 3 символов',
        (value: string) => validateEmail(value) || 'Поле должно соответствовать формату',
    ]
    public first_name = '';
    private first_nameRules = [
        (value: string) => !!value || 'Обязательное поле',
        (value: string) => value.length > 3 || 'Поле должно содержать больше 3 символов',
    ]
    public last_name = '';
    private last_nameRules = [
        (value: string) => !!value || 'Обязательное поле',
        (value: string) => value.length > 3 || 'Поле должно содержать больше 3 символов',
    ]
    
    @Action('registerUser', { namespace })
    registerUser: any

    public goToAuthForm() {
        this.$emit('changeForm', 'auth')
    }

    public onSubmit(e: any) {
        e.preventDefault()
        if (this.isFormValid) {
            this.registerUser({
                username: this.username,
                password: this.password,
                email: this.email,
                first_name: this.first_name,
                last_name: this.last_name
            })
        } else {
            this.$toast.error('Форма заполнена неверно!');
        }
    }

    private comparePasswords() {
        return this.passwordConfirm === this.password
    }
}
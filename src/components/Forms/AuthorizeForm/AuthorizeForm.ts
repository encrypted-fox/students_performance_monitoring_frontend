import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'

const namespace = 'user';
@Component({
    name: 'AuthorizeForm'
})

export default class AuthorizeForm extends Vue {
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

    @Action('authUser', { namespace })
    authUser: any

    public goToRegisterForm() {
        this.$emit('changeForm', 'register')
    }

    public onSubmit(e: any) {
        e.preventDefault()
        if (this.isFormValid) {
            this.authUser({
                username: this.username,
                password: this.password
            })
        } else {
            this.$toast.error('Форма заполнена неверно!');
        }
    }
}
import AuthorizeForm from '@/components/Forms/AuthorizeForm/AuthorizeForm';
import RegisterForm from '@/components/Forms/RegisterForm/RegisterForm';
import Vue from 'vue'
import { Component, } from "vue-property-decorator";
import { Getter } from 'vuex-class';

const namespace = 'user'

@Component({
    name: 'Authorization',
    components: {
        AuthorizeForm,
        RegisterForm
    }
})

export default class Authorization extends Vue {

    @Getter('token', {namespace}) getterToken: any;

    public currentForm = 'auth';

    public changeForm(type: string) {
        this.currentForm = type;
    }

    public mounted() {
        if (this.getterToken) {
            this.$router.push('/dashboard')
        }
    }
}
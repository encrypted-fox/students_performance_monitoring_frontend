import Vue from "vue";
import Component from "vue-class-component";
import Aside from "../Aside/Aside";

@Component({
    name: 'MainWrapper',
    components: {
        'v-aside': Aside
    }
})

export default class MainWrapper extends Vue {}
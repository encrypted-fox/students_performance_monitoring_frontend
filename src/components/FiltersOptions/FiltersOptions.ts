import Vue from "vue";
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'FiltersOptions'
})

export default class FiltersOptions extends Vue {
    public items: number[] | [] = [];
    @Prop({ default: [] }) readonly options!: any;
    @Prop({ default: [] }) selectedItems!: any;

    @Watch('selectedItems', {deep: true})
    private wathcSelected() {
        if ((!this.selectedItems.length || !this.items.length) && this.selectedItems.length < this.items.length)
            this.clearOptions()
    }

    @Watch('items', {deep: true})
    private wathcItems() {
        this.$emit('setSelected', this.items)

    }

    public clearOptions() {
        this.items = Array.from({length: this.options.length}, (v, k) => k);
        this.$emit('setSelected', this.items)
    }

    public mounted() {
        this.clearOptions()
    }
}
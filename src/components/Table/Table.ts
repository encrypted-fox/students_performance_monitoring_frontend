import { Student } from "@/store/students/types";
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import FiltersOptions from "../FiltersOptions/FiltersOptions";
import { Action } from 'vuex-class';

@Component({
    name: 'Table',
    components: {
        FiltersOptions
    }
})

export default class Table extends Vue {
    private search = '';
    @Prop({ default: [] }) readonly selectedItems!: any[];
    @Prop({ default: [] }) readonly headers!: any[];
    @Prop({ default: [] }) readonly data!: Student[];

    @Action('downloadStudentsReportCSV', { namespace: 'report' })
    downloadStudentsReportCSV: any

    @Action('downloadStudentsReportXLSX', { namespace: 'report' })
    downloadStudentsReportXLSX: any

    public downloadCSV() {
        const document_data = this.data.map((el) => el.id);
        this.downloadStudentsReportCSV(document_data);
    }

    public downloadXLSX() {
        const document_data = this.data.map((el) => el.id);
        this.downloadStudentsReportXLSX(document_data);
    }

    public setSelected(newItems: any) {
        this.$emit('setSelected', newItems)
    }
}
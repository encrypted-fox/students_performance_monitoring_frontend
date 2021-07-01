<template>
    <v-card v-if="data.length">
        <v-card-title class="pb-0 align-center">
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            <v-btn class="ml-auto ml-md-2 mt-2 mt-md-auto" color="indigo" outlined @click.stop="downloadCSV">Скачать CSV</v-btn>
            <v-btn class="ml-auto ml-md-2 mt-2 mt-md-auto" color="indigo" outlined @click.stop="downloadXLSX">Скачать XLSX</v-btn>
        </v-card-title>
        <FiltersOptions 
            @setSelected="setSelected"
            :options="headers" 
            :selectedItems="selectedItems"
        />
        <v-data-table
            :search="search"
            :headers="headers"
            :items="data"
            :items-per-page="15"
            class="elevation-1"
            @click:row="goToStudentRecordsTable($event)"
        ></v-data-table>
    </v-card>
    <div v-else class="mt-3 pr-3">
        <v-alert
            class="flex"
            dense
            outlined
            type="error"
        >
            Данные отсутсвуют
        </v-alert>
    </div>
    
</template>

<script lang="ts" src="./Table.ts"></script>
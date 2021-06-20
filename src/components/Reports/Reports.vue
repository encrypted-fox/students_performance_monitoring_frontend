<template>
    <div class="col-12">
        <div class="col-12 row mb-2 align-center">
            <h3 class="col-10">{{getterCurrentRoute.name}}</h3>
            <div class="col-2 row justify-end">
                <v-btn
                    v-if="!isFavorite"
                    class="ml-auto"
                    color="pink"
                    outlined
                    dark
                    fab
                    @click.stop="callAddToFavorite"
                >
                    <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
                <v-btn
                    v-if="isFavorite"
                    class="ml-auto"
                    color="pink"
                    outlined
                    dark
                    fab
                    @click.stop="callRemoveFromFavorite"
                >
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
            </div>
        </div>
        <v-divider/>
        <Table @setSelected="setSelected" :selectedItems="selectedItems" :headers="headers" :data="getterCurrentReport" />
    </div>
</template>

<script lang="ts" src="./Reports.ts"></script>
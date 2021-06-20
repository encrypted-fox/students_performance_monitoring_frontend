<template>
    <div class="col-12">
        <div class="col-12 row mb-2 align-center">
            <h2>Дашборд</h2>
        </div>
        <div class="row col-12">
            <template v-if="getterFavorites.length">
                <div class="col-12 col-md-4 mb-3 px-2" v-for="item in getterFavorites" :key="item.id">
                    <v-card class="mx-3 pt-2" elevation="2" outlined @click="setCurrentRoute(item)">
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="d-flex align-center mb-1">
                                    <p class="mb-0 subtitle-1 ">{{item.name}}</p>
                                    <p class="mb-0 text-h6 ml-auto">{{item.count}}</p>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                        <v-btn class="delete-icon" flat fab @click.stop="callRemoveFromFavorite">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card>
                </div>
            </template>
            <div v-else class="col-12">
                <v-alert
                    class="col-12 mr-0"
                    outlined
                    type="error"
                >
                    Добавьте отчет в избранное
                </v-alert>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./Dashboard.ts"></script>
<template>
    <v-card class="aside">
        <v-navigation-drawer
            permanent
            expand-on-hover
            class='draw-width'
        >
            <template v-slot:prepend>
                <v-list-item exact to="/dashboard/">
                    <v-list-item-icon>
                        <v-icon>mdi-home-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Главная</v-list-item-title>
                </v-list-item>
            </template>
            <v-list nav dense>
                <v-list-group>
                    <template v-slot:activator>
                        <v-list-item-icon>
                            <v-icon>mdi-group</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Отчеты</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <template v-for="item in getterMenu">
                        <v-tooltip top :key="item.id">
                            <template v-slot:activator="{ on, attrs }">
                                <v-list-item
                                    :key="item.id"
                                    @click="setCurrentRoute(item)"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-list-item-icon>
                                        <v-icon v-if="item.id === getterCurrentRoute.id">mdi-folder-edit</v-icon>
                                        <v-icon v-else>mdi-folder</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title>
                                        <div class="d-flex align-center">
                                            <v-icon v-if="item.id === getterCurrentRoute.id" size="10" color="indigo">mdi-circle</v-icon>
                                            <p class="mb-0 ml-1">{{ item.name }}</p>
                                        </div>
                                    </v-list-item-title>
                                </v-list-item>
                            </template>
                            <span>{{item.name}}</span>    
                        </v-tooltip>
                    </template>
                </v-list-group>
            </v-list>
            <template v-slot:append>
                <v-list-item @click="logout">
                    <v-list-item-icon>
                        <v-icon>mdi-door-open</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Выход</v-list-item-title>
                </v-list-item>
            </template>
        </v-navigation-drawer>
    </v-card>
</template>

<script lang="ts" src="./Aside.ts"></script>
<style scoped>
@import "./Aside.scss";
</style>
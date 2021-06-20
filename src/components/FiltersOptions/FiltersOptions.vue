<template>
    <v-sheet class="pt-2">   
        <v-slide-group
            multiple
            class="col-12 mx-auto"
            v-model="items"
        >
            <v-slide-item
                v-for="item in options"
                :key="item.id"
                v-slot="{ active, toggle }"
            >
                <v-btn
                    class="mx-2"
                    :input-value="active"
                    active-class="indigo white--text"
                    depressed
                    rounded
                    @click="toggle"
                >
                    {{item.text}}
                </v-btn>
            </v-slide-item>
            <v-btn
                rounded
                depressed
                :input-value="true"
                dark
                color="indigo"
                @click="clearOptions"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-slide-group>
    </v-sheet>
</template>

<script lang="ts" src="./FiltersOptions.ts"></script>
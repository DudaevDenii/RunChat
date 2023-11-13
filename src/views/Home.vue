<template>
  <v-container>
    <div style="max-height: 70vh; overflow-y: auto; overflow-x: hidden">
      <v-row v-for="item in store.chat">
        <v-col>
          <v-card
            :color="item.data.sender === store.userEmail ? '#eee' : ''"
            class="rounded-shaped"
            :title="item.data.text"
            :subtitle="item.data.sender"
            :text="item.data.currentTime"
          ></v-card>
        </v-col>
      </v-row>
    </div>
    <v-footer class="text-center ma-5">
      <v-row>
        <v-col cols="12">
          <v-form
            @submit.prevent
            class="d-flex align-center h-100"
            style="gap: 10px, margin: 0, padding: 0"
          >
            <v-text-field
              class="h-100"
              :label="
                store.isAuth ? 'Enter your message' : 'Login first, please'
              "
              v-model="store.sendInputValue"
              append-icon="mdi-send"
              :disabled="!store.isAuth"
              @click:append="store.addMessage"
            />
          </v-form>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";

const store = useAppStore();
</script>

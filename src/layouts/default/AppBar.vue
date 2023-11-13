<template>
  <v-card>
    <v-layout>
      <v-app-bar color="dark" density="compact">
        <v-app-bar-title>RunChat</v-app-bar-title>

        <template v-slot:append>
          <v-dialog transition="dialog-bottom-transition" width="500">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" v-bind="props" v-if="!store.isAuth"
                >Auth</v-btn
              >
            </template>
            <template v-slot:default="{ isActive }">
              <v-card>
                <v-toolbar color="primary" title="Authentication"></v-toolbar>
                <v-card-text>
                  <v-form @submit.prevent>
                    <v-text-field
                      label="Email"
                      prepend-inner-icon="mdi-account"
                      v-model="userData.email"
                      :rules="emailRules"
                    />
                    <v-text-field
                      label="Password"
                      prepend-inner-icon="mdi-lock"
                      :type="passwordVisible ? 'text' : 'password'"
                      :append-inner-icon="
                        passwordVisible ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      v-model="userData.password"
                      @click:append-inner="passwordVisible = !passwordVisible"
                      :rules="passwordRules"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn
                    color="success"
                    @click="
                      (isActive.value = false),
                        store.createUser(userData.email, userData.password)
                    "
                    variant="elevated"
                    >Sign Up</v-btn
                  >
                  <v-btn
                    variant="elevated"
                    color="primary"
                    @click="
                      (isActive.value = false),
                        store.signUser(userData.email, userData.password)
                    "
                    >Sign In</v-btn
                  >
                  <v-btn variant="text" @click="isActive.value = false"
                    >Close</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
          <v-btn color="primary" @click="store.logOut" v-if="store.isAuth"
            >Log out</v-btn
          >
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>

      <v-main> </v-main>
    </v-layout>
  </v-card>
</template>
<script setup lang="ts">
import { auth } from "@/configs/firebase";
import { useAppStore } from "@/store/app";
import { watch } from "vue";
import { ref } from "vue";
const store = useAppStore();
const userData = ref({
  email: "",
  password: "",
});
const passwordRules = ref([
  (value: string) => {
    if (value?.length > 6) return true;

    return "First name must be at least 6 characters.";
  },
]);
const emailRules = ref([
  (value: string) => {
    if (value) return true;

    return "E-mail is requred.";
  },
  (value: string) => {
    if (/.+@.+\..+/.test(value)) return true;

    return "E-mail must be valid.";
  },
]);

const passwordVisible = ref(false);
</script>

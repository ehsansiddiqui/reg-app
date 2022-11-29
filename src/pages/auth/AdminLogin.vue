<template lang="">
  <div class="row login-page">
    <q-card class="login-card">
      <q-form ref="form" :greedy="true">
        <q-card-section class="px-20 pb-20 pt-20">
          <p v-if="validation" class="text-negative">Password mismatch</p>
          <div class="row">
            <div
              class="col-12 mb-0"
              v-for="(input, index) in inputs"
              :key="index"
            >
              <FormInput
                class="login-input"
                @enter="logging"
                :type="input.type"
                v-model="model[input.model]"
                :detail="input"
                height="40px"
              ></FormInput>
            </div>
            <p>Password strength: {{ strength }}</p>
            <div class="row justify-between col-12 mt-0">
              <q-btn
                class="flat-button px-0"
                :ripple="false"
                flat
                color="dark"
                size="md"
                no-caps
                label="Generate random password"
                @click="generateRandomPassword"
              />
              <!-- <q-btn :loading="loading" @click="logging" color="dark" label="Login" /> -->
            </div>
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>
<script setup>
import FormInput from "@/partials/FormInput.vue";
import { ref, watch } from "vue";
import rules from "@/composables/validation-rules";

const strength = ref("");
const form = ref(null);
const inputs = ref([
  {
    label: "Password",
    placeholder: "Enter your password",
    model: "password",
    type: "password",
    rules: [
      rules.required,
      (val) => {
        var score = 0;
        
        if (!val) {
          score = 0 ;
        }
        if (val.match(/[a-z]+/)) {
          score += 1;
        }
        if (val.match(/[A-Z]+/)) {
          score += 1;
        }
        if (val.match(/[0-9]+/)) {
          score += 1;
        }
        if (val.match(/[$@#&!]+/)) {
          score += 1;
        }

        switch (score) {
          case 0:
            strength.value = '';
            break;
          case 1:
            strength.value = 'Weak';
            break;
          case 2:
            strength.value = 'Medium';
            break;

          case 3:
            strength.value = 'Strong';
            break;

          case 4:
            strength.value = 'Very strong';
            break;
        }
      },
      (val) => val.length >= 8 || "Password must be 8 characters long",
    ],
  },
  {
    label: "Confirm password",
    placeholder: "Repeat your password",
    model: "confirm_password",
    type: "password",
    rules: [rules.required],
  },
]);
const model = ref({
  confirm_password: null,
  password: null,
});
const alpha = "abcdefghijklmnopqrstuvwxyz";
const calpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const num = "1234567890";
const specials = ",.!@#$%^&*";
const options = [alpha, alpha, alpha, calpha, calpha, num, num, specials];
const pass = ref("");

const generateRandomPassword = () => {
  pass.value = "";
  let opt, choose;
  for (let i = 0; i < 8; i++) {
    opt = Math.floor(Math.random() * options.length);
    choose = Math.floor(Math.random() * options[opt].length);
    pass.value = pass.value + options[opt][choose];
    model.value.password = model.value.confirm_password = pass.value;
    // options.splice(opt, 1);
  }
};

const validation = ref(false);

watch(model.value, () => {
  if (model.value.confirm_password != model.value.password) {
    validation.value = true;
  } else {
    validation.value = false;
  }
});
</script>
<style lang="scss" scoped>
.login-page {
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    border-top: 100vh solid white;
    border-right: 100vw solid black;
    z-index: -1;
  }
}

.login-card {
  max-width: 380px;
  width: 100%;
}
</style>

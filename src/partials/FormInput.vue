<template lang="">
  <div class="form-input">
    <label for="" v-if="detail.label" class="mb-4 d-block">{{
      detail.label
    }}</label>
    <q-file
      outlined
      clearable
      :modelValue="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :rules="detail.rules ? detail.rules : []"
      :placeholder="detail.placeholder"
      v-if="type == 'file'"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>

    <q-input
      outlined
      :modelValue="modelValue"
      :type="type == 'password' ? (isPwd ? 'text' : 'password') : type"
      @update:model-value="$emit('update:modelValue', $event)"
      :rules="detail.rules ? detail.rules : []"
      :placeholder="detail.placeholder"
      @keyup.enter="$emit('enter')"
      v-else
    >
      <template v-slot:append v-if="detail.type && detail.type == 'password'">
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
  </div>
</template>
<script setup>
import { ref } from "vue";

defineProps({
  height: {
    type: String,
    default: "40px",
  },
  detail: {
    type: Object,
  },
  modelValue: {
    type: [String, Object, Array, Number],
  },
  type: {
    type: String,
    default: "text",
  },
});
defineEmits(["enter", "update:modelValue"]);
const isPwd = ref(false);
</script>
<style lang="scss" scoped>
.form-input {
  :deep(.q-field__control),
  :deep(.q-field--auto-height .q-field__native) {
    min-height: v-bind(height) !important;
    height: v-bind(height) !important;
  }

  :deep(.q-field__marginal) {
    height: 100% !important;
  }
}
</style>

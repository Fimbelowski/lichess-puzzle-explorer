<script setup lang="ts">
import { unref } from 'vue';

const props = defineProps<{
  disabled?: boolean;
  id: string;
  label: string;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void,
}>();

const checked = unref(props.modelValue);

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
}
</script>

<template>
  <div>
    <input
      :id="id"
      :disabled="disabled"
      :checked="checked"
      type="checkbox"
      @change="onChange"
    >
    <label
      :for="id"
    >
      {{ label }}
    </label>
  </div>
</template>

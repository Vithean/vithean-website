<script setup lang="ts">
import { ref } from 'vue';
import Drawer from 'primevue/drawer';
import Button from 'primevue/button';
defineProps<{ items: { label: string; href: string }[]; trialHref: string; trialLabel: string }>();
const open = ref(false);
</script>

<template>
  <div class="lg:hidden">
    <Button icon="pi pi-bars" text rounded aria-label="Menu" @click="open = true" />
    <Drawer v-model:visible="open" position="right" header="Vithean" class="w-80">
      <nav class="flex flex-col gap-1">
        <a v-for="i in items" :key="i.href" :href="i.href"
           class="rounded-lg px-3 py-2.5 text-ink no-underline hover:bg-tint">{{ i.label }}</a>
      </nav>
      <a :href="trialHref" class="btn btn-fill mt-6 w-full">{{ trialLabel }}</a>
    </Drawer>
  </div>
</template>

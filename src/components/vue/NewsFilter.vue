<script setup lang="ts">
import { ref, computed } from 'vue';
import SelectButton from 'primevue/selectbutton';
import Tag from 'primevue/tag';

const props = defineProps<{
  articles: { slug: string; title: string; date: string; dateLabel: string; category: string;
              lang: string; excerpt: string; href: string }[];
  labels: Record<string, string>;
}>();

const options = [
  { label: props.labels.all, value: 'all' },
  { label: props.labels.press, value: 'press' },
  { label: props.labels.event, value: 'event' },
  { label: props.labels.article, value: 'article' },
];
const filter = ref('all');
const shown = computed(() =>
  filter.value === 'all' ? props.articles : props.articles.filter((a) => a.category === filter.value),
);
const severity = (c: string) => (c === 'press' ? 'warn' : c === 'event' ? 'info' : 'secondary');
</script>

<template>
  <div>
    <SelectButton v-model="filter" :options="options" optionLabel="label" optionValue="value"
                  :allowEmpty="false" :aria-label="labels.filterAria" class="mb-6" />
    <div class="articles">
      <a v-for="a in shown" :key="a.slug" class="article" :href="a.href">
        <time :datetime="a.date">{{ a.dateLabel }}</time>
        <div>
          <h3>{{ a.title }}<span v-if="a.lang === 'km'" class="kmflag">ភាសាខ្មែរ</span></h3>
          <p>{{ a.excerpt.slice(0, 150) }}…</p>
        </div>
        <Tag :value="labels[a.category]" :severity="severity(a.category)" />
      </a>
    </div>
    <p class="mt-6 text-ink-muted">{{ shown.length }} / {{ articles.length }} {{ labels.count }}</p>
  </div>
</template>

<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

/**
 * Grouped, not filtered.
 *
 * An earlier version had a SelectButton filter. It was wrong for this content:
 * eighteen questions is a scannable list, and filtering hid the other three
 * groups behind a click, emptied the panel area, and threw focus back to the
 * top of the page. Grouping shows everything, keeps every answer in the static
 * HTML for crawlers, and needs no state at all.
 */
defineProps<{
  groups: { id: string; label: string; items: { id: string; q: string; a: string }[] }[];
}>();
</script>

<template>
  <div class="faq">
    <section v-for="g in groups" :key="g.id" class="faq-group">
      <h3 class="faq-group-h">{{ g.label }}</h3>
      <Accordion multiple>
        <AccordionPanel v-for="it in g.items" :key="it.id" :value="it.id">
          <AccordionHeader>{{ it.q }}</AccordionHeader>
          <AccordionContent><p class="faq-a">{{ it.a }}</p></AccordionContent>
        </AccordionPanel>
      </Accordion>
    </section>
  </div>
</template>

<style scoped>
.faq-group + .faq-group { margin-top: 2.6rem; }
.faq-group-h {
  font-size: .82rem; font-weight: 700; letter-spacing: .11em; text-transform: uppercase;
  color: var(--plum-600); margin: 0 0 .9rem;
}
.faq-a { color: var(--ink); max-width: 70ch; font-size: 1rem; margin: 0; }
</style>

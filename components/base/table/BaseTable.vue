<script setup lang="ts">
import type { TableRow } from './base-table.types';

interface Props {
  headers?: string[];
  data?: TableRow[];
}

const props = defineProps<Props>()
</script>

<template>
  <table class="base-table">
    <tr class="base-table-header">
      <th v-for="header in props.headers">{{ header }}</th>
    </tr>

    <tr v-for="row in props.data">
      <td v-for="data in row">
        <NuxtLink v-if="data.link" :to="data.link" class="base-table-data--link">
          {{ data.content }}
        </NuxtLink>

        <BaseButton v-else-if="data.callback" @click="() => data.callback && data.callback(data.id)" type="link">
          {{ data.content }}
        </BaseButton>

        <div v-else>
          {{ data.content }}
        </div>
      </td>
    </tr>
  </table>
</template>

<style scoped>
.base-table {
  width: 100%;
}

.base-table-header {
  width: 100%;
  background-color: var(--color-light-gray);
  font-weight: bold;
  color: var(--color-primary)
}

th,
td {
  padding: var(--spacing-lg)
}

.base-table-data--link {
  color: var(--color-link)
}
</style>
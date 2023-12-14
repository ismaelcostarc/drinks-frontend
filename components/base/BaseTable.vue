<script setup lang="ts">
interface TableData {
  content: string;
  link?: string;
}

interface Props {
  headers?: string[];
  data?: TableData[][];
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
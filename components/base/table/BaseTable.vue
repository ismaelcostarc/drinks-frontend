<script setup lang="ts">
import type { TableHeader, TableRow } from './base-table.types';

interface Props {
  headers?: TableHeader[];
  data?: TableRow[];
}

const props = defineProps<Props>()

const highlightTermInWord = (content: string = '', highlightTerm: string = '') => {
  // Encontrar o índice do termo na palavra
  const index = content.toLowerCase().indexOf(highlightTerm.toLowerCase());

  if (index !== -1) {
    // Se o termo for encontrado na palavra, destacar o termo
    const start = content.substring(0, index);
    const highlighted = content.substring(index, index + highlightTerm.length);
    const end = content.substring(index + highlightTerm.length);

    return `<span data-testid="${highlightTerm}">${start}<span style="font-weight: bolder;">${highlighted}</span>${end}</span>`;
  }

  // Se o termo não for encontrado na palavra, retornar a palavra original
  return content;
}
</script>

<template>
  <div class="base-table__container">
    <table class="base-table">
      <tr class="base-table-header">
        <th v-for="header in props.headers" :key="header.title" :style="{ width: header.size + '%' }">{{ header.title }}
        </th>
      </tr>

      <tr v-for="row in props.data" :key="'row' + row[0].id">
        <td v-for="data in row" :key="data.id">
          <NuxtLink v-if="data.link" :to="data.link" class="base-table-data--link">
            <div v-html="highlightTermInWord(data.content, data.highlightTerm)" v-if="data.highlightTerm" />
            <div v-else>{{ data.content }}</div>
          </NuxtLink>

          <BaseButton v-else-if="data.callback" @click="() => data.callback && data.callback(data.id)" type="link">
            <div v-html="highlightTermInWord(data.content, data.highlightTerm)" v-if="data.highlightTerm" />
            <div v-else>{{ data.content }}</div>
          </BaseButton>

          <div v-else-if="data.isAction">
            <slot name="action" :payload="data.payload" />
          </div>

          <div v-else>
            <div v-html="highlightTermInWord(data.content, data.highlightTerm)" v-if="data.highlightTerm" />
            <div v-else>{{ data.content }}</div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.base-table {
  width: 100%;
}

.base-table__container {
  overflow: auto;
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

.highlighted {
  font-weight: bolder;
  color: red;
}
</style>
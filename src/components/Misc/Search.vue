<template>
  <v-text-field
    placeholder="Search"
    filled
    dense
    clearable
    prepend-inner-icon="mdi-magnify"
    class="mt-1 expanding-search"
    :class="{ closeSearch: close && !$store.state.searchTerm }"
    @focus="focus"
    @blur="focus"
    :value="$store.state.searchTerm"
    v-on:input="searchSchedules($event)"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      close: true,
    };
  },
  methods: {
    focus() {
      this.close = !this.close;
    },
    searchSchedules() {
      this.$store.dispatch("setSearch", event.target.value);
    },
  },
};
</script>

<style>
.expanding-search {
  max-width: 100%;
  transition: all 0.5s ease;
}

.closeSearch .v-input__slot {
  background: transparent !important;
}

.v-input__slot {
  cursor: pointer !important;
}

.expanding-search .v-input__slot::before,
.expanding-search .v-input__slot::after {
  border-color: transparent !important;
}

.expanding-search.closeSearch {
  max-width: 40px;
}
</style>

<template>
  <div class="codeSection" @click="onClick" :class="{ selected: selected }">
    <div class="description">
      <div class="name">
        {{ codeBlock.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CodeSection",
  props: {
    codeBlock: Object,
    selected: Boolean,
  },
  methods: {
    onClick() {
      this.$emit("select");
    },
  },
};
</script>

<style scoped>
.selected {
  background-color: #1164a3;
}

.codeSection {
  padding: 10px;
}

.description {
  display: inline-block;
}
</style>

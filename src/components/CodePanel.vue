<template>
  <div>
    <textarea :value="codeBlock.code" :readonly="isReadOnly" @input="onUpdate(($event.target.value))" 
              placeholder="Your code..." class="input"  rows="25" />
  </div>
</template>

<script>

export default {
  name: "CodegePanel",

  props: {
    codeBlock: Object,
    isReadOnly: Boolean
  },
  methods: {
    onUpdate(code) {
      this.$emit("input", code);
    },
  },
};
</script>

<style scoped>

.input {
  width: 80%;
  padding: 10px;
  margin: 20px;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #000;
}

</style>

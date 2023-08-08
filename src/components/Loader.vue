<template>
  <div class="loader">
    <v-progress-linear
      height="10"
      color="primary"
      indeterminate
    ></v-progress-linear>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style scoped>
.loader {
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>

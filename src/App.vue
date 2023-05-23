<template>
  <router-view />
</template>

<style>
</style>
<script>
export default {
  methods: {
    logout() {
      this.$store.commit('logout')
    }
  },
  mounted() {
    this.$store.commit('initalizeStore')
  }
}

</script>
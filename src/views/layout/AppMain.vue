<template>
    <section class="app-main" style="min-height: 100%">
        <transition name="fade" mode="out-in">
            <router-view :key="key"></router-view>
        </transition>
    </section>
</template>

<script>
    export default {
      name: 'AppMain',
      computed: {
        key() {
          return this.$route.name !== undefined
                        ? this.$route.name + +new Date()
                        : this.$route + +new Date()
        }
      }
    }
</script>

<style>
    .app-main{
        padding: 10px;
        color: #5b6a7b;
    }
</style>

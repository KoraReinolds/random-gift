<template>
  <div
    id="nav"
  >
    <a
      :href="linkImplict"
    >
      LogIn implict
    </a> |
    <a
      :href="linkAuth"
    >
      LogIn authorization
    </a>
  </div>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getOAuthImplictUrl, getOAuthAuthorizationUrl } from '@/composable/auth'

export default defineComponent({
  name: 'App',
  setup() {

    return {
      linkImplict: getOAuthImplictUrl(),
      linkAuth: getOAuthAuthorizationUrl(),
    }
    
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

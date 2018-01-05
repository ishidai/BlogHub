<template>
  <div >
    <HeaderBar></HeaderBar>
    <div >
    <div class="uk-text-center" uk-grid >
      <div class="uk-width-auto">
        <div class="uk-card uk-card-default uk-card-body">
          <article class="uk-article">
            <h1 class="uk-article-title"><a class="uk-link-reset" href="">Heading</a></h1>
            <p class="uk-article-meta">Written by <a href="#">Super User</a> on 12 April 2012. Posted in <a href="#">Blog</a></p>
            <div class="uk-text-left">
              <p class="uk-text-lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div class="uk-grid-small uk-child-width-auto" uk-grid>
              <div>
                <a class="uk-button uk-button-text" href="#">Read more</a>
              </div>
              <div>
                <a class="uk-button uk-button-text" href="#">5 Comments</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    </div>
    <footer-bar></footer-bar>
    </div>
</template>

<script>
import HeaderBar from "./HeaderBar.vue";
import FooterBar from "./FooterBar.vue";
export default {
  data() {
    return {};
  },
  computed: {},
  components: {
    HeaderBar,
    FooterBar
  },
  methods: {}
};
</script>

<style scoped lang="scss">

</style>

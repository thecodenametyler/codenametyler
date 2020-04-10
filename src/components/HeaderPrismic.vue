<template>
  <header class="header__wrapper">
    <div class="header container">
      <div class="row middle-xs">
        <div class="col-xs-12 col-md-3">
          <div class="header__logo">
            <a href="/" title="Home">
              <img src="../assets/img/logo.png" class="img-responsive" alt="Logo CodeNameTyler" width="160">
            </a>
          </div>
        </div>
        <div class="col-xs-12 col-md-9">
          <div class="header__nav">
            <ul class="header__nav__list">
              <li class="header__nav__item">
                <a href="#" title="">EDITS</a>
              </li>
              <li class="header__nav__item">
                <a href="#" title="">RIDE</a>
              </li>
              <li class="header__nav__item">
                <a href="#" title="">ABOUT</a>
              </li>
              <li class="header__nav__item">
                <a href="#" title="">CONTACT</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderPrismic',
  data () {
    return {
      documentId: '',
      fields: {
        title: null,
        description: null,
        socialmedia: []
      }
    }
  },
  methods: {
    getContent () {
    //   this.$prismic.client.getSingle('footer').then((document) => {
    //     if (document) {
    //       this.fields.title = document.data.title
    //       this.fields.description = document.data.description
    //       this.fields.socialmedia = document.data.social_media;
    //     } else {
    //       this.$router.push({ name: 'not-found' })
    //     }
    //   });
    }
  },
  created () {
    this.getContent()
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent()
    next()
  }
}
</script>
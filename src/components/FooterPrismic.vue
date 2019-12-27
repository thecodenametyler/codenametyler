<template>
  <footer class="footer__wrapper">
    <div class="footer container-fluid">
      <div class="row center-xs footer__desc">
        <div class="col-xs-12 col-md-12">
          <p>{{ $prismic.richTextAsPlain(fields.description) }}</p>
        </div>
      </div>
      <div class="row center-xs footer__title">
        <div class="col-xs-12 col-md-12">
          <h3>{{ $prismic.richTextAsPlain(fields.title) }}</h3>
          <a class="btn btn--lg btn--fill" href="#" title="get in touch">get in touch</a>
        </div>
      </div>
      <div class="row center-xs footer__followus">
        <div class="col-xs-12 col-md-12">
          <h4 class="footer__followus__title">Show us some love</h4>
          <ul class="footer__followus__list">
            <li v-for="(item, index) in fields.socialmedia" :key="'social_media-' + index">
              <prismic-link :field="item.link" :title="item.link_title[0].text">
                <i :class="'icon-' + item.icon"></i>
              </prismic-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="row center-xs footer__links">
        <div class="col-xs-12 col-md-12">
          <ul class="footer__links__list">
            <li><a href="#" title="Trail Finder">trailfinder</a></li>
            <li><a href="#" title="Honorable mentions">honorable mentions</a></li>
          </ul>
        </div>
      </div>
      <div class="row center-xs footer__links">
        <div class="col-xs-12 col-md-12">
          <ul class="footer__links__list">
            <li><p>&copy; copyright 2019 codenametyler</p></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterPrismic',
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
      this.$prismic.client.getSingle('footer').then((document) => {
        if (document) {
          this.fields.title = document.data.title
          this.fields.description = document.data.description
          this.fields.socialmedia = document.data.social_media;
        } else {
          this.$router.push({ name: 'not-found' })
        }
      });
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
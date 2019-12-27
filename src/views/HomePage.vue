<template>

  <div>
    <section class="section__wrapper banner__wrapper">
      <div class="container-fluid banner">
        <div class="row banner__item">
          <div class="col-xs-12 col-md-12">
            <div class="banner__content">
              <h1>Honourable mention</h1>
              <p>Shout-out to everyone that who has contribute in the making of this project. <br><strong>You're the real MVP</strong></p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- <div class="banner banner--parallax-multilayer">
        <div class="banner-parallax_layer">BG</div>
        <div class="banner-parallax_layer">BG CLOUD</div>
        <div class="banner-parallax_layer">Text</div>
        <div class="banner-parallax_layer">MG</div>
        <div class="banner-parallax_layer">FG CLOUD</div>
        <div class="banner-parallax_layer">FG</div>
      </div> -->
      <div class="section__next">
        <div class="section__next__btn">
          <i class="icon-arrow-down"></i>
        </div>
      </div>
    </section>
    
    <section class="section__wrapper contrib__wrapper">
      <div class="container contrib">
        <div class="row">
          <div class="col-xs-12 col-md-12">
            <ul class="contrib__list">
              <li class="contrib__item">
                <div class="contrib__item__wrapper">
                  <div class="contrib__item__cover">image</div>
                  <div class="contrib__item__name__wrapper">
                    <div class="contrib__item__name">Jean-Louis font 1</div>
                    <div class="contrib__item__name contrib__item__name--fancy">Jean-Louis font 2</div>
                  </div>
                  <div class="contrib__item__desc">
                    <p>Atlethe, CEO Speroltd</p>
                    <p><a href="http://sports.speroltd.com/">sports.speroltd.com</a></p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                </div>
              </li>
              <li class="contrib__item">
                <div class="contrib__item__wrapper">
                  <div class="contrib__item__cover">image</div>
                  <div class="contrib__item__name__wrapper">
                    <div class="contrib__item__name">Jean-Louis font 1</div>
                    <div class="contrib__item__name contrib__item__name--fancy">Jean-Louis font 2</div>
                  </div>
                  <div class="contrib__item__desc">
                    <p>Atlethe, CEO Speroltd</p>
                    <p><a href="http://sports.speroltd.com/">sports.speroltd.com</a></p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <div class="wrapper">
      <h1>{{ $prismic.richTextAsPlain(fields.title) }}</h1>
      <h2>{{ $prismic.richTextAsPlain(fields.subtitle) }}</h2>
      <prismic-rich-text :field="fields.description" class="description"/>
      <prismic-edit-button :documentId="documentId"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      documentId: '',
      fields: {
        title: null,
        subtitle: null,
        description: null
      }
    }
  },
  methods: {
    getContent () {
      this.$prismic.client.getSingle('homepage').then((document) => {
        if (document) {
          this.documentId = document.id
          this.fields.title = document.data.title
          this.fields.subtitle = document.data.subtitle
          this.fields.description = document.data.description
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
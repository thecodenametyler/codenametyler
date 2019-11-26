<template>
  <div class="wrapper">
    <section class="page-section">
      <div class="page-inview">
        <div class="banner_wrapper">
          <div class="banner--parallax-multilayer">
            <div class="banner-parallax_layer"></div>
            <div class="banner-parallax_layer"></div>
            <div class="banner-parallax_layer"></div>
            <div class="banner-parallax_layer"></div>
          </div>
        </div>
      </div>
    </section>


    <h1>{{ $prismic.richTextAsPlain(fields.title) }}</h1>
    <h2>{{ $prismic.richTextAsPlain(fields.subtitle) }}</h2>
    <prismic-rich-text :field="fields.description" class="description"/>
    <prismic-edit-button :documentId="documentId"/>
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
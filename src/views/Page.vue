<template>
  <div class="wrapper">
    <prismic-edit-button :documentId="documentId"/>
    <h1 class="title">
      {{ $prismic.richTextAsPlain(fields.title) }}
    </h1>
    <prismic-rich-text :field="fields.description" class="description"/>
    <div class="cta-wrapper">
      <prismic-link :field="fields.ctaLink" class="cta">
        {{ $prismic.richTextAsPlain(fields.ctaText) }}
      </prismic-link>
    </div>
    <div class="icon-wrapper">
      <prismic-image :field="fields.icon" class="icon"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page',
  data () {
    return {
      documentId: '',
      fields: {
        title: null,
        description: null,
        ctaLink: null,
        ctaText: null,
        icon: null
      }
    }
  },
  methods: {
    getContent (uid) {
      this.$prismic.client.getByUID('page', uid)
        .then((document) => {
          if (document) {
            this.documentId = document.id
            this.fields.title = document.data.title
            this.fields.description = document.data.description
            this.fields.ctaLink = document.data.cta_link
            this.fields.ctaText = document.data.cta_text
            this.fields.icon = document.data.icon
          } else {
            this.$router.push({ name: 'not-found' })
          }
        })
    }
  },
  created () {
    this.getContent(this.$route.params.uid)
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent(to.params.uid)
    next()
  }
}
</script>
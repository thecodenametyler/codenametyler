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

<style>
.wrapper {
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
  padding: 40px 10px;
  font-family: Avenir, "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.title {
  font-size: 32px;
}

.description {
  margin-top: 40px;
}

.description h2 {
  font-size: 24px;
}

.description h2:not(:first-child) {
  margin-top: 20px;
}

.description p {
  line-height: 1.5;
}

.description p:not(:first-child) {
  margin-top: 10px;
}

.description a {
  color: #404e9f;
}

.description a:hover {
  text-decoration: underline;
}

.cta-wrapper {
  margin-top: 40px;
}

.cta {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  background-color: #404e9f;
  color: white;
}

.icon-wrapper {
  margin-top: 40px;
}

.icon {
  max-width: 100%;
}
</style>
<template>
    <div>
        <div class="row q-pa-md q-gutter-md">
            <div class="col-12">
                <div class="text-h5">
                    <!-- <router-link to="/dashboard/categories" class="clear-r-link">
                        <q-icon name="keyboard_backspace" /> Back
                    </router-link>
                    |  -->
                    Articles
                </div>
            </div>
            <div class="col-6">
              <q-input
                v-model="search"
                debounce="500"
                filled
                placeholder="Search"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="col-3">
                <q-btn color="primary" label="Add new Article" @click="fixed = true"/>
            </div>

            <div class="col-12">
                <router-link class="q-pa-md row items-start q-gutter-md" v-for="article in filteredList" :key="article.id"  :to="`${categoryId}/article/${article.id}`"  >
                <q-card class="my-card text-white" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
                    <q-card-section>
                        <div class="text-h6">{{article.title}}</div>
                    </q-card-section>
                </q-card>
                </router-link>
            </div>
        </div>

        <q-dialog v-model="fixed">
            <q-card style="width: 450px">
                <q-card-section>
                <div class="text-h6">Add new Article</div>
                </q-card-section>

                <q-separator />

                <q-card-section>
                    <q-input
                        v-model="title"
                        outlined
                        placeholder="Tittle"
                        class="q-mb-md"
                    ></q-input>
                    <q-input
                        v-model="desc"
                        outlined
                        placeholder="Description"
                        type="textarea"
                    ></q-input>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn flat label="Close" color="primary" v-close-popup />
                    <q-btn flat label="Add" color="primary" @click="addArticle"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      categoryId: this.$route.params.id,
      articles: [],
      search: '',
      fixed: false,
      title: '',
      desc: ''
    }
  },
  methods: {
    getArticlesByCategory (id) {
      const config = {
        method: 'get',
        url: 'https://admin.davidkocharyan.com/api/v1/get-category-articles?category=' + id,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      }

      const that = this
      axios(config)
        .then(function (response) {
          console.log(response.data.data.list)
          that.articles = response.data.data.list
          that.fixed = false
        })
    },
    addArticle () {
      const data = {
        category_id: this.$route.params.id,
        title: this.title,
        text: this.desc
      }

      const config = {
        method: 'post',
        url: 'https://admin.davidkocharyan.com/api/v1/create-article',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        },
        data: data
      }

      const that = this
      axios(config)
        .then(function (response) {
          that.getArticlesByCategory(that.$route.params.id)
        })
    }
  },
  created () {
    this.getArticlesByCategory(this.$route.params.id)
  },
  computed: {
    filteredList: function () {
      const searchString = this.search.toLowerCase()
      return this.articles.filter(item => item.title.toLowerCase().includes(searchString))
    }
  }
}
</script>

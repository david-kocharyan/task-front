<template>
    <div class="row q-pa-md q-gutter-md">
        <div class="col-12">
            <div class="text-h5">
                <!-- <router-link :to="`/dashboard/categories/${articleCategoryId}`" class="clear-r-link">
                    <q-icon name="keyboard_backspace" /> Back
                </router-link> -->
            </div>
        </div>
        <q-separator/>
        <div class="col-12">
            <div class="text-h4">
                {{article.title}}
            </div>
            <p>
                {{article.text}}
            </p>
        </div>

    <q-separator/>
    <div class="col-12">
        <div class="text-h5 q-mb-md">Comments:</div>
        <div  v-if="comments.length">
            <q-card flat bordered class="my-card bg-grey-1 q-mb-sm q-mr-lg" v-for="comment in comments" :key="comment.id">
            <q-card-section>
                {{comment.text}}
            </q-card-section>
        </q-card>
        </div>
         <div v-else>
             No comments
         </div>
    </div>
    <q-separator/>
    <div class="col-12">
        <q-input outlined type="textarea" v-model="comment" label="Comment" />
    </div>
    <div class="col-12">
        <q-btn color="primary" label="Add comment" @click="addComent"/>

    </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      article: {},
      comment: '',
      comments: [],
      articleCategoryId: null
    }
  },
  methods: {
    addComent () {
      const data = {
        article_id: this.article.id,
        text: this.comment
      }

      const config = {
        method: 'post',
        url: 'https://admin.davidkocharyan.com/api/v1/add-comment',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        },
        data: data
      }

      const that = this
      axios(config)
        .then(function (response) {
          console.log(response)
          that.getComments(that.article.id)
          that.comment = ''
        })
    },
    getComments (id) {
      const config = {
        method: 'get',
        url: 'https://admin.davidkocharyan.com/api/v1/get-comments?article=' + id,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      }

      const that = this
      axios(config)
        .then(function (response) {
          that.comments = response.data.data.comment
        })
    },
    getArticle (id) {
      const config = {
        method: 'get',
        url: 'https://admin.davidkocharyan.com/api/v1/get-article?article=' + id,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      }

      const that = this
      axios(config)
        .then(function (response) {
          console.log(response.data.data.article)
          that.article = response.data.data.article
          that.articleCategoryId = response.data.data.article.id
          const _id = response.data.data.article.id
          that.getComments(_id)
        })
    }
  },
  created () {
    this.getArticle(this.$route.params.id)
    setTimeout(() => {
      console.log('asdasdasd')
    })
  }
}

</script>

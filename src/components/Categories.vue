<template>
    <div>
        <div class="row q-pa-md q-gutter-md">
            <div class="col-12">
                <div class="text-h5">Categories</div>
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
        </div>

        <router-link class="q-pa-md row items-start q-gutter-md" v-for="category in filteredList" :key="category.id"  :to="`categories/${category.id}`"  >
            <q-card class="my-card text-white" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
                <q-card-section>
                    <div class="text-h6">{{category.name}}</div>
                </q-card-section>
            </q-card>
        </router-link>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      categories: [],
      search: ''
    }
  },
  methods: {
    getAllCategories () {
      axios.get('https://admin.davidkocharyan.com/api/v1/get-all-categories')
        .then(res => {
          this.categories = res.data.data.category
        })
    }
  },
  mounted () {
    this.getAllCategories()
  },
  computed: {
    filteredList: function () {
      const searchString = this.search.toLowerCase()
      return this.categories.filter(item => item.name.toLowerCase().includes(searchString))
    }
  }
}
</script>

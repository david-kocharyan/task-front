<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          :)
        </q-toolbar-title>

        <q-btn-dropdown color="primary" label="Account" >
          <div class="row no-wrap q-pa-md">
            <div class="column items-center">
              <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

              <q-btn
                color="primary"
                label="Logout"
                push
                size="sm"
                v-close-popup
                @click="logOut"
              />

            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import axios from 'axios'

const linksData = [
  {
    title: 'Home',
    caption: '',
    icon: 'home',
    link: '/dashboard'
  },
  {
    title: 'Categories',
    caption: '',
    icon: 'school',
    link: '/dashboard/categories'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods: {
    logOut () {
      const config = {
        method: 'get',
        url: 'https://admin.davidkocharyan.com/api/v1/user/logout',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      }

      const that = this
      axios(config)
        .then(function (response) {
          that.$router.push('/')
        })
    },
    checkAuth () {
      const config = {
        method: 'post',
        url: 'https://admin.davidkocharyan.com/api/v1/check-auth',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      }

      const that = this
      axios(config)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
          that.$router.push('/')
        })
    }
  },
  beforeMount () {
    this.checkAuth()
  }
}
</script>

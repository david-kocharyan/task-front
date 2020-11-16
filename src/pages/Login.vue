<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274C5, #5A4A9F);"
  >
    <div class="column q-pa-lg" v-if="isLogin">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:430px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Sign In</h4>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input square clearable v-model="email" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square clearable v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="purple-4" class="full-width text-white" label="Sign In" @click="signIn" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6 cursor-pointer" @click="isLogin = !isLogin">Registration</p>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="column q-pa-lg" v-else>
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:550px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Sign Up</h4>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl q-pb-lg">
              <q-input square clearable v-model="email" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square clearable v-model="username" type="username" label="Username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input square clearable v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input square clearable v-model="confirmPassword" type="password" label="Confirm Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="purple-4" class="full-width text-white" label="Sign Up" @click="signUp"/>
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6 cursor-pointer" @click="isLogin = !isLogin">Login</p>
          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      isLogin: true
    }
  },
  methods: {
    signUp () {
      const data = {
        nickname: this.username,
        email: this.email,
        password: this.password,
        confirm_password: this.confirmPassword
      }
      axios.post('https://admin.davidkocharyan.com/api/v1/user/sign-up', data)
        .then(res => {
          const data = res.data.data
          localStorage.setItem('access_token', data.tokens.access_token)
          this.$router.push('/dashboard')
        })
    },
    signIn () {
      const data = {
        email: this.email,
        password: this.password
      }
      axios.post('https://admin.davidkocharyan.com/api/v1/user/sign-in', data)
        .then(res => {
          const data = res.data.data
          localStorage.setItem('access_token', data.tokens.access_token)
          this.$router.push('/dashboard')
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
          that.$router.push('/dashboard')
        })
    }
  },
  beforeMount () {
    this.checkAuth()
  }
}
</script>

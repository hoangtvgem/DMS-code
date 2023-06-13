<template>
  <div class="wscn-http404-container">
    <div style="text-align: center; margin-top: 30vh">
      <div class="otp-input-wrapper">
        <input type="text" maxlength="6" pattern="[0-9]*" autocomplete="off" v-model="pin">
        <svg viewBox="0 0 380 1" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="380" y2="0" stroke="#3e3e3e" stroke-width="2" stroke-dasharray="44,22" />
        </svg>
      </div>
      <div style="margin-top: 20px">Vui lòng nhập mã PIN trong phần mềm Authenticator</div>
      <button class="btn-primary" style="margin-top: 10px" @click="doneEnter">Đăng nhập</button>
    </div>
  </div>
</template>

<script>
import { enterPin } from '@/api/user' 
import Cookies from 'js-cookie'
export default {
  name: 'qrcode',
  data() {
    return {
      pin: null
    }
  },
  methods: {
    doneEnter () {
      enterPin({
        id: JSON.parse(localStorage.getItem('profile')).id,
        otpToken: this.pin,
        secret: JSON.parse(localStorage.getItem('profile')).secret
      }).then(response => {
        if (response.data.isValid) {
          this.$message({
            message: 'Đăng nhập thành công',
            type: 'success'
          })
          const profile = JSON.parse(localStorage.getItem('profile'))
          profile.token = response.data.token
          localStorage.setItem('profile', JSON.stringify(profile))
          Cookies.set('_token', response.data.token)
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        } else {
          this.$message({
            message: 'Mã OTP không đúng',
            type: 'error'
          })
        }
      })
      this.$router.push('/two-auth-pin')
    }
  }
}
</script>

<style lang="scss" scoped>
.otp-input-wrapper {
  width: 380px;
  text-align: left;
  display: inline-block;
}
.otp-input-wrapper input {
  padding: 0;
  width: 400px;
  font-size: 32px;
  font-weight: 600;
  color: #3e3e3e;
  background-color: transparent;
  border: 0;
  margin-left: 12px;
  letter-spacing: 48px;
  font-family: sans-serif !important;
}
.otp-input-wrapper input:focus {
  box-shadow: none;
  outline: none;
}
.otp-input-wrapper svg {
  position: relative;
  display: block;
  width: 380px;
  height: 2px;
}

</style>

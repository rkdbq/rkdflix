<script>
export default {
  name: "SignIn",
  data() {
    return {
      isLogin: true,
      buttonLabel: ["회원가입", "로그인"],

      userId: '',
      userPassword: '',

      userIdRegister: '',
      userPasswordRegister: '',
      userPasswordConfirmRegister: '',
      conditionAgreementRegister: false,
    }
  },
  methods: {
    LogIn() {
      console.log("ID:", this.userId);
      console.log("Password:", this.userPassword);

      this.$router.push('/')
    },
    Toggle() {
      this.isLogin = !this.isLogin;
    },
    Register() {
      console.log("Register:", this.userIdRegister);
      console.log("Register:", this.userPasswordRegister);
      console.log("Register:", this.userPasswordConfirmRegister);
      console.log("Register:", this.conditionAgreementRegister);
    }
  },
}
</script>

<template>
  <div v-if="isLogin" class="sign-in-container">
    <div>
      <label for="id">아이디:</label>
      <input type="text" id="id" v-model="userId" />
    </div>
    <div>
      <label for="password">비밀번호:</label>
      <input type="password" id="password" v-model="userPassword" />
    </div>
  </div>

  <div v-if="!isLogin" class="register-container">
    <div>
      <label for="id">아이디:</label>
      <input type="text" id="id" v-model="userIdRegister" />
    </div>
    <div>
      <label for="password">비밀번호:</label>
      <input type="password" id="password" v-model="userPasswordRegister" />
    </div>
    <div>
      <label for="password">비밀번호 확인:</label>
      <input type="password" id="password-confirm" v-model="userPasswordConfirmRegister" />
    </div>
    <div>
      <label for="password">약관 동의: </label>
      <input type="checkbox" id="condition-agreement" v-model="conditionAgreementRegister" />
    </div>
  </div>

  <div>
    <button v-if="isLogin" @click="LogIn">로그인</button>
    <button v-if="!isLogin" @click="Register">회원가입</button>
  </div>
  <div>
    <button @click="Toggle">{{ this.buttonLabel[Number(!this.isLogin)] }}하기</button>
  </div>
</template>

<style scoped>
div {
  margin-bottom: 10px;
}

label {
  margin-right: 8px;
}

input {
  padding: 5px;
  font-size: 14px;
}
</style>
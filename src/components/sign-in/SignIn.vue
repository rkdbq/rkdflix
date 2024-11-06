<template>
  <div v-if="isLogin" class="sign-in-container">
    <div>
      <label for="id">아이디:</label>
      <input type="text" id="id" v-model="userId" />
      <p style="color: red;">{{ emailError }}</p>
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
      <p style="color: red;">{{ emailError }}</p>
    </div>
    <div>
      <label for="password">비밀번호:</label>
      <input type="password" id="password" v-model="userPasswordRegister" />
    </div>
    <div>
      <label for="password">비밀번호 확인:</label>
      <input type="password" id="password-confirm" v-model="userPasswordConfirmRegister" />
      <p style="color: red;">{{ passwordError }}</p>
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

      emailError: '',
      passwordError: '',
    }
  },
  watch: {
    userId(value) {
      this.checkEmail(value);
    },
    userIdRegister(value) {
      this.checkEmail(value);
    },
    userPasswordRegister() {
      this.checkPassword();
    },
    userPasswordConfirmRegister() {
      this.checkPassword();
    }
  },
  methods: {
    LogIn() {
      if(!this.userId) {
        alert('아이디를 입력해주세요.');
      }
      if (!this.userPassword) {
        alert('비밀번호를 입력해주세요.');
        return;
      }

      const user = JSON.parse(localStorage.getItem(this.userId));

      if(!user || this.userPassword !== user['password']) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      alert('로그인 성공!');
      this.$store.commit('setUser', { userId: this.userId, password: user['password'], wishlist: user['wishlist'] });
      this.$router.push('/');
    },
    Toggle() {
      this.isLogin = !this.isLogin;

      this.userId = '';
      this.userPassword = '';

      this.userIdRegister = '';
      this.userPasswordRegister = '';
      this.userPasswordConfirmRegister = '';
      this.conditionAgreementRegister = false;
    },
    Register() {
      if (!this.userIdRegister) {
        alert('아이디를 입력해주세요.');
        return;
      }
      if (!this.userPasswordRegister) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      if (this.emailError) {
        alert(this.emailError);
        return;
      }
      if (this.passwordError) {
        alert(this.passwordError);
        return;
      }
      if (!this.conditionAgreementRegister) {
        alert('약관에 동의해주세요.');
        return;
      }

      alert('회원가입 성공!');
      const user = {
        'password': this.userPasswordRegister,
        'wishlist': {},
      }
      localStorage.setItem(this.userIdRegister, JSON.stringify(user));
      this.Toggle();
    },
    checkEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = email && !emailPattern.test(email) ? "유효한 이메일 형식이 아닙니다." : '';
    },
    checkPassword() {
      const pw = this.userPasswordRegister;
      const pwConfirm = this.userPasswordConfirmRegister;
      this.passwordError = pw !== pwConfirm ? "비밀번호가 다릅니다." : '';
    }
  },
}
</script>

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
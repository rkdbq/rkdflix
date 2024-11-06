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
    <button @click="Toggle">{{ buttonLabel[Number(!isLogin)] }}하기</button>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "SignIn",
  setup() {
    const store = useStore();
    const router = useRouter();

    const isLogin = ref(true);
    const buttonLabel = ref(["회원가입", "로그인"]);

    const userId = ref('');
    const userPassword = ref('');

    const userIdRegister = ref('');
    const userPasswordRegister = ref('');
    const userPasswordConfirmRegister = ref('');
    const conditionAgreementRegister = ref(false);

    const emailError = ref('');
    const passwordError = ref('');

    // Watchers
    watch(userId, (value) => {
      checkEmail(value);
    });
    watch(userIdRegister, (value) => {
      checkEmail(value);
    });
    watch(userPasswordRegister, () => {
      checkPassword();
    });
    watch(userPasswordConfirmRegister, () => {
      checkPassword();
    });

    const LogIn = () => {
      if (!userId.value) {
        alert('아이디를 입력해주세요.');
      }
      if (!userPassword.value) {
        alert('비밀번호를 입력해주세요.');
        return;
      }

      const user = JSON.parse(localStorage.getItem(userId.value));

      if (!user || userPassword.value !== user['password']) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      alert('로그인 성공!');
      store.commit('setUser', { userId: userId.value, password: user['password'], wishlist: user['wishlist'] });
      router.push('/');
    };

    const Toggle = () => {
      isLogin.value = !isLogin.value;

      userId.value = '';
      userPassword.value = '';

      userIdRegister.value = '';
      userPasswordRegister.value = '';
      userPasswordConfirmRegister.value = '';
      conditionAgreementRegister.value = false;
    };

    const Register = () => {
      if (!userIdRegister.value) {
        alert('아이디를 입력해주세요.');
        return;
      }
      if (!userPasswordRegister.value) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      if (emailError.value) {
        alert(emailError.value);
        return;
      }
      if (passwordError.value) {
        alert(passwordError.value);
        return;
      }
      if (!conditionAgreementRegister.value) {
        alert('약관에 동의해주세요.');
        return;
      }

      alert('회원가입 성공!');
      const user = {
        'password': userPasswordRegister.value,
        'wishlist': {},
      }
      localStorage.setItem(userIdRegister.value, JSON.stringify(user));
      Toggle();
    };

    const checkEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      emailError.value = email && !emailPattern.test(email) ? "유효한 이메일 형식이 아닙니다." : '';
    };

    const checkPassword = () => {
      const pw = userPasswordRegister.value;
      const pwConfirm = userPasswordConfirmRegister.value;
      passwordError.value = pw !== pwConfirm ? "비밀번호가 다릅니다." : '';
    };

    return {
      isLogin,
      buttonLabel,
      userId,
      userPassword,
      userIdRegister,
      userPasswordRegister,
      userPasswordConfirmRegister,
      conditionAgreementRegister,
      emailError,
      passwordError,
      LogIn,
      Toggle,
      Register,
    };
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

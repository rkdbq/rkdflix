<template>
  <div v-if="isLogin" class="sign-in-container">
    <UserInput :field-name="'아이디'"
                 :input-field="userId"
                 :validation-message="emailError"
                 :validate-function="validateEmail"
                 @on-changed="onIdChanged"
    />
    <div>
      <label for="pw">비밀번호:</label>
      <input type="password" id="pw" v-model="userPw" />
    </div>
  </div>

  <div v-if="!isLogin" class="register-container">
    <div>
      <label for="id">아이디:</label>
      <input type="text" id="id" v-model="userIdRegister" />
      <p style="color: red;">{{ emailError }}</p>
    </div>
    <div>
      <label for="pw">비밀번호:</label>
      <input type="password" id="pw" v-model="userPwRegister" />
    </div>
    <div>
      <label for="pw">비밀번호 확인:</label>
      <input type="password" id="pw-confirm" v-model="userPwConfirmRegister" />
      <p style="color: red;">{{ pwError }}</p>
    </div>
    <div>
      <label for="pw">약관 동의: </label>
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
import UserInput from "@/components/sign-in/UserInput.vue";

export default {
  name: "SignIn",
  components: {UserInput: UserInput},
  setup() {
    const store = useStore();
    const router = useRouter();

    const isLogin = ref(true);
    const buttonLabel = ref(["회원가입", "로그인"]);

    const userId = ref('');
    const userPw = ref('');

    const userIdRegister = ref('');
    const userPwRegister = ref('');
    const userPwConfirmRegister = ref('');
    const conditionAgreementRegister = ref(false);

    const emailError = ref('');
    const pwError = ref('');

    // Watchers
    // watch(userId, (value) => {
    //   checkEmail(value);
    // });
    watch(userIdRegister, (value) => {
      checkEmail(value);
    });
    watch(userPwRegister, () => {
      checkPassword();
    });
    watch(userPwConfirmRegister, () => {
      checkPassword();
    });

    const LogIn = () => {
      if(emailError.value) {
        alert(emailError.value);
      }
      if (!userId.value) {
        alert('아이디를 입력해주세요.');
      }
      if (!userPw.value) {
        alert('비밀번호를 입력해주세요.');
        return;
      }

      const user = JSON.parse(localStorage.getItem(userId.value));

      if (!user || userPw.value !== user['password']) {
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
      userPw.value = '';

      userIdRegister.value = '';
      userPwRegister.value = '';
      userPwConfirmRegister.value = '';
      conditionAgreementRegister.value = false;
    };

    const Register = () => {
      if (emailError.value) {
        alert(emailError.value);
        return;
      }
      if (pwError.value) {
        alert(pwError.value);
        return;
      }
      if (!userIdRegister.value) {
        alert('아이디를 입력해주세요.');
        return;
      }
      if (!userPwRegister.value) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      if (!conditionAgreementRegister.value) {
        alert('약관에 동의해주세요.');
        return;
      }

      alert('회원가입 성공!');
      const user = {
        'password': userPwRegister.value,
        'wishlist': {},
      }
      localStorage.setItem(userIdRegister.value, JSON.stringify(user));
      Toggle();
    };

    const checkEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      emailError.value = email && !emailPattern.test(email) ? "유효한 이메일 형식이 아닙니다." : '';
      console.log(emailError.value);
    };

    const validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      emailError.value = email && !emailPattern.test(email) ? "유효한 이메일 형식이 아닙니다." : '';
      return emailError.value;
    };

    const onIdChanged = (args) => {
      const email = args[0].value;
      const msg = args[1].value;
      userId.value = email;
      emailError.value = msg;
    }

    const checkPassword = () => {
      const pw = userPwRegister.value;
      const pwConfirm = userPwConfirmRegister.value;
      pwError.value = pw !== pwConfirm ? "비밀번호가 다릅니다." : '';
    };

    return {
      isLogin,
      buttonLabel,
      userId,
      userPw,
      userIdRegister,
      userPwRegister,
      userPwConfirmRegister,
      conditionAgreementRegister,
      emailError,
      pwError,
      LogIn,
      Toggle,
      Register,
      checkEmail,
      validateEmail,
      onIdChanged
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

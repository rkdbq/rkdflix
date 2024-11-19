<template>
  <div class="login-container">
    <div v-if="isLogin" class="login-box">
      <h1>Sign In</h1>
      <UserInput
          :placeholder="'아이디'"
          :input-field="userId"
          :input-type="'text'"
          @on-changed="onIdChanged"
      />
      <UserInput
          :placeholder="'비밀번호'"
          :input-field="userPw"
          :input-type="'password'"
          @on-changed="onPwChanged"
      />
      <div class="checkbox-container">
        <UserInput
            :placeholder="'로그인 정보 저장'"
            :input-field="rememberMe"
            :input-type="'checkbox'"
            @on-changed="onRememberMeChanged"
        />
        <label for="rememberMe">로그인 정보 저장</label>
      </div>
    </div>

    <div v-if="!isLogin" class="register-box">
      <h1>Sign Up</h1>
      <UserInput
          :placeholder="'아이디'"
          :input-field="userId"
          :input-type="'text'"
          @on-changed="onIdChanged"
          :validation-message="emailError"
      />
      <UserInput
          :placeholder="'비밀번호'"
          :input-field="userPw"
          :input-type="'password'"
          @on-changed="onPwChanged"
      />
      <UserInput
          :placeholder="'비밀번호 확인'"
          :input-field="userPwConfirm"
          :input-type="'password'"
          @on-changed="onPwConfirmChanged"
          :validation-message="pwError"
      />
      <div class="checkbox-container">
        <UserInput
            :placeholder="'약관 동의'"
            :input-field="userConditionAgreement"
            :input-type="'checkbox'"
            @on-changed="onConditionAgreementChanged"
        />
        <label for="userConditionAgreement">약관 동의</label>
      </div>
    </div>

    <div class="action-buttons">
      <RkdButton v-if="isLogin" :on-click="LogIn" :width-size="200">로그인</RkdButton>
      <RkdButton v-if="!isLogin" :on-click="Register" :width-size="200">회원가입</RkdButton>
    </div>

    <div class="toggle-button">
      <RkdButton :on-click="Toggle" :width-size="200">{{ buttonLabel[Number(!isLogin)] }}하기</RkdButton>
    </div>
  </div>
</template>


<script>
import {onMounted, ref} from 'vue';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import UserInput from "@/components/sign-in/UserInput.vue";
import RkdButton from "@/components/etc/RkdButton.vue";

export default {
  name: "SignIn",
  components: {RkdButton, UserInput: UserInput},
  setup() {
    const store = useStore();
    const router = useRouter();

    const isLogin = ref(true);
    const buttonLabel = ref(["회원가입", "로그인"]);

    const userId = ref('');
    const userPw = ref('');
    const userPwConfirm = ref('');

    const rememberMe = ref(false);
    const userConditionAgreement = ref(false);

    const emailError = ref('');
    const pwError = ref('');

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

      if(rememberMe.value) {
        const rememberUser = {
          id: userId.value,
          password: userPw.value,
        }
        localStorage.setItem('remember_me', JSON.stringify(rememberUser));
      }

      alert('로그인 성공!');
      store.commit('setUser', { userId: userId.value, password: user['password'], wishlist: user['wishlist'], search: user['search'] });
      router.push('/');
    };

    const Toggle = () => {
      isLogin.value = !isLogin.value;

      userId.value = '';
      userPw.value = '';
      userPwConfirm.value = '';
      userConditionAgreement.value = false;
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
      if (!userId.value) {
        alert('아이디를 입력해주세요.');
        return;
      }
      if (!userPw.value) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      if (!userConditionAgreement.value) {
        alert('약관에 동의해주세요.');
        return;
      }

      if (localStorage.getItem(userId.value)) {
        alert('존재하는 아이디입니다.');
        return;
      }

      alert('회원가입 성공!');
      const user = {
        'password': userPw.value,
        'wishlist': {},
        'search': {
          'genre': "장르",
          'vote avg': "별점",
          'sort by': "기준",
          'order by': "순서"
        },
      }
      localStorage.setItem(userId.value, JSON.stringify(user));
      Toggle();
    };

    const validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const errorMessage = ref(email.value && !emailPattern.test(email.value) ? "유효한 이메일 형식이 아닙니다." : '');
      return errorMessage.value;
    };

    const onIdChanged = (args) => {
      userId.value = args[0].value;
      emailError.value = validateEmail(userId);
    }

    const validatePw = (pw, pwConfirm) => {
      const errorMessage = ref(pw.value !== pwConfirm.value ? "비밀번호가 다릅니다." : '');
      return errorMessage.value;
    }

    const onPwChanged = (args) => {
      userPw.value = args[0].value;
      pwError.value = validatePw(userPw, userPwConfirm);
    }

    const onPwConfirmChanged = (args) => {
      userPwConfirm.value = args[0].value;
      pwError.value = validatePw(userPw, userPwConfirm);
    }

    const onRememberMeChanged = (args) => {
      rememberMe.value = args[0].value;
    }

    const onConditionAgreementChanged = (args) => {
      userConditionAgreement.value = args[0].value;
    }

    onMounted(() => {
      const rememberMe = JSON.parse(localStorage.getItem('remember_me'));
      if (rememberMe) {
        userId.value = rememberMe['id'];
        userPw.value = rememberMe['password'];
        LogIn();
      }
    })

    return {
      isLogin,
      buttonLabel,
      userId,
      userPw,
      userPwConfirm,
      rememberMe,
      userConditionAgreement,
      emailError,
      pwError,
      Toggle,
      LogIn,
      Register,
      validateEmail,
      onIdChanged,
      onPwChanged,
      onPwConfirmChanged,
      onRememberMeChanged,
      onConditionAgreementChanged
    };
  },
}
</script>

<style scoped>
/* 넷플릭스 스타일 CSS */
.login-container {
  background-color: #141414;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: Arial, sans-serif;
}

h1 {
  color: white;
  margin-bottom: 20px;
  text-align: center;
}

.login-box,
.register-box {
  background-color: #333333;
  border-radius: 8px;
  padding: 30px 20px;
  width: 320px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

input[type="text"],
input[type="password"],
input[type="checkbox"] {
  width: 100%;
  padding: 10px;
  background-color: #444;
  border: 1px solid #555;
  border-radius: 4px;
  color: white;
  margin-top: 10px;
}

input[type="text"]::placeholder,
input[type="password"]::placeholder {
  color: #8c8c8c;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.checkbox-container label {
  margin-left: 10px;
  font-size: 14px;
  color: #8c8c8c;
}

button {
  width: 100%;
  display: flex;
  background-color: #e50914;
}

button:hover {
  background-color: #f6121d;
}

.toggle-button {
  margin-top: 10px;
}

.toggle-button button {
  background-color: transparent;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
}
.toggle-button button:hover {
  transform: scale(1.0);
  color: #f6121d;
  border: none;
}
.toggle-button button:focus {
  box-shadow: none;
}

</style>

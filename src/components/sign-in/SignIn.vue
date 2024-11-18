<template>
  <div v-if="isLogin" class="sign-in-container">
    <UserInput :field-name="'아이디'"
               :input-field="userId"
               :input-type="'text'"
               @on-changed="onIdChanged"
    />
    <UserInput :field-name="'비밀번호'"
               :input-field="userPw"
               :input-type="'password'"
               @on-changed="onPwChanged"
    />
    <UserInput :field-name="'로그인 정보 저장'"
               :input-field="rememberMe"
               :input-type="'checkbox'"
               @on-changed="onRememberMeChanged"
    />
  </div>

  <div v-if="!isLogin" class="register-container">
    <UserInput :field-name="'아이디'"
               :input-field="userId"
               :input-type="'text'"
               @on-changed="onIdChanged"
               :validation-message="emailError"
    />
    <UserInput :field-name="'비밀번호'"
               :input-field="userPw"
               :input-type="'password'"
               @on-changed="onPwChanged"
    />
    <UserInput :field-name="'비밀번호 확인'"
               :input-field="userPwConfirm"
               :input-type="'password'"
               @on-changed="onPwConfirmChanged"
               :validation-message="pwError"
    />
    <UserInput :field-name="'약관 동의'"
               :input-field="userConditionAgreement"
               :input-type="'checkbox'"
               @on-changed="onConditionAgreementChanged"
    />
  </div>

  <div>
    <RkdButton v-if="isLogin" :on-click="LogIn" :width-size="200">로그인</RkdButton>
    <RkdButton v-if="!isLogin" :on-click="Register" :width-size="200">회원가입</RkdButton>
  </div>
  <div>
    <RkdButton :on-click="Toggle" :width-size="200">{{ buttonLabel[Number(!isLogin)] }}하기</RkdButton>
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
div {
  margin-bottom: 10px;
}
</style>

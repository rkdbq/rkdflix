<template>
  <div class="login-container">
    <div class="background"></div>
    <div class="login-box">
      <Transition name="slide-up" mode="out-in">
        <div class="input-box" v-if="isLogin">
          <h1>로그인</h1>
          <UserInput class="input-container"
                     :placeholder="'아이디'"
                     :input-field="userId"
                     :input-type="'text'"
                     @on-changed="onIdChanged"
          />
          <UserInput class="input-container"
                     :placeholder="'비밀번호'"
                     :input-field="userPw"
                     :input-type="'password'"
                     @on-changed="onPwChanged"
          />
          <div class="input-container">
            <UserInput
                :placeholder="'로그인 정보 저장'"
                :input-field="rememberMe"
                :input-type="'checkbox'"
                @on-changed="onRememberMeChanged"
            />
            <label for="rememberMe">로그인 정보 저장</label>
          </div>
        </div>
        <div class="input-box" v-else>
          <h1>회원가입</h1>
          <UserInput class = "input-container"
                     :placeholder="'아이디'"
                     :input-field="userId"
                     :input-type="'text'"
                     @on-changed="onIdChanged"
                     :validation-message="emailError"
          />
          <UserInput class = "input-container"
                     :placeholder="'비밀번호'"
                     :input-field="userPw"
                     :input-type="'password'"
                     @on-changed="onPwChanged"
          />
          <UserInput class = "input-container"
                     :placeholder="'비밀번호 확인'"
                     :input-field="userPwConfirm"
                     :input-type="'password'"
                     @on-changed="onPwConfirmChanged"
                     :validation-message="pwError"
          />
          <div class = "input-container">
            <UserInput
                :placeholder="'약관 동의'"
                :input-field="userConditionAgreement"
                :input-type="'checkbox'"
                @on-changed="onConditionAgreementChanged"
            />
            <label for="userConditionAgreement">약관 동의</label>
          </div>
        </div>
      </Transition>

      <div class="action-buttons">
        <RkdButton v-if="isLogin" :on-click="LogIn" :width-size="200">로그인</RkdButton>
        <div class="oauth-button">
          <RkdButton v-if="isLogin" :on-click="KakaoLogIn" :width-size="200">카카오 로그인</RkdButton>
        </div>
        <RkdButton v-if="!isLogin" :on-click="Register" :width-size="200">회원가입</RkdButton>
      </div>

      <div class="toggle-button">
        <RkdButton :on-click="Toggle" :width-size="200">{{ buttonLabel[Number(!isLogin)] }}하기</RkdButton>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import UserInput from "@/components/sign-in/UserInput.vue";
import RkdButton from "@/components/etc/RkdButton.vue";
import {useToast} from "vue-toast-notification";

export default {
  name: "SignIn",
  components: {RkdButton, UserInput: UserInput},
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast({
      position: window.innerWidth > 768 ? "bottom-right" : "bottom",
    });

    const isLogin = ref(true);
    const buttonLabel = ref(["회원가입", "로그인"]);

    const userId = ref('');
    const userPw = ref('');
    const userPwConfirm = ref('');

    const rememberMe = ref(false);
    const userConditionAgreement = ref(false);

    const emailError = ref('');
    const pwError = ref('');

    let clientId = process.env.VUE_APP_DEV_KAKAO_CLIENT_ID;
    let redirectUri = process.env.VUE_APP_DEV_KAKAO_REDIRECT_URI;

    if (process.env.NODE_ENV === 'production') {
      clientId = process.env.VUE_APP_PROD_KAKAO_CLIENT_ID;
      redirectUri = process.env.VUE_APP_PROD_KAKAO_REDIRECT_URI;
    }

    const KakaoAuth = () => {
      const url = 'https://kauth.kakao.com/oauth/authorize?client_id=' +
        clientId + 
        '&redirect_uri=' +
        redirectUri +
        '&response_type=code&' +
        'scope=profile_nickname';

      window.location.href = url;
    }

    const GetKakaoUser = async (accessToken) => {
      try {
          const response = await fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${accessToken}`
             }
          });
          const data = await response.json();
          return data;
        } catch (error) {
          toast.error('토큰 요청 중 오류가 발생했습니다.');
          console.error('토큰 요청 중 오류 발생:', error);
          return error;
        }
    }

    const LogIn = () => {
      if(!navigator.onLine) {
        return;
      }
      if(emailError.value) {
        toast.error(emailError.value);
        return;
      }
      if (!userId.value) {
        toast.error('아이디를 입력해주세요.');
        return;
      }
      if (!userPw.value) {
        toast.error('비밀번호를 입력해주세요.');
        return;
      }

      const user = JSON.parse(localStorage.getItem(userId.value));

      if (!user || userPw.value !== user['password']) {
        toast.error('비밀번호가 일치하지 않습니다.');
        return;
      }

      if(rememberMe.value) {
        const rememberUser = {
          id: userId.value,
          password: userPw.value,
        }
        localStorage.setItem('remember_me', JSON.stringify(rememberUser));
      }

      toast.success('로그인 성공!');
      store.commit('setUser', { userId: userId.value, password: user['password'], wishlist: user['wishlist'], search: user['search'], nickname: user['nickname'] });
      router.push('/');
    };

    const Toggle = () => {
      isLogin.value = !isLogin.value;

      userId.value = '';
      userPw.value = '';
      userPwConfirm.value = '';
      userConditionAgreement.value = false;
    };

    const KakaoLogIn = (kakaoId, nickname) => {
      let user = JSON.parse(localStorage.getItem(kakaoId));

      if (user) {
        toast.success('로그인 성공!');
      }
      else {
        toast.success('회원가입 성공!');
        const new_user = {
          'password': 'kakao',
          'wishlist': {},
          'search': {
            'genre': "장르",
            'vote avg': "별점",
            'sort by': "기준",
            'order by': "순서"
          },
          'nickname': nickname
        }
        localStorage.setItem(kakaoId, JSON.stringify(new_user));
        user = JSON.parse(localStorage.getItem(kakaoId));
      }
      
      store.commit('setUser', { userId: kakaoId, password: user['password'], wishlist: user['wishlist'], search: user['search'], nickname: user['nickname'] });
      const rememberUser = {
          id: kakaoId,
          password: 'kakao',
        }
        localStorage.setItem('remember_me', JSON.stringify(rememberUser));

      router.push('/');
    }

    const Register = () => {
      if (emailError.value) {
        toast.error(emailError.value);
        return;
      }
      if (pwError.value) {
        toast.error(pwError.value);
        return;
      }
      if (!userId.value) {
        toast.error('아이디를 입력해주세요.');
        return;
      }
      if (!userPw.value) {
        toast.error('비밀번호를 입력해주세요.');
        return;
      }
      if (!userConditionAgreement.value) {
        toast.error('약관에 동의해주세요.');
        return;
      }

      if (localStorage.getItem(userId.value)) {
        toast.error('존재하는 아이디입니다.');
        return;
      }

      toast.success('회원가입 성공!');
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

    onMounted( async () => {
      const rememberMe = JSON.parse(localStorage.getItem('remember_me'));
      if (rememberMe) {
        userId.value = rememberMe['id'];
        userPw.value = rememberMe['password'];
        LogIn();
      }
      
      const urlParams = new URLSearchParams(window.location.search);
      const authorizeCode = urlParams.get('code');
      if (authorizeCode) {
        try {
          const response = await fetch('https://kauth.kakao.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              client_id: clientId,
              redirect_uri: redirectUri,
              code: authorizeCode
            })
          });
          const data = await response.json();
          if(data.access_token) {
            const user = await GetKakaoUser(data.access_token);
            localStorage.setItem('access_token', data.access_token);

            console.log(user.id);
            console.log(user.properties.nickname);
            KakaoLogIn(user.id, user.properties.nickname);
          }
        } catch (error) {
          if(!navigator.onLine) {
            console.error('네트워크 연결 오류:', error);
            toast.error('네트워크 연결에 문제가 있습니다. 인터넷을 확인하세요.');
            router.push('/error');
          }
          console.error('API 호출 오류:', error);
          toast.error('API 호출 중 오류가 발생했습니다.');
        }
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
      KakaoLogIn: KakaoAuth,
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
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: Arial, sans-serif;
  overflow: hidden;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-image:
      url("/src/assets/signin-background.png");
  background-size: cover;
  background-position: center;
  transform-origin: center center;  /* 기울일 때 중심을 유지 */
  transform: skew(-25deg, 5deg) scale(1.25);
  filter: brightness(70%) blur(2px);
}

h1 {
  color: white;
  margin-bottom: 20px;
  text-align: center;
}

.login-box {
  position: relative;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  padding: 30px 20px;
  width: 320px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  justify-content: center;
}

.input-container {
  margin-bottom: 20px;
  display: flex;
  align-content: center;
}

.input-container label {
  align-content: center;
  margin-left: 10px;
  font-size: 14px;
  color: #8c8c8c;
}

button {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  background-color: #e50914;
}

.oauth-button button {
  color: #2a2828;
  background-color: #f7ff06;
}

button:hover {
  background-color: #f6121d;
}

.oauth-button button:hover {
  background-color: #c5cb10;
}

.toggle-button {
  display: flex;
  margin-top: 10px;
}

.toggle-button button {
  background-color: transparent;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  box-shadow: none;
}
.toggle-button button:hover {
  transform: none;
  color: #f6121d;
  border: none;
}
.toggle-button button:focus {
  box-shadow: none;
}
.toggle-button button:active {
  box-shadow: none;
  transform: none;
}

.input-box {
  position: relative;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

@media (max-width: 768px) {
  .background {
    width: 200%;
    scale: 1.25;
  }
}
</style>

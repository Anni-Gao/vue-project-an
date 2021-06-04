<template>
  <div class="body">
    <h1>欢迎来到实验室预约系统</h1>
    <div class="form">
      <form>
        <label
          ><input
            type="text"
            id="username"
            required="required"
            placeholder="用户名"
            name="username"
            v-model="userForm.username"
        /></label>
        <label
          ><input
            type="password"
            id="password"
            required="required"
            placeholder="密码"
            name="password"
            v-model="userForm.password"
        /></label>
        <button class="button" id="button" @click="login">登录</button>
      </form>
      <p>管理员：用户名：admin 密码：admin</p>
      <p>教师：用户名：teacher 密码：teacher</p>
    </div>
  </div>
</template>

<script lang="ts">
import { State } from "@/store";
import { LOGIN } from "@/store/VuexTypes";
import { computed, defineComponent, Ref, ref } from "vue";
import { Store, useStore } from "vuex";

interface User {
  username?: string;
  password?: string;
}

function useLogin(userForm: Ref<User>, store: Store<State>) {
  const login = () => {
    const user = {
      username: userForm.value.username,
      password: userForm.value.password,
    };
    store.dispatch(LOGIN, user);
    userForm.value.username = "";
    userForm.value.password = "";
  };
  return {
    login,
  };
}

export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const userForm = ref<User>({});
    const { login } = useLogin(userForm, store);
    const user = computed(() => store.state.user);
    return {
      user,
      userForm,
      login,
    };
  },
});
</script>

<style scoped>
.body {
  background: url("../assets/background.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
.form {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -150px;
  width: 300px;
  height: 300px;
}
input {
  width: 278px;
  height: 18px;
  margin-bottom: 25px;
  outline: none;
  padding: 10px;
  font-size: 13px;
  color: #fff;
  text-shadow: 1px 1px 1px;
  border: 1px solid forestgreen;
  border-radius: 4px;
  background-color: #2d2d3f;
}
button {
  width: 300px;
  min-height: 20px;
  display: block;
  background-color: #4a77d4;
  border: 1px solid #3762bc;
  color: #fff;
  padding: 9px 14px;
  font-size: 15px;
  line-height: normal;
  border-radius: 5px;
  margin: 0;
}
p {
  color: #fff;
}
</style>

import axios from "@/axios";
import { User } from "@/datasource/Types";
import { ResultVO } from "@/mock";
import { ActionTree, createStore, GetterTree, MutationTree } from "vuex";
import * as vxt from "./VuexTypes";

export interface State {
  user: User;
  exception: string;
  isLogin: boolean;
}

const myState: State = {
  user: {},
  exception: "",
  isLogin: false,
};
const myMutations: MutationTree<State> = {
  [vxt.UPDATE_USER]: (state, data: User) => (state.user = data),
  [vxt.UPDATE_EXCEPTION]: (state, data: string) => (state.exception = data),
};

const myActions: ActionTree<State, State> = {
  [vxt.UPDATE_USER]: ({ commit }, data: User) => {
    setTimeout(() => commit(vxt.UPDATE_USER, data), 2000);
  },
  [vxt.LOGIN]: async ({ commit }, user) => {
    // try可避免控制台的未捕获异常信息
    try {
      const resp = await axios.post<ResultVO>("login", user);
      console.log(resp.headers.token);
      sessionStorage.setItem("token", resp.headers.token);
      commit(vxt.UPDATE_USER, resp.data.data.user);
    } catch (error) {
      // eslint默认禁止空执行体。加一段注释或关闭该检测
    }
  },
};

const myGetters: GetterTree<State, State> = {
  premission: (state) => (level: string) => state.user?.level == level,
  [vxt.GETTER_PREMISSION]: (state) => (level: string) =>
    state.user?.level == level,
};
// 加载vuex时，判断登录/角色等信息，加载初始化数据
const token = sessionStorage.getItem("token");
if (token && token.length > 96) {
  myState.isLogin = true;
}

export default createStore({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  getters: myGetters,
  modules: {},
});
// https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
//const key: InjectionKey<Store<State>> = Symbol()
// export function useStore () {
//   return baseUseStore(key)
// }

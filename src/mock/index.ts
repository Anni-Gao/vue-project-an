import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);
// 过滤http前缀请求
mock.onAny(/^http/).passThrough();
mock.onAny(/^\/api\//).passThrough();

export interface ResultVO {
  code: number;
  message?: string;
  data?: any;
}
const resulVO: ResultVO = {
  code: 200,
  data: {},
};

// config，axios config对象。包含请求信息
// 返回数组，[status, {data对象}, {header对象}]
mock.onPost("login").reply((c) => {
  // 获取请求数据
  // 此时请求的js对象已转为json字符串。因此需要转换回JS对象
  const data = c.data;
  const { username, password } = JSON.parse(data);
  if (username == "admin" && password == "admin") {
    resulVO.code = 200;
    resulVO.data = { level: "admin" };
    resulVO.message = "";
    return [
      200,
      resulVO,
      {
        token:
          "744193c872b677aab12a0ced447882f4cf9fca92a09d428a26ed145ed2ed2eec665c8824ebc353042ba2be136efcb5c6",
      },
    ];
  }
  if (username == "teacher" && password == "teacher") {
    resulVO.code = 200;
    resulVO.data = { level: "teacher" };
    resulVO.message = "";
    return [
      200,
      resulVO,
      {
        token:
          "744193c872b677aab12a0ced447882f4cf9fca92a09d428a26ed145ed2ed2eec665c8824ebc353042ba2be136efcb5c7",
      },
    ];
  }
  resulVO.code = 401;
  resulVO.message = "用户名密码错误";
  return [200, resulVO];
});

// 模拟请求携带token是否合法
mock.onGet("home").reply((c) => {
  const auth = c.headers?.authorization;
  if (
    auth ==
      "744193c872b677aab12a0ced447882f4cf9fca92a09d428a26ed145ed2ed2eec665c8824ebc353042ba2be136efcb5c6" ||
    auth ==
      "744193c872b677aab12a0ced447882f4cf9fca92a09d428a26ed145ed2ed2eec665c8824ebc353042ba2be136efcb5c7"
  ) {
    resulVO.code = 200;
    return [200, resulVO];
  }
  resulVO.code = 403;
  resulVO.message = "无权限";
  return [200, resulVO];
});

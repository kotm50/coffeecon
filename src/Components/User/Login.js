import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { loginUser } from "../../Reducer/userSlice";

function Login(props) {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const login = async () => {
    const data = {
      userId: id,
      userPwd: pwd,
    };
    const loginChk = await axios
      .post("/api/v1/cafecon/login", data)
      .then(res => {
        if (res.data.code === "C000") {
          const user = res.data.cafeUser;
          const token = res.headers.authorization;
          console.log(user);
          dispatch(
            loginUser({
              userId: user.userId,
              userName: user.userName,
              accessToken: token,
              lastLogin: new Date(),
              point: user.point,
              admin: true,
            })
          );
          return true;
        } else {
          return false;
        }
      })
      .catch(e => {
        console.log(e);
        return false;
      });
    if (loginChk) {
      props.setModalOn(false);
    }
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      login();
    }
  };
  return (
    <>
      <div className="fixed w-[95%] h-fit max-h-[720px] max-w-[640px] text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white rounded-xl z-20">
        <button
          className="w-full p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded"
          onClick={() => {
            props.setModalOn(false);
          }}
        >
          창 닫기
        </button>
        <div className="flex flex-col justify-end gap-y-3 mt-4">
          <div className="flex flex-col justify-start gap-y-1 text-left">
            <label htmlFor="phone" className="text-sm font-neobold">
              아이디
            </label>
            <input
              id="id"
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={e => setId(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-col justify-start gap-y-2 text-left">
            <label htmlFor="pwd" className="text-sm font-neobold">
              비밀번호
            </label>
            <input
              id="pwd"
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="비밀번호를 입력하세요"
              value={pwd}
              onChange={e => setPwd(e.currentTarget.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            className="w-full bg-green-500 hover:bg-green-700 text-white p-2 rounded"
            onClick={() => login(id, pwd)}
          >
            로그인 하기
          </button>
        </div>
      </div>

      <div
        className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black bg-opacity-50 z-10"
        onClick={() => {
          props.setModalOn(false);
        }}
      ></div>
    </>
  );
}

export default Login;

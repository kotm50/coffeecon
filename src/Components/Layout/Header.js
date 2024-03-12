import React, { useEffect, useState } from "react";
import logo from "../../Asset/latteArt.png";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import { PiUser } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import Login from "../User/Login";
import { useDispatch } from "react-redux";
import { clearUser } from "../../Reducer/userSlice";

function Header(props) {
  const dispatch = useDispatch();
  const thisLocation = useLocation();
  const parsed = queryString.parse(thisLocation.search);
  const keyword = parsed.keyword || "";
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (keyword !== "") {
      setSearchKeyword(keyword);
    }
    //eslint-disable-next-line
  }, [thisLocation]);

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      props.searchIt(event.currentTarget.value);
    }
  };

  const logout = () => {
    dispatch(clearUser());
  };
  return (
    <header className="flex justify-between h-[56px] lg:h-[96px] lg:gap-x-10 gap-x-4 w-full px-2 bg-white relative">
      <h1 className="text-[28px] waguri text-yellow-800 flex flex-col justify-center lg:w-[180px] truncate text-center">
        <div className="flex justify-start">
          <img
            src={logo}
            alt="카페콘닷컴"
            className="h-[28px] w-auto block lg:w-[32px] lg:mr-2"
          />
          <span className="text-xl lg:text-[28px] flex flex-col justify-center">
            카페콘닷컴
          </span>
        </div>
      </h1>
      <div className="lg:flex flex-col justify-center w-full lg:w-[500px] hidden">
        <div
          className="h-[48px] w-full border-2 border-yellow-800 flex justify-start pl-4 rounded-full gap-x-0 divide-x overflow-hidden"
          onClick={() => props.setUserInfoOn(false)}
        >
          <input
            type="text"
            className="w-[76%] lg:w-[90%] bg-transparent"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.currentTarget.value)}
            onBlur={e => setSearchKeyword(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="w-[24%] lg:w-[10%] h-full relative hover:bg-gray-100"
            onClick={() => {
              props.searchIt(searchKeyword);
            }}
          >
            <CiSearch
              size={32}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="h-[48px] w-[48px] rounded-full">
          <button
            className="h-full w-full hover:bg-gray-100 relative"
            onClick={() => {
              props.setUserInfoOn(!props.userInfoOn);
            }}
          >
            <PiUser
              size={32}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </button>
        </div>
      </div>
      {props.userInfoOn && (
        <div className="absolute w-fit p-4 top-[56px] lg:top-[96px] right-2 border bg-white text-center z-10">
          {props.user.accessToken ? (
            <div className="grid grid-cols-1">
              <div className="text-left">
                안녕하세요 {props.user.userId}님{" "}
                <button
                  className="p-2 bg-green-500 text-white"
                  onClick={() => logout()}
                >
                  로그아웃
                </button>
              </div>
              <div className="text-left">
                <span className="text-rose-500">{props.user.point}</span>P
                보유중
              </div>
            </div>
          ) : (
            <>
              <span
                className="hover:cursor-pointer border-b border-black"
                onClick={() => {
                  props.setLoginModal(true);
                  props.setUserInfoOn(false);
                }}
              >
                로그인
              </span>{" "}
              해주세요
            </>
          )}
        </div>
      )}
      {props.loginModal && <Login setModalOn={props.setLoginModal} />}
    </header>
  );
}

export default Header;

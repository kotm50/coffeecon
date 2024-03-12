import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";

import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import GoodsList from "./Goods/GoodsList";

function Main() {
  const navi = useNavigate();
  const thisLocation = useLocation();
  const user = useSelector(state => state.user);

  const [modalNum, setModalNum] = useState(null);
  const [loginModal, setLoginModal] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [userInfoOn, setUserInfoOn] = useState(false);

  useEffect(() => {
    if (thisLocation.pathname === "/") {
      navi("/list");
    }
    //eslint-disable-next-line
  }, [thisLocation]);

  useEffect(() => {
    if (modalNum) {
      setModalOn(true);
    } else {
      setModalOn(false);
    }
  }, [modalNum]);
  useEffect(() => {
    if (loginModal) {
      setModalOn(true);
    } else {
      setModalOn(false);
    }
  }, [loginModal]);

  const searchIt = k => {
    if (k) {
      navi(`/list?keyword=${k}`);
    } else {
      navi(`/list`);
    }
  };
  return (
    <div
      className={`w-full max-w-[1024px] lg:p-[12px] mx-auto bg-yellow-800 lg:bg-gray-100 ${
        modalOn ? "h-screen overflow-hidden" : ""
      }`}
    >
      <Header
        user={user}
        searchIt={searchIt}
        loginModal={loginModal}
        setLoginModal={setLoginModal}
        userInfoOn={userInfoOn}
        setUserInfoOn={setUserInfoOn}
      />
      <GoodsList
        user={user}
        searchIt={searchIt}
        modalNum={modalNum}
        setModalNum={setModalNum}
        setUserInfoOn={setUserInfoOn}
      />
    </div>
  );
}

export default Main;

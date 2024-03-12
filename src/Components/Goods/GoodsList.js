import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getNewToken } from "../../Reducer/userSlice";

import queryString from "query-string";
import axios from "axios";
import Pagenate from "../Layout/Pagenate";

import DesktopList from "./DesktopList";
import MobileList from "./MobileList";
import { CiSearch } from "react-icons/ci";

function GoodsList(props) {
  const dispatch = useDispatch();
  const thisLocation = useLocation();
  const pathName = thisLocation.pathname;
  const parsed = queryString.parse(thisLocation.search);
  const page = parsed.page || 1;
  const keyword = parsed.keyword || "";
  const [goodsList, setGoodsList] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [pagenate, setPagenate] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent;
    // 모바일 디바이스 유저 에이전트 패턴
    const mobilePattern =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const mobile = mobilePattern.test(userAgent);
    setIsMobile(mobile);
    console.log(keyword);
    // 이 부분은 useEffect 내에서 상태 변경을 수행하는 부분입니다.
    const fetchData = async () => {
      if (keyword === "") {
        await getGoodsList(page, mobile);
      } else {
        await searching(page, keyword, mobile);
      }
    };

    fetchData(); // fetchData를 호출하여 데이터를 가져옵니다.

    //eslint-disable-next-line
  }, [thisLocation, keyword, page]);

  const getGoodsList = async (p, m) => {
    setGoodsList([]);
    const data = {
      page: p,
      size: m ? 10 : 20,
    };

    await axios
      .get("/api/v1/shop/goods/list/1", {
        params: data,
      })
      .then(async res => {
        if (res.headers.authorization) {
          await dispatch(
            getNewToken({
              accessToken: res.headers.authorization,
            })
          );
        }
        const totalP = res.data.totalPages;
        setTotalPage(res.data.totalPages);
        const pagenate = generatePaginationArray(p, totalP);
        setPagenate(pagenate);

        setGoodsList(res.data.goodsList);
      })
      .catch(e => {
        console.log(e);
        setGoodsList([]);
      });
  };

  const searching = async (p, k, m) => {
    setSearchKeyword(k);
  };

  function generatePaginationArray(currentPage, totalPage) {
    let paginationArray = [];

    // 최대 페이지가 4 이하인 경우
    if (Number(totalPage) <= 4) {
      for (let i = 1; i <= totalPage; i++) {
        paginationArray.push(i);
      }
      return paginationArray;
    }

    // 현재 페이지가 1 ~ 3인 경우
    if (Number(currentPage) <= 3) {
      return [1, 2, 3, 4, 5];
    }

    // 현재 페이지가 totalPage ~ totalPage - 2인 경우
    if (Number(currentPage) >= Number(totalPage) - 2) {
      return [
        Number(totalPage) - 4,
        Number(totalPage) - 3,
        Number(totalPage) - 2,
        Number(totalPage) - 1,
        Number(totalPage),
      ];
    }

    // 그 외의 경우
    return [
      Number(currentPage) - 2,
      Number(currentPage) - 1,
      Number(currentPage),
      Number(currentPage) + 1,
      Number(currentPage) + 2,
    ];
  }

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      props.searchIt(event.currentTarget.value);
    }
  };

  return (
    <>
      {isMobile && (
        <div
          className="w-full h-[160px] relative lg:hidden"
          onClick={() => props.setUserInfoOn(false)}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center w-[80%]">
            <div className="mb-1">원하는 상품을 찾아보세요</div>
            <div className="h-[48px] w-full border-2 border-yellow-800 flex justify-start  rounded-full gap-x-0 divide-x overflow-hidden drop-shadow-lg">
              <input
                type="text"
                className="w-[90%] bg-white pl-4 text-black"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.currentTarget.value)}
                onBlur={e => setSearchKeyword(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="w-[24%] lg:w-[10%] h-full relative bg-rose-200 text-black"
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
        </div>
      )}
      {goodsList.length > 0 ? (
        <div
          className={`bg-gray-100 ${isMobile && "rounded-t-xl pt-10"}`}
          onClick={() => props.setUserInfoOn(false)}
        >
          {isMobile ? (
            <MobileList
              goodsList={goodsList}
              user={props.user}
              modalNum={props.modalNum}
              setModalNum={props.setModalNum}
            />
          ) : (
            <DesktopList
              goodsList={goodsList}
              user={props.user}
              modalNum={props.modalNum}
              setModalNum={props.setModalNum}
            />
          )}
        </div>
      ) : null}
      <div className="bg-gray-100 py-10">
        <Pagenate
          pagenate={pagenate}
          page={Number(page)}
          totalPage={Number(totalPage)}
          pathName={pathName}
          keyword={keyword}
        />
      </div>
    </>
  );
}

export default GoodsList;

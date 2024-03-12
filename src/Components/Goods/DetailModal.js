import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { buyGift, clearUser, getNewToken } from "../../Reducer/userSlice";

function DetailModal(props) {
  const dispatch = useDispatch();
  const [goods, setGoods] = useState(null);
  const [phoneNum, setPhoneNum] = useState("");
  const [memo, setMemo] = useState("");

  useEffect(() => {
    if (props.modalNum) {
      getGoods(props.modalNum);
    } else {
      setGoods(null);
    }
    //eslint-disable-next-line
  }, [props.modalNum]);

  const getGoods = async num => {
    await axios
      .get(`/api/v1/shop/goods/detail/${num}`)
      .then(async res => {
        console.log(res);
        if (res.headers.authorization) {
          await dispatch(
            getNewToken({
              accessToken: res.headers.authorization,
            })
          );
        }
        setGoods(res.data.goods);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const logout = () => {
    dispatch(clearUser());
  };
  const sendIt = async () => {
    const result = await test();
    if (result !== "완료") {
      alert(result);
      return false;
    }
    const data = {
      phoneNo: phoneNum,
      memo: memo,
      goodsCode: props.modalNum,
    };

    await axios
      .post("/api/v1/cafecon/goods/send", data, {
        headers: { Authorization: props.user.accessToken },
      })
      .then(async res => {
        console.log(res);
        if (res.headers.authorization) {
          await dispatch(
            getNewToken({
              accessToken: res.headers.authorization,
            })
          );
        }
        if (res.data.code === "E999") {
          alert(res.data.message);
          logout();
          return false;
        }
        if (res.data.code === "C000") {
          dispatch(
            buyGift({
              point: res.data.point,
            })
          );
        } else {
          alert(res.data.message);
          return false;
        }
      })
      .catch(e => {
        console.log(e);
      });

    console.log(data);
  };

  const test = () => {
    if (phoneNum === "" || isNaN(phoneNum)) {
      return "연락처를 숫자만 입력해 주세요";
    }
    return "완료";
  };

  return (
    <>
      <div className="fixed w-[95%] h-fit max-h-[720px] max-w-[640px] text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white rounded-xl z-20">
        <button
          className="w-full p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded"
          onClick={() => {
            props.setModalNum(null);
          }}
        >
          창 닫기
        </button>

        {goods ? (
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2">
            <div>
              <img
                src={goods.goodsImgB}
                alt={goods.goodsName}
                className="w-full max-w-[240px] h-auto lg:max-w-full mx-auto"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-y-3">
                <div className="font-neoextra text-left text-xl col-span-2">
                  {goods.goodsName}
                </div>
                <div className="font-neoextra text-left">{goods.brandName}</div>
                <p className="text-right">
                  <span className="text-rose-500 font-neoheavy">
                    {Number(goods.realPrice).toLocaleString()}
                  </span>
                  P 차감
                </p>
              </div>
              <hr className="my-5" />
              <div className="flex flex-col justify-end gap-y-4">
                <div className="flex flex-col justify-start gap-y-1 text-left">
                  <label htmlFor="phone" className="text-sm font-neobold">
                    휴대폰번호
                  </label>
                  <input
                    id="phone"
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="번호를 - 없이 숫자만 입력"
                    value={phoneNum}
                    onChange={e => setPhoneNum(e.currentTarget.value)}
                  />
                </div>
                <div className="flex flex-col justify-start gap-y-2 text-left">
                  <label htmlFor="memo" className="text-sm font-neobold">
                    메모
                  </label>
                  <input
                    id="memo"
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="고객명, 지역 등 간단한 메모"
                    value={memo}
                    onChange={e => setMemo(e.currentTarget.value)}
                  />
                </div>
                <button
                  className="w-full bg-green-500 hover:bg-green-700 text-white p-2 rounded"
                  onClick={() => sendIt()}
                >
                  발송하기
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4">상품을 불러오는 중 입니다</div>
        )}
      </div>

      <div
        className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black bg-opacity-50 z-0"
        onClick={() => {
          props.setModalNum(null);
        }}
      ></div>
    </>
  );
}

export default DetailModal;

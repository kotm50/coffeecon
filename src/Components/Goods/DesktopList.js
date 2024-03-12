import React, { useState } from "react";
import ImgLoad from "../Layout/ImgLoad";
import DetailModal from "./DetailModal";

function DesktopList(props) {
  const [hoveredItem, setHoveredItem] = useState(null); // 현재 호버된 아이템의 식별자를 저장

  return (
    <div className="grid grid-cols-4 gap-x-3 gap-y-3 lg:gap-x-5 my-5">
      {props.goodsList.map((goods, idx) => (
        <div
          key={idx}
          className="p-4 hover:bg-indigo-100 min-h-0 h-fit hover:cursor-pointer rounded-3xl"
          onMouseEnter={() => setHoveredItem(idx)} // 마우스가 div 위로 올라가면 isHover를 true로 설정
          onMouseLeave={() => setHoveredItem(null)} // 마우스가 div를 벗어나면 isHover를 false로 설정
          onClick={() => {
            props.setModalNum(goods.goodsCode);
          }}
        >
          <div className="p-2 rounded">
            <div className="w-32 h-32 lg:w-60 lg:h-60 mx-auto rounded-3xl overflow-hidden max-w-full bg-white drop-shadow hover:drop-shadow-xl relative">
              <ImgLoad good={goods} />
              {hoveredItem === idx && (
                <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full z-10 bg-black bg-opacity-60">
                  <div className="absolute w-full text-center top-1/2 left-0 right-0 -translate-y-1/2 text-white">
                    발송하려면 클릭하세요
                  </div>
                </div>
              )}
            </div>
            <div className="w-60 mx-auto grid grid-cols-5 pt-1 border-t border-gray-100 max-w-full mt-3 px-2">
              <div className="col-span-3 flex flex-col justify-center">
                <p className="text-sm keep-all overflow-hidden text-ellipsis whitespace-nowrap text-left">
                  {goods.goodsName}
                </p>
                <p className="text-xs overflow-hidden text-ellipsis whitespace-nowrap text-left font-neobold text-stone-500">
                  {goods.brandName}
                </p>
              </div>
              <div className="col-span-2 flex flex-col justify-center">
                <p className="text-right">
                  <span className="text-rose-500 font-neoextra">
                    {Number(goods.realPrice).toLocaleString()}
                  </span>
                  P
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      {props.modalNum ? (
        <DetailModal
          user={props.user}
          modalNum={props.modalNum}
          setModalNum={props.setModalNum}
        />
      ) : null}
    </div>
  );
}

export default DesktopList;

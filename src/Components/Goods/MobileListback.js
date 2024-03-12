import ImgLoad from "../Layout/ImgLoad";
import DetailModal from "./DetailModal";

function MobileList(props) {
  return (
    <div className="grid grid-cols-2 gap-x-2 lg:gap-x-5">
      {props.goodsList.map((goods, idx) => (
        <div
          key={idx}
          className="pb-0 min-h-0 h-fit"
          onClick={() => {
            props.setModalNum(goods.goodsCode);
          }}
        >
          <div className="group p-2 rounded">
            <div className="w-32 h-32 lg:w-60 lg:h-60 mx-auto rounded overflow-hidden max-w-full bg-white drop-shadow hover:drop-shadow-xl">
              <ImgLoad good={goods} />
            </div>
            <div className="w-32 lg:w-60 mx-auto grid grid-cols-1 pt-1 border-t border-gray-100 max-w-full mt-3">
              <p className="lg:text-base group-hover:font-neobold keep-all overflow-hidden text-ellipsis whitespace-nowrap text-left font-neobold text-blue-500">
                {goods.brandName}
              </p>
              <p className="lg:text-lg group-hover:font-neobold keep-all overflow-hidden text-ellipsis whitespace-nowrap text-left">
                {goods.goodsName}
              </p>
              <p className="lg:text-lg text-left mt-3">
                <span className="text-xl text-rose-500">
                  {Number(goods.realPrice).toLocaleString()}
                </span>
                P
              </p>
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

export default MobileList;

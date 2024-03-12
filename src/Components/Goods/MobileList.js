import ImgLoad from "../Layout/ImgLoad";
import DetailModal from "./DetailModal";

function MobileList(props) {
  return (
    <div className="grid grid-cols-1 gap-y-4 px-4">
      {props.goodsList.map((goods, idx) => (
        <div
          key={idx}
          className="pb-0 min-h-0 h-fit"
          onClick={() => {
            props.setModalNum(goods.goodsCode);
          }}
        >
          <div className="group py-2 px-4 rounded-xl bg-white drop-shadow-lg flex flex-row justify-start gap-x-2">
            <div className="w-[72px] h-[72px] mx-auto rounded overflow-hidden max-w-full">
              <ImgLoad good={goods} />
            </div>
            <div className="flex-1 grid grid-cols-1 h-[72px] p-1">
              <p className="text-xs keep-all overflow-hidden text-ellipsis whitespace-nowrap text-left font-neobold text-blue-500">
                {goods.brandName}
              </p>
              <p className="text-sm keep-all overflow-hidden text-ellipsis whitespace-nowrap text-left">
                {goods.goodsName}
              </p>
              <div className="flex flex-col justify-center text-sm">
                <p className="text-left">
                  <span className="text-rose-500 font-neoextra">
                    {Number(goods.realPrice).toLocaleString()}
                  </span>
                  P 차감
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

export default MobileList;

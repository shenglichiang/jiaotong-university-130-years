import { setdataStatistics, upadteNewsClick } from "@/services";
import { IAddClickParams, IStatisticsParams, TItemType } from "@/services/data";
import { DEVICE_ID } from "./constants";
import { history } from "umi";
import { generalURLPrefix } from "./constants";
const addClickFun = (id: string, itemType: TItemType) => {
  const tempParams: IAddClickParams = {
    itemType,
    itemId: id,
  };
  upadteNewsClick(tempParams);
};

export const setdataStatisticsFun = (id: string, type: any) => {
  // const tempStamp = localStorage.getItem(`visited-${type}-${id}`);
  // if (tempStamp) {
  //   if (dayjs().isBefore(tempStamp)) {
  //     return;
  //   }
  // }
  // localStorage.setItem(
  //   `visited-${type}-${id}`,
  //   `${dayjs().add(2, 'hour').toString()}`,
  // );
  // if (type == 1 || type == 2) {
  addClickFun(id, type);
  // }
  const tempParams: IStatisticsParams = {
    itemType: type,
    itemId: id,
    deviceId: getLocalDeviceId(),
    terminalType: 3,
    watchSecond: 0,
    videoLength: 0,
  };
  setdataStatistics(tempParams);
};

export const filterKeyword = (p: string, keyword: string) => {
  const tempP = p.replaceAll(
    keyword?.replace(/\s+/g, ""),
    `<span class="keywordSpan">${keyword}</span>`
  );
  return tempP;
};

export const setMeta = (metaContent: string) => {
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    // 设置新的 description 值
    descriptionMeta.setAttribute("content", metaContent);
  }
  const keywordsMeta = document.querySelector('meta[name="keywords"]');
  if (keywordsMeta) {
    // 设置新的 description 值
    keywordsMeta.setAttribute("content", metaContent);
  }
};

export const getLocalDeviceId = () => {
  const _localId = localStorage.getItem(DEVICE_ID);
  if (_localId) {
    return _localId;
  } else {
    const tempId = Math.floor(Math.random() * Math.pow(10, 16)).toString();
    localStorage.setItem(DEVICE_ID, tempId);
    return tempId;
  }
};

export const routeToNewsDetail = (item: any) => {
  if (item?.newsType == 6) {
    window.open(item?.newsUrl);
    return;
  }

  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  history.push(
    `${generalURLPrefix}/news/detail/${
      item?.refInfoId || item?.refNewsId || item?.newsId
    }`
  );
};

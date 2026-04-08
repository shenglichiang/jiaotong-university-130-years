import { staticMediaPrefixUrl, staticPrefixUrl } from "@/utils/constants";

export const processMediaHttpUrl = (url: string) => {
  let tempUrl =
    url?.indexOf("http") == -1 ? `${staticMediaPrefixUrl}${url}` : `${url}`;
  if (tempUrl == staticMediaPrefixUrl) {
    tempUrl = "";
  }
  return tempUrl;
};

const processHttpUrl = (url: string) => {
  let tempUrl =
    url?.indexOf("http") == -1 ? `${staticPrefixUrl}${url}` : `${url}`;
  if (tempUrl == staticPrefixUrl) {
    tempUrl = "";
  }
  console.log(tempUrl);
  return tempUrl;
};
export default processHttpUrl;

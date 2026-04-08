import { defineConfig } from "umi";

export default defineConfig({
  routes: [{ path: "/", component: "index" }],
  npmClient: "yarn",
  history: {
    type: "hash",
  },
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  base: "/scgchc_activity/scgc_jiaotong130/",
  hash: true,
});

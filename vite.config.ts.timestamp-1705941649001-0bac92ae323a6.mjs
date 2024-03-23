// vite.config.ts
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as process from "node:process";
import { loadEnv } from "file:///F:/program/qinggu/qinggu-generator-web-frontend/node_modules/.pnpm/vite@5.0.10_@types+node@20.10.6_less@4.2.0/node_modules/vite/dist/node/index.js";

// plugins/index.ts
import vue from "file:///F:/program/qinggu/qinggu-generator-web-frontend/node_modules/.pnpm/@vitejs+plugin-vue@5.0.2_vite@5.0.10_vue@3.4.3/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///F:/program/qinggu/qinggu-generator-web-frontend/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.0.10_vue@3.4.3/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import AutoImport from "file:///F:/program/qinggu/qinggu-generator-web-frontend/node_modules/.pnpm/unplugin-auto-import@0.16.7_@vueuse+core@10.7.1/node_modules/unplugin-auto-import/dist/vite.js";
import GenerateConfig from "file:///F:/program/qinggu/qinggu-generator-web-frontend/node_modules/.pnpm/unplugin-config@0.1.4_esbuild@0.19.11_vite@5.0.10/node_modules/unplugin-config/dist/vite.js";
import Components from "file:///F:/program/qinggu/qinggu-generator-web-frontend/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.4.3/node_modules/unplugin-vue-components/dist/vite.mjs";
import VitePluginPreloadAll from "file:///F:/program/qinggu/qinggu-generator-web-frontend/node_modules/.pnpm/@mistjs+vite-plugin-preload@0.0.1_vite@5.0.10/node_modules/@mistjs/vite-plugin-preload/dist/index.mjs";
import Unocss from "file:///F:/program/qinggu/qinggu-generator-web-frontend/node_modules/.pnpm/unocss@0.57.7_postcss@8.4.32_vite@5.0.10/node_modules/unocss/dist/vite.mjs";
import AntdvResolver from "file:///F:/program/qinggu/qinggu-generator-web-frontend/node_modules/.pnpm/antdv-components-resolver@1.0.7_unplugin-vue-components@0.25.2/node_modules/antdv-components-resolver/dist/index.mjs";

// plugins/constants.ts
var GLOB_CONFIG_FILE_NAME = "_app.config.js";
var OUTPUT_DIR = "dist";

// plugins/vite-build-info.ts
import { readdir, stat } from "node:fs";
import dayjs from "file:///F:/program/qinggu/qinggu-generator-web-frontend/node_modules/.pnpm/registry.npmmirror.com+dayjs@1.11.10/node_modules/dayjs/dayjs.min.js";
import duration from "file:///F:/program/qinggu/qinggu-generator-web-frontend/node_modules/.pnpm/registry.npmmirror.com+dayjs@1.11.10/node_modules/dayjs/plugin/duration.js";
import pkg from "file:///F:/program/qinggu/qinggu-generator-web-frontend/node_modules/.pnpm/picocolors@1.0.0/node_modules/picocolors/picocolors.js";
var { green, blue, bold } = pkg;
dayjs.extend(duration);
var fileListTotal = [];
function recursiveDirectory(folder, callback) {
  readdir(folder, (err, files) => {
    if (err)
      throw err;
    let count = 0;
    const checkEnd = () => {
      ++count === files.length && callback();
    };
    files.forEach((item) => {
      stat(`${folder}/${item}`, async (err2, stats) => {
        if (err2)
          throw err2;
        if (stats.isFile()) {
          fileListTotal.push(stats.size);
          checkEnd();
        } else if (stats.isDirectory()) {
          recursiveDirectory(`${folder}/${item}/`, checkEnd);
        }
      });
    });
    files.length === 0 && callback();
  });
}
function sum(arr) {
  return arr.reduce((t, c) => {
    return t + c;
  }, 0);
}
function formatBytes(a, b) {
  if (a === 0)
    return "0 Bytes";
  const c = 1024;
  const d = b || 2;
  const e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const f = Math.floor(Math.log(a) / Math.log(c));
  return `${Number.parseFloat((a / c ** f).toFixed(d))} ${e[f]}`;
}
function viteBuildInfo(name) {
  let config;
  let startTime;
  let endTime;
  return {
    name: "vite:buildInfo",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    buildStart() {
      console.log(
        bold(
          green(
            `\u{1F44F}\u6B22\u8FCE\u4F7F\u7528${blue(`[${name}]`)}\uFF0C\u73B0\u5728\u6B63\u5168\u529B\u4E3A\u60A8${config.command === "build" ? "\u6253\u5305" : "\u7F16\u8BD1"}`
          )
        )
      );
      if (config.command === "build")
        startTime = dayjs(/* @__PURE__ */ new Date());
    },
    closeBundle() {
      if (config.command === "build") {
        endTime = dayjs(/* @__PURE__ */ new Date());
        recursiveDirectory(config.build.outDir, () => {
          console.log(
            bold(
              green(
                `\u606D\u559C\u6253\u5305\u5B8C\u6210\u{1F389}\uFF08\u603B\u7528\u65F6${dayjs.duration(endTime.diff(startTime)).format("mm\u5206ss\u79D2")}\uFF0C\u6253\u5305\u540E\u7684\u5927\u5C0F\u4E3A${formatBytes(
                  sum(fileListTotal)
                )}\uFF09`
              )
            )
          );
        });
      }
    }
  };
}

// plugins/index.ts
function createVitePlugins(env) {
  const vitePluginList = [
    vue(),
    vueJsx(),
    VitePluginPreloadAll(),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vue-i18n",
        "@vueuse/core",
        "pinia"
      ],
      dts: "types/auto-imports.d.ts",
      dirs: ["src/stores", "src/composables"]
    }),
    Components({
      resolvers: [AntdvResolver()],
      dts: "types/components.d.ts",
      dirs: ["src/components"]
    }),
    // https://github.com/kirklin/unplugin-config
    GenerateConfig({
      appName: env.VITE_GLOB_APP_TITLE,
      configFile: {
        generate: true,
        fileName: GLOB_CONFIG_FILE_NAME,
        outputDir: OUTPUT_DIR
      },
      envVariables: {
        prefix: "VITE_GLOB_"
      }
    }),
    Unocss(),
    viteBuildInfo(env.VITE_APP_NAME)
  ];
  return vitePluginList;
}

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///F:/program/qinggu/qinggu-generator-web-frontend/vite.config.ts";
var baseSrc = fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url));
var vite_config_default = ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const proxyObj = {};
  if (mode === "development" && env.VITE_APP_BASE_API_DEV && env.VITE_APP_BASE_URL_DEV) {
    proxyObj[env.VITE_APP_BASE_API_DEV] = {
      target: env.VITE_APP_BASE_URL_DEV,
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API_DEV}`), "")
    };
  }
  return {
    plugins: createVitePlugins(env),
    resolve: {
      alias: [
        {
          find: "dayjs",
          replacement: "dayjs/esm"
        },
        {
          find: /^dayjs\/locale/,
          replacement: "dayjs/esm/locale"
        },
        {
          find: /^dayjs\/plugin/,
          replacement: "dayjs/esm/plugin"
        },
        {
          find: "vue-i18n",
          replacement: mode === "development" ? "vue-i18n/dist/vue-i18n.esm-browser.js" : "vue-i18n/dist/vue-i18n.esm-bundler.js"
        },
        {
          find: /^ant-design-vue\/es$/,
          replacement: "ant-design-vue/es"
        },
        {
          find: /^ant-design-vue\/dist$/,
          replacement: "ant-design-vue/dist"
        },
        {
          find: /^ant-design-vue\/lib$/,
          replacement: "ant-design-vue/es"
        },
        {
          find: /^ant-design-vue$/,
          replacement: "ant-design-vue/es"
        },
        {
          find: "lodash",
          replacement: "lodash-es"
        },
        {
          find: "~@",
          replacement: baseSrc
        },
        {
          find: "~",
          replacement: baseSrc
        },
        {
          find: "@",
          replacement: baseSrc
        },
        {
          find: "~#",
          replacement: resolve(baseSrc, "./enums")
        },
        {
          find: "@request",
          replacement: resolve(baseSrc, "../http/request.ts")
        }
      ]
    },
    build: {
      chunkSizeWarningLimit: 4096,
      outDir: OUTPUT_DIR,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ["vue", "vue-router", "pinia", "vue-i18n", "@vueuse/core"],
            antd: ["ant-design-vue", "@ant-design/icons-vue", "dayjs"]
            // lodash: ['loadsh-es'],
          }
        }
      }
    },
    server: {
      port: 8001,
      host: "0.0.0.0",
      proxy: {
        ...proxyObj
        // [env.VITE_APP_BASE_API]: {
        //   target: env.VITE_APP_BASE_URL,
        // //   如果你是https接口，需要配置这个参数
        // //   secure: false,
        //   changeOrigin: true,
        //   rewrite: path => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''),
        // },
      }
    },
    test: {
      globals: true,
      environment: "jsdom"
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGx1Z2lucy9pbmRleC50cyIsICJwbHVnaW5zL2NvbnN0YW50cy50cyIsICJwbHVnaW5zL3ZpdGUtYnVpbGQtaW5mby50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXHByb2dyYW1cXFxccWluZ2d1XFxcXHFpbmdndS1nZW5lcmF0b3Itd2ViLWZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxwcm9ncmFtXFxcXHFpbmdndVxcXFxxaW5nZ3UtZ2VuZXJhdG9yLXdlYi1mcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovcHJvZ3JhbS9xaW5nZ3UvcWluZ2d1LWdlbmVyYXRvci13ZWItZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCdcclxuaW1wb3J0ICogYXMgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXHJcbmltcG9ydCB7IGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdHlwZSB7IENvbmZpZ0VudiwgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IGNyZWF0ZVZpdGVQbHVnaW5zIH0gZnJvbSAnLi9wbHVnaW5zJ1xyXG5pbXBvcnQgeyBPVVRQVVRfRElSIH0gZnJvbSAnLi9wbHVnaW5zL2NvbnN0YW50cydcclxuXHJcbmNvbnN0IGJhc2VTcmMgPSBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgKHsgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnID0+IHtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpXHJcbiAgY29uc3QgcHJveHlPYmogPSB7fVxyXG4gIGlmIChtb2RlID09PSAnZGV2ZWxvcG1lbnQnICYmIGVudi5WSVRFX0FQUF9CQVNFX0FQSV9ERVYgJiYgZW52LlZJVEVfQVBQX0JBU0VfVVJMX0RFVikge1xyXG4gICAgcHJveHlPYmpbZW52LlZJVEVfQVBQX0JBU0VfQVBJX0RFVl0gPSB7XHJcbiAgICAgIHRhcmdldDogZW52LlZJVEVfQVBQX0JBU0VfVVJMX0RFVixcclxuICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtlbnYuVklURV9BUFBfQkFTRV9BUElfREVWfWApLCAnJyksXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2lucyhlbnYpLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZpbmQ6ICdkYXlqcycsXHJcbiAgICAgICAgICByZXBsYWNlbWVudDogJ2RheWpzL2VzbScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAvXmRheWpzXFwvbG9jYWxlLyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiAnZGF5anMvZXNtL2xvY2FsZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAvXmRheWpzXFwvcGx1Z2luLyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiAnZGF5anMvZXNtL3BsdWdpbicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAndnVlLWkxOG4nLFxyXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IG1vZGUgPT09ICdkZXZlbG9wbWVudCcgPyAndnVlLWkxOG4vZGlzdC92dWUtaTE4bi5lc20tYnJvd3Nlci5qcycgOiAndnVlLWkxOG4vZGlzdC92dWUtaTE4bi5lc20tYnVuZGxlci5qcycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAvXmFudC1kZXNpZ24tdnVlXFwvZXMkLyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiAnYW50LWRlc2lnbi12dWUvZXMnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmluZDogL15hbnQtZGVzaWduLXZ1ZVxcL2Rpc3QkLyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiAnYW50LWRlc2lnbi12dWUvZGlzdCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAvXmFudC1kZXNpZ24tdnVlXFwvbGliJC8sXHJcbiAgICAgICAgICByZXBsYWNlbWVudDogJ2FudC1kZXNpZ24tdnVlL2VzJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZpbmQ6IC9eYW50LWRlc2lnbi12dWUkLyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiAnYW50LWRlc2lnbi12dWUvZXMnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmluZDogJ2xvZGFzaCcsXHJcbiAgICAgICAgICByZXBsYWNlbWVudDogJ2xvZGFzaC1lcycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAnfkAnLFxyXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IGJhc2VTcmMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAnficsXHJcbiAgICAgICAgICByZXBsYWNlbWVudDogYmFzZVNyYyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZpbmQ6ICdAJyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiBiYXNlU3JjLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmluZDogJ34jJyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiByZXNvbHZlKGJhc2VTcmMsICcuL2VudW1zJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAnQHJlcXVlc3QnLFxyXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHJlc29sdmUoYmFzZVNyYywgJy4uL2h0dHAvcmVxdWVzdC50cycpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA0MDk2LFxyXG4gICAgICBvdXREaXI6IE9VVFBVVF9ESVIsXHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgIG1hbnVhbENodW5rczoge1xyXG4gICAgICAgICAgICB2dWU6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAncGluaWEnLCAndnVlLWkxOG4nLCAnQHZ1ZXVzZS9jb3JlJ10sXHJcbiAgICAgICAgICAgIGFudGQ6IFsnYW50LWRlc2lnbi12dWUnLCAnQGFudC1kZXNpZ24vaWNvbnMtdnVlJywgJ2RheWpzJ10sXHJcbiAgICAgICAgICAgIC8vIGxvZGFzaDogWydsb2Fkc2gtZXMnXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgcG9ydDogODAwMSxcclxuICAgICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgIC4uLnByb3h5T2JqLFxyXG4gICAgICAgIC8vIFtlbnYuVklURV9BUFBfQkFTRV9BUEldOiB7XHJcbiAgICAgICAgLy8gICB0YXJnZXQ6IGVudi5WSVRFX0FQUF9CQVNFX1VSTCxcclxuICAgICAgICAvLyAvLyAgIFx1NTk4Mlx1Njc5Q1x1NEY2MFx1NjYyRmh0dHBzXHU2M0E1XHU1M0UzXHVGRjBDXHU5NzAwXHU4OTgxXHU5MTREXHU3RjZFXHU4RkQ5XHU0RTJBXHU1M0MyXHU2NTcwXHJcbiAgICAgICAgLy8gLy8gICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIC8vICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7ZW52LlZJVEVfQVBQX0JBU0VfQVBJfWApLCAnJyksXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB0ZXN0OiB7XHJcbiAgICAgIGdsb2JhbHM6IHRydWUsXHJcbiAgICAgIGVudmlyb25tZW50OiAnanNkb20nLFxyXG4gICAgfSxcclxuICB9XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxwcm9ncmFtXFxcXHFpbmdndVxcXFxxaW5nZ3UtZ2VuZXJhdG9yLXdlYi1mcm9udGVuZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxwcm9ncmFtXFxcXHFpbmdndVxcXFxxaW5nZ3UtZ2VuZXJhdG9yLXdlYi1mcm9udGVuZFxcXFxwbHVnaW5zXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9wcm9ncmFtL3FpbmdndS9xaW5nZ3UtZ2VuZXJhdG9yLXdlYi1mcm9udGVuZC9wbHVnaW5zL2luZGV4LnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgR2VuZXJhdGVDb25maWcgZnJvbSAndW5wbHVnaW4tY29uZmlnL3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCBWaXRlUGx1Z2luUHJlbG9hZEFsbCBmcm9tICdAbWlzdGpzL3ZpdGUtcGx1Z2luLXByZWxvYWQnXHJcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCBBbnRkdlJlc29sdmVyIGZyb20gJ2FudGR2LWNvbXBvbmVudC1yZXNvbHZlcidcclxuaW1wb3J0IHsgR0xPQl9DT05GSUdfRklMRV9OQU1FLCBPVVRQVVRfRElSIH0gZnJvbSAnLi9jb25zdGFudHMnXHJcbmltcG9ydCB7IHZpdGVCdWlsZEluZm8gfSBmcm9tICcuL3ZpdGUtYnVpbGQtaW5mbydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWaXRlUGx1Z2lucyhlbnY6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pIHtcclxuICBjb25zdCB2aXRlUGx1Z2luTGlzdDogKFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdKVtdID0gW1xyXG4gICAgdnVlKCksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIFZpdGVQbHVnaW5QcmVsb2FkQWxsKCksXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICd2dWUnLFxyXG4gICAgICAgICd2dWUtcm91dGVyJyxcclxuICAgICAgICAndnVlLWkxOG4nLFxyXG4gICAgICAgICdAdnVldXNlL2NvcmUnLFxyXG4gICAgICAgICdwaW5pYScsXHJcbiAgICAgIF0sXHJcbiAgICAgIGR0czogJ3R5cGVzL2F1dG8taW1wb3J0cy5kLnRzJyxcclxuICAgICAgZGlyczogWydzcmMvc3RvcmVzJywgJ3NyYy9jb21wb3NhYmxlcyddLFxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgcmVzb2x2ZXJzOiBbQW50ZHZSZXNvbHZlcigpXSxcclxuICAgICAgZHRzOiAndHlwZXMvY29tcG9uZW50cy5kLnRzJyxcclxuICAgICAgZGlyczogWydzcmMvY29tcG9uZW50cyddLFxyXG4gICAgfSksXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20va2lya2xpbi91bnBsdWdpbi1jb25maWdcclxuICAgIEdlbmVyYXRlQ29uZmlnKHtcclxuICAgICAgYXBwTmFtZTogZW52LlZJVEVfR0xPQl9BUFBfVElUTEUsXHJcbiAgICAgIGNvbmZpZ0ZpbGU6IHtcclxuICAgICAgICBnZW5lcmF0ZTogdHJ1ZSxcclxuICAgICAgICBmaWxlTmFtZTogR0xPQl9DT05GSUdfRklMRV9OQU1FLFxyXG4gICAgICAgIG91dHB1dERpcjogT1VUUFVUX0RJUixcclxuICAgICAgfSxcclxuICAgICAgZW52VmFyaWFibGVzOiB7XHJcbiAgICAgICAgcHJlZml4OiAnVklURV9HTE9CXycsXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICAgIFVub2NzcygpLFxyXG4gICAgdml0ZUJ1aWxkSW5mbyhlbnYuVklURV9BUFBfTkFNRSksXHJcbiAgXVxyXG4gIHJldHVybiB2aXRlUGx1Z2luTGlzdFxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxccHJvZ3JhbVxcXFxxaW5nZ3VcXFxccWluZ2d1LWdlbmVyYXRvci13ZWItZnJvbnRlbmRcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxccHJvZ3JhbVxcXFxxaW5nZ3VcXFxccWluZ2d1LWdlbmVyYXRvci13ZWItZnJvbnRlbmRcXFxccGx1Z2luc1xcXFxjb25zdGFudHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L3Byb2dyYW0vcWluZ2d1L3FpbmdndS1nZW5lcmF0b3Itd2ViLWZyb250ZW5kL3BsdWdpbnMvY29uc3RhbnRzLnRzXCI7Ly8gVGhpcyBjb25zdGFudCBkZWZpbmVzIHRoZSBuYW1lIG9mIHRoZSBjb25maWd1cmF0aW9uIGZpbGUgdGhhdCB3aWxsIGJlIHVzZWQgaW4gdGhlIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRcclxuZXhwb3J0IGNvbnN0IEdMT0JfQ09ORklHX0ZJTEVfTkFNRSA9ICdfYXBwLmNvbmZpZy5qcydcclxuXHJcbi8vIFRoaXMgY29uc3RhbnQgc2V0cyB0aGUgb3V0cHV0IGRpcmVjdG9yeSBmb3IgdGhlIFZpdGUgcGFja2FnZVxyXG5leHBvcnQgY29uc3QgT1VUUFVUX0RJUiA9ICdkaXN0J1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXHByb2dyYW1cXFxccWluZ2d1XFxcXHFpbmdndS1nZW5lcmF0b3Itd2ViLWZyb250ZW5kXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXHByb2dyYW1cXFxccWluZ2d1XFxcXHFpbmdndS1nZW5lcmF0b3Itd2ViLWZyb250ZW5kXFxcXHBsdWdpbnNcXFxcdml0ZS1idWlsZC1pbmZvLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9wcm9ncmFtL3FpbmdndS9xaW5nZ3UtZ2VuZXJhdG9yLXdlYi1mcm9udGVuZC9wbHVnaW5zL3ZpdGUtYnVpbGQtaW5mby50c1wiO2ltcG9ydCB7IHJlYWRkaXIsIHN0YXQgfSBmcm9tICdub2RlOmZzJ1xyXG5pbXBvcnQgdHlwZSB7IFBsdWdpbiwgUmVzb2x2ZWRDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnXHJcbmltcG9ydCB0eXBlIHsgRGF5anMgfSBmcm9tICdkYXlqcydcclxuaW1wb3J0IGR1cmF0aW9uIGZyb20gJ2RheWpzL3BsdWdpbi9kdXJhdGlvbidcclxuaW1wb3J0IHBrZyBmcm9tICdwaWNvY29sb3JzJ1xyXG5cclxuY29uc3QgeyBncmVlbiwgYmx1ZSwgYm9sZCB9ID0gcGtnXHJcbmRheWpzLmV4dGVuZChkdXJhdGlvbilcclxuXHJcbmNvbnN0IGZpbGVMaXN0VG90YWw6IG51bWJlcltdID0gW11cclxuXHJcbmZ1bmN0aW9uIHJlY3Vyc2l2ZURpcmVjdG9yeShmb2xkZXI6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgcmVhZGRpcihmb2xkZXIsIChlcnIsIGZpbGVzOiBzdHJpbmdbXSkgPT4ge1xyXG4gICAgaWYgKGVycilcclxuICAgICAgdGhyb3cgZXJyXHJcbiAgICBsZXQgY291bnQgPSAwXHJcbiAgICBjb25zdCBjaGVja0VuZCA9ICgpID0+IHtcclxuICAgICAgKytjb3VudCA9PT0gZmlsZXMubGVuZ3RoICYmIGNhbGxiYWNrKClcclxuICAgIH1cclxuICAgIGZpbGVzLmZvckVhY2goKGl0ZW06IHN0cmluZykgPT4ge1xyXG4gICAgICBzdGF0KGAke2ZvbGRlcn0vJHtpdGVtfWAsIGFzeW5jIChlcnIsIHN0YXRzKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgIHRocm93IGVyclxyXG4gICAgICAgIGlmIChzdGF0cy5pc0ZpbGUoKSkge1xyXG4gICAgICAgICAgZmlsZUxpc3RUb3RhbC5wdXNoKHN0YXRzLnNpemUpXHJcbiAgICAgICAgICBjaGVja0VuZCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHN0YXRzLmlzRGlyZWN0b3J5KCkpIHtcclxuICAgICAgICAgIHJlY3Vyc2l2ZURpcmVjdG9yeShgJHtmb2xkZXJ9LyR7aXRlbX0vYCwgY2hlY2tFbmQpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICAgIGZpbGVzLmxlbmd0aCA9PT0gMCAmJiBjYWxsYmFjaygpXHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc3VtKGFycjogbnVtYmVyW10pIHtcclxuICByZXR1cm4gYXJyLnJlZHVjZSgodDogbnVtYmVyLCBjOiBudW1iZXIpID0+IHtcclxuICAgIHJldHVybiB0ICsgY1xyXG4gIH0sIDApXHJcbn1cclxuZnVuY3Rpb24gZm9ybWF0Qnl0ZXMoYTogbnVtYmVyLCBiPzogbnVtYmVyKTogc3RyaW5nIHtcclxuICBpZiAoYSA9PT0gMClcclxuICAgIHJldHVybiAnMCBCeXRlcydcclxuICBjb25zdCBjID0gMTAyNFxyXG4gIGNvbnN0IGQgPSBiIHx8IDJcclxuICBjb25zdCBlID0gWydCeXRlcycsICdLQicsICdNQicsICdHQicsICdUQicsICdQQicsICdFQicsICdaQicsICdZQiddXHJcbiAgY29uc3QgZiA9IE1hdGguZmxvb3IoTWF0aC5sb2coYSkgLyBNYXRoLmxvZyhjKSlcclxuICByZXR1cm4gYCR7TnVtYmVyLnBhcnNlRmxvYXQoKGEgLyBjICoqIGYpLnRvRml4ZWQoZCkpfSAke2VbZl19YFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdml0ZUJ1aWxkSW5mbyhuYW1lOiBzdHJpbmcpOiBQbHVnaW4ge1xyXG4gIGxldCBjb25maWc6IFJlc29sdmVkQ29uZmlnXHJcbiAgbGV0IHN0YXJ0VGltZTogRGF5anNcclxuICBsZXQgZW5kVGltZTogRGF5anNcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ3ZpdGU6YnVpbGRJbmZvJyxcclxuICAgIGNvbmZpZ1Jlc29sdmVkKHJlc29sdmVkQ29uZmlnKSB7XHJcbiAgICAgIGNvbmZpZyA9IHJlc29sdmVkQ29uZmlnXHJcbiAgICB9LFxyXG4gICAgYnVpbGRTdGFydCgpIHtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgYm9sZChcclxuICAgICAgICAgIGdyZWVuKFxyXG4gICAgICAgICAgICBgXHVEODNEXHVEQzRGXHU2QjIyXHU4RkNFXHU0RjdGXHU3NTI4JHtibHVlKGBbJHtuYW1lfV1gKX1cdUZGMENcdTczQjBcdTU3MjhcdTZCNjNcdTUxNjhcdTUyOUJcdTRFM0FcdTYwQTgke2NvbmZpZy5jb21tYW5kID09PSAnYnVpbGQnID8gJ1x1NjI1M1x1NTMwNScgOiAnXHU3RjE2XHU4QkQxJ1xyXG4gICAgICAgICAgICB9YCxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgKSxcclxuICAgICAgKVxyXG4gICAgICBpZiAoY29uZmlnLmNvbW1hbmQgPT09ICdidWlsZCcpXHJcbiAgICAgICAgc3RhcnRUaW1lID0gZGF5anMobmV3IERhdGUoKSlcclxuICAgIH0sXHJcbiAgICBjbG9zZUJ1bmRsZSgpIHtcclxuICAgICAgaWYgKGNvbmZpZy5jb21tYW5kID09PSAnYnVpbGQnKSB7XHJcbiAgICAgICAgZW5kVGltZSA9IGRheWpzKG5ldyBEYXRlKCkpXHJcbiAgICAgICAgcmVjdXJzaXZlRGlyZWN0b3J5KGNvbmZpZy5idWlsZC5vdXREaXIsICgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICBib2xkKFxyXG4gICAgICAgICAgICAgIGdyZWVuKFxyXG4gICAgICAgICAgICAgICAgYFx1NjA2RFx1NTU5Q1x1NjI1M1x1NTMwNVx1NUI4Q1x1NjIxMFx1RDgzQ1x1REY4OVx1RkYwOFx1NjAzQlx1NzUyOFx1NjVGNiR7ZGF5anNcclxuICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKGVuZFRpbWUuZGlmZihzdGFydFRpbWUpKVxyXG4gICAgICAgICAgICAgICAgICAuZm9ybWF0KCdtbVx1NTIwNnNzXHU3OUQyJyl9XHVGRjBDXHU2MjUzXHU1MzA1XHU1NDBFXHU3Njg0XHU1OTI3XHU1QzBGXHU0RTNBJHtmb3JtYXRCeXRlcyhcclxuICAgICAgICAgICAgICAgICAgICBzdW0oZmlsZUxpc3RUb3RhbCksXHJcbiAgICAgICAgICAgICAgICAgICl9XHVGRjA5YCxcclxuICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLGVBQWU7QUFDeEIsU0FBUyxxQkFBcUI7QUFDOUIsWUFBWSxhQUFhO0FBQ3pCLFNBQVMsZUFBZTs7O0FDSHhCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxvQkFBb0I7QUFDM0IsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTywwQkFBMEI7QUFDakMsT0FBTyxZQUFZO0FBQ25CLE9BQU8sbUJBQW1COzs7QUNQbkIsSUFBTSx3QkFBd0I7QUFHOUIsSUFBTSxhQUFhOzs7QUNKK1UsU0FBUyxTQUFTLFlBQVk7QUFFdlksT0FBTyxXQUFXO0FBRWxCLE9BQU8sY0FBYztBQUNyQixPQUFPLFNBQVM7QUFFaEIsSUFBTSxFQUFFLE9BQU8sTUFBTSxLQUFLLElBQUk7QUFDOUIsTUFBTSxPQUFPLFFBQVE7QUFFckIsSUFBTSxnQkFBMEIsQ0FBQztBQUVqQyxTQUFTLG1CQUFtQixRQUFnQixVQUEwQjtBQUNwRSxVQUFRLFFBQVEsQ0FBQyxLQUFLLFVBQW9CO0FBQ3hDLFFBQUk7QUFDRixZQUFNO0FBQ1IsUUFBSSxRQUFRO0FBQ1osVUFBTSxXQUFXLE1BQU07QUFDckIsUUFBRSxVQUFVLE1BQU0sVUFBVSxTQUFTO0FBQUEsSUFDdkM7QUFDQSxVQUFNLFFBQVEsQ0FBQyxTQUFpQjtBQUM5QixXQUFLLEdBQUcsTUFBTSxJQUFJLElBQUksSUFBSSxPQUFPQSxNQUFLLFVBQVU7QUFDOUMsWUFBSUE7QUFDRixnQkFBTUE7QUFDUixZQUFJLE1BQU0sT0FBTyxHQUFHO0FBQ2xCLHdCQUFjLEtBQUssTUFBTSxJQUFJO0FBQzdCLG1CQUFTO0FBQUEsUUFDWCxXQUNTLE1BQU0sWUFBWSxHQUFHO0FBQzVCLDZCQUFt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

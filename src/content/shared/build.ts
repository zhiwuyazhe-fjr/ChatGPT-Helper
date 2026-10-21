declare const __HELPER_BUILD_ID__: string;
declare const __HELPER_VERSION__: string;
export const BUILD_ID =
  typeof __HELPER_BUILD_ID__ === "string" ? __HELPER_BUILD_ID__ : "development";
export const VERSION =
  typeof __HELPER_VERSION__ === "string" ? __HELPER_VERSION__ : "development";
export const EXPORT_PROTOCOL = 1;

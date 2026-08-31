const CONFIG = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  APP_TITLE: import.meta.env.VITE_APP_TITLE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
};

export default CONFIG;

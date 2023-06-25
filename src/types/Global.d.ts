declare module '*.module.css';
declare module '*.module.scss';

/// <reference types="react-scripts" />

//override
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly REACT_APP_SITE_URL: string;
    readonly REACT_APP_SERVER_URL: string;
    readonly REACT_APP_KAKAO_JAVASCRIPT_KEY: string;
    readonly REACT_APP_GOOGLE_API_KEY: string;
    readonly REACT_APP_BUSINESS_NUMBER_API_KEY: string;
    readonly REACT_APP_IAMPORT_IMP_CODE: string;
  }
}

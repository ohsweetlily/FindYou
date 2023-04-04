import { css, Global } from "@emotion/react";
import reset from "emotion-reset";
export const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        ${reset}

        @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard-dynamic-subset.css");
        @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap");

        *,
        *::after,
        *::before {
          box-sizing: border-box;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
          font-family: pretendard, "Noto Sans KR", sans-serif !important;
        }

        body {
          overflow-x: hidden;
        }

        input:focus,
        select:focus,
        option:focus,
        textarea:focus,
        button:focus {
          outline: none;
        }

        a {
          text-decoration: none;
          &:focus,
          &:hover,
          &:visited,
          &:link,
          &:active {
            text-decoration: none;
          }
        }
      `}
    />
  );
};

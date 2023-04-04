export const colors = {
  gray1: "#212428",
  gray1WithOpacity20: "#212428B3",
  gray2: "#62676c",
  gray3: "#8b8d90",
  gray4: "#b1b3b6",
  gray5: "#e2e2e2",
  gray6: "#efefef",
  gray7: "#f9f9f9",
  white: "#ffffff",
  primary1: "#fdf301",
  primary1WithOpacity20: "#fdf30120",
  primary2: "#ede300",
  primary3: "#5b5800",
  systemError: "#e45c49",
  systemSuccess: "#74d900",
};

export type ButtonTheme =
  | "primary-gray1-theme"
  | "gray1-white-theme"
  | "inactive-theme"
  | "gray6-gray1-theme";

export function getColorsOf(buttonTheme: ButtonTheme): {
  color: string;
  backgroundColor: string;
  borderColor: string | null;
} {
  switch (buttonTheme) {
    case "primary-gray1-theme":
      return {
        color: colors.gray1,
        backgroundColor: colors.primary1,
        borderColor: colors.primary2,
      };
    case "gray1-white-theme":
      return {
        color: colors.white,
        backgroundColor: colors.gray1,
        borderColor: null,
      };
    case "inactive-theme":
      return {
        color: colors.gray4,
        backgroundColor: colors.gray7,
        borderColor: null,
      };
    case "gray6-gray1-theme":
      return {
        color: colors.gray1,
        backgroundColor: colors.gray6,
        borderColor: colors.gray5,
      };
  }
  throw new Error(`at @/styles/colors.ts -> 존재하지 않는 buttonTheme 입력됨 -> "${buttonTheme}".
    유효한 themes: [primary-gray1-theme, gray1-white-theme, gray6-gray1-theme, inactive-theme]`);
}

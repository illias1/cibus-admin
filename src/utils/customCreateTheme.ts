import { Theme, createMuiTheme } from "@material-ui/core";
import { Typography } from "@material-ui/core/styles/createTypography";
import { theme } from "./theme";

type Modify<T, R> = Omit<T, keyof R> & R;

export type CustomTypography = Modify<
  Typography,
  {
    secondaryFontFamily: string;
  }
>;

export type CustomTheme = Modify<
  Theme,
  {
    typography: CustomTypography;
  }
>;

export const createMyTheme = (): CustomTheme => {
  return {
    ...theme,
    typography: {
      ...theme.typography,
      secondaryFontFamily: "Muli",
    },
  };
};

export const augmentedTheme = createMyTheme();

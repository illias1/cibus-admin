import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import { Palette } from "@material-ui/core/styles/createPalette";
import { TypographyStyleOptions } from "@material-ui/core/styles/createTypography";
import { Typography } from "@material-ui/core/styles/createTypography";
export const theme = createMuiTheme(
  /* src/ui/theme/theme.json */

  {
    shape: { borderRadius: 20 },
    props: {},
    spacing: 8,
    typography: {
      fontFamily: "Josefin Sans",

      h1 : {
        fontFamily: "Josefin Sans",
        fontWeight: "bolder",
        fontSize: "43px",
        lineHeight: "43px",
      },
      h2 : {
        fontFamily: "Josefin Sans",
        fontWeight: "bold",
        fontSize: "29px",
        lineHeight: "29px",
      },
      h3 : {
        fontFamily: "Josefin Sans",
        fontWeight: "lighter",
        fontSize: "25px",
        lineHeight: "25px",
      },
      h4 : {
        fontFamily: "Josefin Sans",
        fontWeight: "normal",
        fontSize: "20",
        lineHeight: "20px",
      },  
      body1 : {
        fontFamily: "Josefin Sans",
        fontWeight: 300,
        fontSize: "23px",
        lineHeight: "23px",
      },
      body2 : {
        fontFamily: "Josefin Sans",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "16px",
      },
      button : {
        fontFamily: "Josefin Sans",
        fontWeight: "normal",
        fontSize: "20px",
        lineHeight: "20px",
      },
      caption : {
        fontFamily: "Josefin Sans",
        fontWeight: "normal",
        fontSize: "15px",
        lineHeight: "15px",
      },
      overline : {
        fontFamily: "Josefin Sans",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "12px",
      },
    },
    palette: {
      // tonalOffset: 0.2,
      // contrastThreshold: 3,
      // grey: {
      //   "50": "#fafafa",
      //   "100": "#f5f5f5",
      //   "200": "#eeeeee",
      //   "300": "#e0e0e0",
      //   "400": "#bdbdbd",
      //   "500": "#9e9e9e",
      //   "600": "#757575",
      //   "700": "#616161",
      //   "800": "#424242",
      //   "900": "#212121",
      //   A700: "#616161",
      //   A100: "#d5d5d5",
      //   A400: "#303030",
      //   A200: "#aaaaaa",
      // },
      text: {
        primary: "#fff",
        secondary: "#fff",
        disabled: "#A6BCD0",
        hint: "#748A9D",
      },
      background: {
        paper: "#747474",
        default: "#0A0918",
      },
      divider: "rgba(0, 0, 0, 0.12)",
      secondary: {
        main: "#585CFF",
        light: "rgb(121, 124, 255)",
        dark: "rgb(61, 64, 178)",
        contrastText: "#fff",
      },
      common: { black: "#000", white: "#fff" },
      error: {
        light: "#e57373",
        main: "#f44336",
        dark: "#d32f2f",
        contrastText: "#fff",
      },
      type: "dark",
      action: {
        hoverOpacity: 0.08,
        hover: "rgba(0, 0, 0, 0.08)",
        selected: "rgba(0, 0, 0, 0.14)",
        disabledBackground: "rgba(0, 0, 0, 0.12)",
        disabled: "#6F8395",
        active: "rgba(0, 0, 0, 0.54)",
      },
      primary: {
        main: "#FFCC00",
        light: "rgb(255, 214, 51)",
        dark: "rgb(178, 142, 0)",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
    },
  }
);

type Modify<T, R> = Omit<T, keyof R> & R;

export type CustomTypography = Modify<
  Typography,
  {
    secondaryFontFamily: string;
    smallButton: TypographyStyleOptions;
    logInTittle: TypographyStyleOptions;
    homeTittle: TypographyStyleOptions;
  }
>;
export type CustomPalette = Modify<
  Palette,
  {
    primaryBlack: string;
  }
>;

export type CustomTheme = Modify<
  Theme,
  {
    typography: CustomTypography;
    palette: CustomPalette;
  }
>;

export const createMyTheme = (): CustomTheme => {
  return {
    ...theme,
    typography: {
      ...theme.typography,
      secondaryFontFamily: "Muli",
      
      smallButton : {
        fontFamily: "Josefin Sans",
        fontWeight: "normal",
        fontSize: "15px",
        lineHeight: "15px",
      },
      logInTittle : {
        fontFamily: "Josefin Sans",
        fontWeight: "bold",
        fontSize: "137px",
        lineHeight: "137px",
      },
      homeTittle : {
        fontFamily: "Josefin Sans",
        fontWeight: "bold",
        fontSize: "80px",
        lineHeight: "80px",
      },

    },
    palette: {
      ...theme.palette,
      primaryBlack: "#191A39",
    },
  };
};

export const augmentedTheme = createMyTheme();

export const customStyles = {
  customizedTextFieldPaper: {
    "& div": {
      background: "#EFF4F8",
      color: augmentedTheme.palette.primaryBlack,
      borderRadius: 8,
    },
    "& label": {
      color: augmentedTheme.palette.primaryBlack,
    },
    "& label.MuiInputLabel-shrink": {
      color: augmentedTheme.palette.primaryBlack,
      padding: "3px 5px",
      background: "#EFF4F8",
      borderRadius: 8,
    },
  },
  customizedTextFieldMainBack: {
    "& div": {
      background: "#F0F4F8",
      color: augmentedTheme.palette.primaryBlack,
      borderRadius: 8,
    },
    "& label": {
      color: augmentedTheme.palette.text.disabled,
    },
    "& label.MuiInputLabel-shrink": {
      color: augmentedTheme.palette.text.disabled,
      padding: "3px 5px",
      background: "#F0F4F8",
      borderRadius: 8,
    },
  },
};

export const customWithStyles = withStyles(customStyles);

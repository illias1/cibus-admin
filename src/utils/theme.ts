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

declare module "@material-ui/core/styles/createPalette" {
  interface PaletteOptions {
    primaryBlack?: string;
  }
  interface Palette {
    primaryBlack: string;
  }
}
declare module "@material-ui/core/styles/createTypography" {
  interface TypographyOptions {
    secondaryFontFamily?: string;
    hugest?: TypographyStyleOptions;
  }
  interface Typography {
    secondaryFontFamily: string;
    smallButton: TypographyStyleOptions;
    hugest: TypographyStyleOptions;
    homeTitle: TypographyStyleOptions;
  }
}

export const theme = createMuiTheme({
  shape: { borderRadius: 20 },
  props: {},
  spacing: 8,
  typography: {
    fontFamily: "Josefin Sans",
    secondaryFontFamily: "Muli",
    h1: {
      fontFamily: "Josefin Sans",
      fontWeight: "bolder",
      fontSize: "43px",
      lineHeight: "43px",
    },
    h2: {
      fontFamily: "Josefin Sans",
      fontWeight: "bold",
      fontSize: "29px",
      lineHeight: "29px",
    },
    h3: {
      fontFamily: "Josefin Sans",
      fontWeight: "lighter",
      fontSize: "25px",
      lineHeight: "25px",
    },
    h4: {
      fontFamily: "Josefin Sans",
      fontWeight: "normal",
      fontSize: "20px",
      lineHeight: "20px",
    },
    body1: {
      fontFamily: "Josefin Sans",
      fontWeight: 300,
      fontSize: "23px",
      lineHeight: "23px",
    },
    body2: {
      fontFamily: "Josefin Sans",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "16px",
    },
    button: {
      fontFamily: "Josefin Sans",
      fontWeight: "normal",
      fontSize: "20px",
      lineHeight: "20px",
    },
    caption: {
      fontFamily: "Josefin Sans",
      fontWeight: "normal",
      fontSize: "15px",
      lineHeight: "15px",
    },
    overline: {
      fontFamily: "Josefin Sans",
      fontWeight: "normal",
      fontSize: "12px",
      lineHeight: "12px",
    },
    subtitle2: {
      fontFamily: "Josefin Sans",
      fontWeight: "normal",
      fontSize: "15px",
      lineHeight: "15px",
    },
    hugest: {
      fontFamily: "Josefin Sans",
      fontWeight: "bold",
      fontSize: "137px",
      lineHeight: "137px",
    },
    subtitle1: {
      fontFamily: "Josefin Sans",
      fontWeight: "bold",
      fontSize: "80px",
      lineHeight: "80px",
    },
  },
  palette: {
    primaryBlack: "#161636",
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
});

export const customStyles = {
  customizedTextFieldPaper: {
    "& div": {
      background: "#EFF4F8",
      color: theme.palette.primaryBlack,
      borderRadius: 8,
      fontSize: 16,
    },
    "& label": {
      color: theme.palette.primaryBlack,
      fontSize: 16,
    },
    "& label.MuiInputLabel-shrink": {
      color: theme.palette.primaryBlack,
      fontSize: 16,
      padding: "3px 5px",
      background: "#EFF4F8",
      borderRadius: 8,
    },
  },
  customizedTextFieldMainBack: {
    "& div": {
      background: "#F0F4F8",
      color: theme.palette.primaryBlack,
      borderRadius: 8,
    },
    "& label": {
      color: theme.palette.text.disabled,
    },
    "& label.MuiInputLabel-shrink": {
      color: theme.palette.text.disabled,
      padding: "3px 5px",
      background: "#F0F4F8",
      borderRadius: 8,
    },
  },
};

export const customWithStyles = withStyles(customStyles);

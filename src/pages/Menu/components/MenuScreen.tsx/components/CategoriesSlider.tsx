import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Scrollspy from "react-scrollspy";

type ICategoriesSliderProps = {
  categories: string[];
};

const CategoriesSlider: React.FC<ICategoriesSliderProps> = ({ categories }) => {
  const classes = useStyles();
  const theme = useTheme();
  React.useEffect(() => {
    window.document.documentElement.style.setProperty(
      "--color-text",
      theme.palette.primary.contrastText
    );
    window.document.documentElement.style.setProperty(
      "--color-background",
      theme.palette.action.selected
    );
  }, [theme.palette.primary.contrastText, theme.palette.primary.main]);

  return (
    <Box className={classes.root}>
      <Scrollspy
        items={categories.map((cat) => `category-${cat}`)}
        currentClassName="activeCategoryClass"
        componentTag="div"
        offset={100}
      >
        {categories.map((cat, i) => (
          <a key={i} className={classes.chip} href={`#category-${cat}`}>
            {cat}
          </a>
        ))}
      </Scrollspy>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      whiteSpace: "nowrap",
      overflow: "auto",
      boxShadow: "0px 5px 30px #0000000D",
      padding: theme.spacing(3),
      borderBottomRightRadius: theme.spacing(6),
      borderBottomLeftRadius: theme.spacing(6),
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.background.paper,
    },
    chip: {
      marginRight: theme.spacing(3),
      color: theme.palette.text.disabled,
      fontSize: theme.typography.h6.fontSize,
    },
  })
);

export default CategoriesSlider;

import React from "react";
import Box from "@material-ui/core/Box";
import MenuItem from "./MenuItem";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { useTypedSelector } from "../../../store/types";
import { TNonNullMenuItem } from "../../../types";
import CategpriesChoices from "./CategpriesChoices";
type ICategoryListItemProps = {
  setopenDrawer: React.Dispatch<
    React.SetStateAction<{ open: boolean; item: TNonNullMenuItem | null }>
  >;
};

const CategoryListItem: React.FC<ICategoryListItemProps> = ({ setopenDrawer }) => {
  const theme = useTheme();
  const desktopTrue = useMediaQuery(theme.breakpoints.up("md"));
  const tabletTrue = useMediaQuery(theme.breakpoints.up("sm"));
  const { categorizedItems } = useTypedSelector((state) => state.menu);
  const [categories, setcategories] = React.useState<string[]>([]);
  const [activeCategory, setactiveCategory] = React.useState<string>(categories[0]);
  React.useEffect(() => {
    setcategories(Object.keys(categorizedItems));
  }, [categorizedItems]);

  return (
    <Box style={{ width: desktopTrue ? 700 : tabletTrue ? 400 : "90%" }}>
      <CategpriesChoices
        categories={categories}
        active={activeCategory}
        setactiveCategory={setactiveCategory}
      />
      {/* <Typography
              gutterBottom={true}
              // className={classes.title}
              variant="h4"
            >
              {category}
            </Typography> */}
      {/* { title, price, ingredients, allergy, img, cal, notes } */}
      {categorizedItems[activeCategory] &&
        Object.entries(categorizedItems[activeCategory]).map(([id, item]) => (
          <React.Fragment key={id}>
            {item ? <MenuItem setopenDrawer={setopenDrawer} item={item} /> : null}
          </React.Fragment>
        ))}
    </Box>
  );
};

export default CategoryListItem;

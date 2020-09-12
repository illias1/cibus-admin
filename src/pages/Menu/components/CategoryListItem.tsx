import React from "react";
import Box from "@material-ui/core/Box";
import { TcategorizedMenuItems } from "./utils";
import Typography from "@material-ui/core/Typography";
import MenuItem from "./MenuItem";
import { VariableSizeList } from "react-window";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { useTypedSelector } from "../../../store/types";
import { TNonNullMenuItem } from "../../../types";

type ICategoryListItemProps = {
  setopenDrawer: React.Dispatch<
    React.SetStateAction<{ open: boolean; item: TNonNullMenuItem | null; resetListIndex: number }>
  >;
  resetListIndex: number;
};
const listRef = React.createRef<VariableSizeList>();

const CategoryListItem: React.FC<ICategoryListItemProps> = ({ setopenDrawer, resetListIndex }) => {
  const theme = useTheme();
  const desktopTrue = useMediaQuery(theme.breakpoints.up("md"));
  const tabletTrue = useMediaQuery(theme.breakpoints.up("sm"));
  const { categorizedItems, categoriesNumber } = useTypedSelector((state) => state.menu);

  React.useEffect(() => {
    listRef.current?.resetAfterIndex(resetListIndex);
  }, [resetListIndex]);
  const getItemSize = (index: number) => {
    console.log(
      "Object.keys(Object.entries(categorizedItems)[index][1]).length * 110 + 90",
      "index",
      index,
      "values",
      Object.keys(Object.entries(categorizedItems)[index][1]).length * 110 + 90
    );
    return Object.keys(Object.entries(categorizedItems)[index][1]).length * 110 + 90;
  };

  return (
    <VariableSizeList
      itemData={Object.entries(categorizedItems)}
      height={1000}
      itemCount={categoriesNumber}
      ref={listRef}
      itemSize={getItemSize}
      width={400}
      style={{ width: desktopTrue ? 700 : tabletTrue ? 400 : "90%" }}
    >
      {({ style, index, data }) => {
        const [category, items] = data[index] as [string, TcategorizedMenuItems[string]];

        return (
          <Box style={style} key={category}>
            <Typography
              gutterBottom={true}
              id={`category-${category}`}
              // className={classes.title}
              variant="h4"
            >
              {category}
            </Typography>
            {/* { title, price, ingredients, allergy, img, cal, notes } */}
            {Object.entries(items).map(([id, item]) => (
              <React.Fragment key={id}>
                {item ? <MenuItem setopenDrawer={setopenDrawer} item={item} /> : null}
              </React.Fragment>
            ))}
          </Box>
        );
      }}
    </VariableSizeList>
  );
};

export default React.memo(CategoryListItem);

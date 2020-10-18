import React from "react";
import Box from "@material-ui/core/Box";
import MenuItem from "./MenuItem";
import {
  Button,
  ClickAwayListener,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useTypedSelector } from "../../../store/types";
import CategpriesChoices from "./CategpriesChoices";
import { TDrawerState } from "../Menu";
import HelpIcon from "@material-ui/icons/Help";

type ICategoryListItemProps = {
  setopenDrawer: React.Dispatch<React.SetStateAction<TDrawerState>>;
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
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <Box style={{ width: desktopTrue ? 700 : tabletTrue ? 400 : "90%" }}>
      <CategpriesChoices
        categories={categories}
        active={activeCategory}
        setactiveCategory={setactiveCategory}
      />
      <Box className={classes.manageComp}>
        <Button
          variant="outlined"
          onClick={() => setopenDrawer({ open: true, item: null, manageComponents: true })}
        >
          Manage componenets
        </Button>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <>
                <Typography>
                  Your menu items include options or a choice customers have to make? For example,
                  whiskey can be ordered in cup or with Cola, pizza can have optional extra toppings
                  and a mandatory choice of size.
                </Typography>
                <br />
                <Typography>
                  All of these additional choices can be attached to your menu items as
                  "Components", and therefore reused on multiple ones.
                </Typography>
                <br />
                <Typography>
                  In the previous example of pizzas, you would make a component of "Size choice"
                  with all of the possible sizes (applicable to multiple pizzas). Once it's ready,
                  you only need to edit the pizzas by "attaching this component". If you need to
                  change the size in the future - you only change it once in the component!
                </Typography>
              </>
            }
          >
            <IconButton onClick={handleTooltipOpen} color="inherit">
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </ClickAwayListener>
      </Box>
      {categorizedItems[activeCategory] &&
      Object.entries(categorizedItems[activeCategory]).length > 0 ? (
        Object.entries(categorizedItems[activeCategory]).map(([id, item]) => (
          <React.Fragment key={id}>
            {item ? <MenuItem setopenDrawer={setopenDrawer} item={item} /> : null}
          </React.Fragment>
        ))
      ) : activeCategory ? (
        <Typography>This category will automatically be deleted</Typography>
      ) : (
        <> </>
      )}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    manageComp: {
      marginBottom: theme.spacing(3),
    },
  })
);

export default CategoryListItem;

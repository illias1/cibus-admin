import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Language } from "../../../API";
import AddMenuItemForm from "./CreateMenuItemForm";
import Box from "@material-ui/core/Box";
import MenuLanguageManage from "./MenuLanguagesManage";
import { useTypedSelector } from "../../../store/types";
import { TNonNullMenuItem } from "../../../types";

type ICreateMenuItemFormWithlangsProps = {
  setopenDrawer: React.Dispatch<
    React.SetStateAction<{ open: boolean; item: TNonNullMenuItem | null }>
  >;
  openDrawer: { open: boolean; item: TNonNullMenuItem | null };
};

const CreateMenuItemFormWithlangs: React.FC<ICreateMenuItemFormWithlangsProps> = ({
  setopenDrawer,
  openDrawer,
}) => {
  const classes = useStyles();
  const { languages } = useTypedSelector((state) => state.menu);
  const [langs, setlangs] = React.useState<Language[]>([]);
  React.useEffect(() => {
    setlangs(languages);
  }, []);
  return (
    <Box className={classes.root}>
      <MenuLanguageManage langs={langs} setlangs={setlangs} />
      <AddMenuItemForm openDrawer={openDrawer} setopenDrawer={setopenDrawer} languages={langs} />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

export default React.memo(CreateMenuItemFormWithlangs);

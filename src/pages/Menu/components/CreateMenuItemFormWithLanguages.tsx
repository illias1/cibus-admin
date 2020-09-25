import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  CreateMenuItemMutation,
  CreateMenuItemMutationVariables,
  DeleteMenuItemMutation,
  DeleteMenuItemMutationVariables,
  Language,
  UpdateMenuItemMutation,
} from "../../../API";
import AddMenuItemForm, { Inputs } from "./CreateMenuItemForm";
import Box from "@material-ui/core/Box";
import MenuLanguageManage from "./MenuLanguagesManage";
import { useTypedSelector } from "../../../store/types";
import { TAppSyncError, TNonNullMenuItem } from "../../../types";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { deleteMenuItem, updateMenuItem, createMenuItem } from "../../../graphql/mutations";
import { setDeleteMenuItem, setAddNewMenuItem, setUpdateMenuItem } from "../../../store/actions";
import { mutation } from "../../../utils/mutation";
import { UNCATEGORIZED } from "../../../utils/_constants";
import { prepareInputsForUpdateMutation, prepareInputsForCreateMutation } from "./utils";
import { Storage } from "aws-amplify";
import { v4 as uuid } from "uuid";

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
  const dispatch = useDispatch();
  const { languages, menuComponents } = useTypedSelector((state) => state.menu);
  const { name, currency } = useTypedSelector((state) => state.selectedProperty);
  const [langs, setlangs] = React.useState<Language[]>([]);
  React.useEffect(() => {
    if (item) {
      const itemLangs = item.i18n.map((trnasl) => trnasl.language);
      setlangs(itemLangs);
    } else {
      setlangs(languages);
    }
  }, []);

  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [creating, setcreating] = React.useState<boolean>(false);
  const [showComponents, setshowComponents] = React.useState<boolean>(false);
  const [deleteOn, setdeleteOn] = React.useState<boolean>(false);
  const [errorMessage, seterrorMessage] = React.useState<string>("");
  const [photo, setphoto] = React.useState<{
    selected: boolean;
    image: File | null | undefined;
  }>({
    selected: false,
    image: null,
  });
  const { item } = openDrawer;

  const handleDelete = async (id: string, category: string) => {
    if (deleteOn) {
      const { error, data } = await mutation<
        DeleteMenuItemMutation,
        DeleteMenuItemMutationVariables
      >(deleteMenuItem, {
        input: {
          id,
        },
      });
      if (error) {
        console.log("dlete unsuccessful");
      }
      if (data) {
        dispatch(
          setDeleteMenuItem({
            category: item!.i18n[0].category || UNCATEGORIZED,
            id: item!.id,
          })
        );
        setopenDrawer({
          open: false,
          item: null,
        });
      }
    } else {
      setdeleteOn(true);
    }
  };
  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    let imageKey = { key: item?.image || "" };
    if (photo.selected) {
      try {
        imageKey = (await Storage.put(`${name}/${uuid()}`, photo.image)) as { key: string };
      } catch (error) {
        seterrorMessage("error uploading image");
        return;
      }
    }
    const inputsMadeReadyForSubmission = item
      ? prepareInputsForUpdateMutation(
          inputs,
          item.id,
          menuComponents,
          imageKey ? imageKey.key : ""
        )
      : prepareInputsForCreateMutation(inputs, name, menuComponents, imageKey ? imageKey.key : "");
    setcreating(true);
    const { data, error } = await mutation<CreateMenuItemMutation, CreateMenuItemMutationVariables>(
      item ? updateMenuItem : createMenuItem,
      {
        input: inputsMadeReadyForSubmission as CreateMenuItemMutationVariables["input"],
      }
    );
    setcreating(false);
    if (error) {
      console.warn(JSON.stringify(error));
      if (error) {
        seterrorMessage((error as TAppSyncError).errors[0].message);
      }
    } else {
      reset();
      const result = item
        ? ((data as unknown) as UpdateMenuItemMutation).updateMenuItem
        : data?.createMenuItem;
      if (item === null && result) {
        dispatch(setAddNewMenuItem(result));
        setopenDrawer({
          open: false,
          item: null,
        });
      }
      if (item !== null && result) {
        dispatch(
          setUpdateMenuItem({
            data: result,
            previousItemData: {
              category: item.i18n[0].category || UNCATEGORIZED,
              id: item.id,
            },
          })
        );
        setopenDrawer({
          open: false,
          item: null,
        });
      }
    }
  };

  return (
    <Box className={classes.root}>
      <MenuLanguageManage langs={langs} setlangs={setlangs} />
      <AddMenuItemForm
        errorMessage={errorMessage}
        register={register}
        deleteOn={deleteOn}
        onSubmit={onSubmit}
        currency={currency}
        setphoto={setphoto}
        item={item}
        creating={creating}
        setdeleteOn={setdeleteOn}
        setshowComponents={setshowComponents}
        showComponents={showComponents}
        menuComponents={menuComponents}
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
        setopenDrawer={setopenDrawer}
        languages={langs}
      />
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

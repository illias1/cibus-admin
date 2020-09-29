import React, { ChangeEvent } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { FormControl, InputLabel, Select, MenuItem, Typography } from "@material-ui/core";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { TPropertyCreateInputs, TuniquenessChecked } from "../PropertyCreate";
import { Currency } from "../../../API";
import { useTranslation } from "react-i18next";

type ICreatePropertyUiProps = {
  handleUniquenessAndCorrectnessCheck: () => Promise<void>;
  uniquenessChecked: TuniquenessChecked;
  handleInput: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  urlName: string;
  onSubmit: SubmitHandler<TPropertyCreateInputs>;
  error: string;
};

const CreatePropertyUi: React.FC<ICreatePropertyUiProps> = ({
  handleUniquenessAndCorrectnessCheck,
  uniquenessChecked,
  handleInput,
  urlName,
  onSubmit,
  error,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { register, handleSubmit, control } = useForm<TPropertyCreateInputs>();

  return (
    <Box className={classes.root} style={{ marginTop: 50 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUniquenessAndCorrectnessCheck();
        }}
      >
        <TextField
          error={uniquenessChecked.alreadyChecked && !uniquenessChecked.unique}
          onChange={handleInput}
          name="name"
          label={t("create_property_label_unique_name_url")}
          helperText={
            uniquenessChecked.alreadyChecked && !uniquenessChecked.unique
              ? t("create_property_helper_unique_name_url_error")
              : t("create_property_helper_unique_name_url")
          }
          value={urlName}
          variant="outlined"
        />
        <Button type="submit" variant="contained">
          {t("create_property_button_check_name_url_availability")}
        </Button>
      </form>

      <Typography color="error">{error}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="NonUniqueName"
          label={t("create_property_label_non_unique_name")}
          helperText={t("create_property_helper_non_unique_name")}
          variant="outlined"
          required={true}
          inputRef={register({ required: true })}
          disabled={!uniquenessChecked.unique}
        />
        <FormControl
          variant="outlined"
          required
          className={classes.formControl}
          disabled={!uniquenessChecked.unique}
        >
          <InputLabel id="currency-input-label">{t("currency")}</InputLabel>
          <Controller
            // @ts-ignore
            name="currency"
            control={control}
            rules={{ required: true }}
            defaultValue={Currency.KRW}
            as={
              <Select label={t("currency")} labelId="currency-input-label">
                {Object.keys(Currency).map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            }
          />
        </FormControl>
        <Typography>Address</Typography>
        <TextField
          name="address.country"
          required
          inputRef={register({ required: true })}
          variant="outlined"
          disabled={!uniquenessChecked.unique}
          label={t("create_property_label_address_country")}
        />
        <TextField
          name="address.city"
          required
          inputRef={register({ required: true })}
          variant="outlined"
          disabled={!uniquenessChecked.unique}
          label={t("create_property_label_address_city")}
        />
        <TextField
          name="address.exact"
          required
          inputRef={register({ required: true })}
          variant="outlined"
          disabled={!uniquenessChecked.unique}
          label={t("create_property_label_address_exact")}
        />

        <Button disabled={!uniquenessChecked.unique} variant="contained" type="submit">
          {t("create_property_register_button")}
        </Button>
      </form>
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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

export default CreatePropertyUi;

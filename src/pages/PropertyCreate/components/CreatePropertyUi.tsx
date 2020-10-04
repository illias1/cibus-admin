import React, { ChangeEvent } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  WithStyles,
} from "@material-ui/core";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { TPropertyCreateInputs, TuniquenessChecked } from "../PropertyCreate";
import { Currency } from "../../../API";
import { useTranslation } from "react-i18next";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import { customStyles, customWithStyles } from "../../../utils/theme";
import Title from "./Title";
import FormTitle from "./FormTitle";
import SmallActionButton from "./SmallActionButton";
import MainActionButton from "./MainActionButton";

interface ICreatePropertyUiProps extends WithStyles<typeof customStyles> {
  handleUniquenessAndCorrectnessCheck: () => Promise<void>;
  uniquenessChecked: TuniquenessChecked;
  handleInput: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  urlName: string;
  onSubmit: SubmitHandler<TPropertyCreateInputs>;
  error: string;
}

const CreatePropertyUi: React.FC<ICreatePropertyUiProps> = ({
  handleUniquenessAndCorrectnessCheck,
  uniquenessChecked,
  handleInput,
  urlName,
  onSubmit,
  error,
  classes,
}) => {
  const useClasses = useStyles();
  const { t } = useTranslation();
  const { register, handleSubmit, control } = useForm<TPropertyCreateInputs>();

  return (
    <>
      <Title
        subtitle={t("registerProperty.subtitles.create_new_property")}
        title={t("registerProperty.titles.create_new_property")}
      />
      <form className={useClasses.form} onSubmit={handleSubmit(onSubmit)}>
        <FormTitle title={t("registerProperty.form_titles.new_property")} />
        <TextField
          name="NonUniqueName"
          className={`${classes.customizedTextFieldMainBack} ${useClasses.customized}`}
          label={t("registerProperty.labels.property_name")}
          variant="outlined"
          required={true}
          inputRef={register({ required: true })}
        />
        <Box className={useClasses.hor}>
          <TextField
            className={`${classes.customizedTextFieldMainBack} ${useClasses.customized}`}
            InputProps={{
              startAdornment: (
                <InputAdornment disableTypography position="start">
                  https://menu.cibus.online/
                </InputAdornment>
              ),
            }}
            error={uniquenessChecked.alreadyChecked && !uniquenessChecked.unique}
            onChange={handleInput}
            name="name"
            label={t("registerProperty.labels.unique_url_name")}
            value={urlName}
            variant="outlined"
          />
          <SmallActionButton onClick={handleUniquenessAndCorrectnessCheck}>
            {t("registerProperty.actions.check_availability")}
          </SmallActionButton>
        </Box>

        <Typography color="error">{error}</Typography>
        {uniquenessChecked.alreadyChecked && !uniquenessChecked.unique && (
          <Typography color="error">{t("registerProperty.errors.url_taken")}</Typography>
        )}
        <FormControl
          variant="outlined"
          required
          className={`${classes.customizedTextFieldMainBack} ${useClasses.short}`}
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
        <Box>
          <TextField
            className={`${classes.customizedTextFieldMainBack} ${useClasses.short}`}
            name="address.country"
            required
            inputRef={register({ required: true })}
            variant="outlined"
            label={t("registerProperty.labels.address_country")}
          />
          <TextField
            className={`${classes.customizedTextFieldMainBack} ${useClasses.short}`}
            name="address.city"
            required
            inputRef={register({ required: true })}
            variant="outlined"
            label={t("registerProperty.labels.address_city")}
          />
          <TextField
            className={`${classes.customizedTextFieldMainBack} ${useClasses.short}`}
            name="address.exact"
            required
            inputRef={register({ required: true })}
            variant="outlined"
            // disabled={!uniquenessChecked.unique}
            label={t("registerProperty.labels.address_exact")}
          />
        </Box>
        <MainActionButton disabled={!uniquenessChecked.unique}>
          {t("registerProperty.actions.register_property")}
        </MainActionButton>
      </form>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hor: {
      display: "flex",
      alignItems: "center",
      padding: "2px",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    customized: {
      minWidth: 400,
      margin: theme.spacing(1),
      marginLeft: 0,
      [theme.breakpoints.down("xs")]: {
        minWidth: 300,
        maxWidth: 300,
      },
    },
    short: {
      margin: theme.spacing(1),
      marginLeft: 0,
      minWidth: 220,
    },
    form: {
      position: "relative",
      minHeight: 500,
      paddingBottom: 80,
    },
  })
);

export default customWithStyles(CreatePropertyUi);

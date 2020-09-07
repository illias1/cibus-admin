/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";

const filter = createFilterOptions<TOption>();

type TAutocomplete = {
  options: string[];
  control: any;
};

type TOption = {
  inputValue?: string;
  category: string;
};

const FreeSoloCreateOption: React.FC<TAutocomplete> = ({ options, control }) => {
  const [value, setValue] = React.useState<TOption | null>(null);

  return (
    <Controller
      as={
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              setValue({
                category: newValue,
              });
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setValue({
                category: newValue.inputValue,
              });
            } else {
              setValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if (params.inputValue !== "") {
              filtered.push({
                category: `Add "${params.inputValue}"`,
                inputValue: params.inputValue,
              });
            }

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="free-solo-with-text-demo"
          options={options.map((category) => ({ category, inputValue: "" }))}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.category;
          }}
          style={{ width: 300 }}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Free solo with text demo" variant="outlined" />
          )}
        />
      }
      control={control}
      defaultValue={{ category: "" }}
      name="categories"
      options={options}
    />
  );
};

export default FreeSoloCreateOption;

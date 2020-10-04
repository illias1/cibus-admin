type TIsUrlValid = string;

export const getIsUrlValid = (url: string): TIsUrlValid => {
  if (url.includes(" ")) {
    return "registerProperty.errors.no_spaces";
  }
  if (url.includes("/")) {
    return "registerProperty.errors.no_backslash";
  }
  return "";
};

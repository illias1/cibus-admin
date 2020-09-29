type TIsUrlValid = string;

export const getIsUrlValid = (url: string): TIsUrlValid => {
  if (url.includes(" ")) {
    return "Shouldn't contain spaces";
  }
  if (url.includes("/")) {
    return "Shouldn't contain /";
  }
  return "";
};

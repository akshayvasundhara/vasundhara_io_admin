import { toast } from "react-toastify";

export const errorResponse = (e) => {
  if (typeof e?.response?.data?.message === "string")
    toast.error(e?.response?.data?.message);
  else if (typeof e?.message === "string") toast.error(e?.message);
  else toast.error("Something Wrong! Please try again!");
};

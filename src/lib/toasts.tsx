import { toast } from "@heroui/react";

export const successToast = (msg: string) => {
  toast.success(msg);
};

export const errorToast = (msg: string) => {
  toast.danger(msg);
};

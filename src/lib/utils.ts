import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAvatar = (fb: any) => {
  return (
    fb?.researcher?.user?.image ||
    fb?.researcher?.organization?.logo ||
    "/globe.svg"
  );
};

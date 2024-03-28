import { format, formatDistance  } from "date-fns";
import vi from "date-fns/locale/vi";

export const ONE_DAY = 24 * 60 * 60 * 1000;

export const ONE_MONTH = 30 * ONE_DAY;

export const date = (time) => format(time, "dd/MM/yyyy");

export const time = (time) => format(time, "HH:mm dd/MM/yyyy");

export function RangeTime(last) {
    if (!last) return "";
    const result = formatDistance(new Date(last), new Date(), { locale: vi })
    return result;
}

export function ColorTime(last) {
    if (!last) return "";
    const result = Date.now() - last;
    if(result > ONE_DAY) return 'text-red-700';
    else return 'text-green-700';
}

export function RangeMonth(last) {
    const result = Date.now() - last;
    const month = result / ONE_MONTH;
    return month;
}
import dayjs from "dayjs"

const useDateFormat = (date,  format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
}

export default useDateFormat;
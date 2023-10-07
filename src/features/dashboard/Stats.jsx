import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiCalendarDays,
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, cabinCount, numDays }) {
  const numOfBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkIns = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="bookings"
        value={numOfBookings}
        color="blue"
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="sales"
        value={formatCurrency(sales)}
        color="green"
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="check ins"
        value={checkIns}
        color="indigo"
        icon={<HiCalendarDays />}
      />
      <Stat
        title="occupation rate"
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;

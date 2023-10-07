import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { cabins, isLoading } = useCabins();

  // 1. FILTER
  const filterValue = searchParams.get("discount") || "all";
  const sortedValue = searchParams.get("sortBy") || "name-asc";

  let filterCabins;

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resource="cabins" />;

  if (filterValue === "all") {
    filterCabins = cabins;
  } else if (filterValue === "no-discount") {
    filterCabins = cabins.filter((cabin) => !cabin.discount);
  } else if (filterValue === "with-discount") {
    filterCabins = cabins.filter((cabin) => cabin.discount);
  }

  // 2. SORTING
  const [filed, direction] = sortedValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterCabins.sort(
    (a, b) => (a[filed] - b[filed]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;

import Filter from "./Filter";
import SortBy from "./SortBy";
import TableOperations from "./TableOperations";

function CabinTableOperation() {
  const filteredOptions = [
    {
      name: "all",
      label: "All",
    },
    {
      name: "no-discount",
      label: "No Discount",
    },
    {
      name: "with-discount",
      label: "With Discount",
    },
  ];

  const sortByOptions = [
    { name: "name-asc", label: "Sort By Name (A - Z)" },
    { name: "name-desc", label: "Sort By Name (Z - A)" },
    { name: "regularPrice-asc", label: "Sort By Price (Low First)" },
    { name: "regularPrice-desc", label: "Sort By Price (High First)" },
    { name: "maxCapacity-asc", label: "Sort By Capacity (Low First)" },
    { name: "maxCapacity-desc", label: "Sort By Capacity (High First)" },
  ];

  return (
    <TableOperations>
      <Filter filterField="discount" options={filteredOptions} />
      <SortBy filterField="sortBy" options={sortByOptions} />
    </TableOperations>
  );
}

export default CabinTableOperation;

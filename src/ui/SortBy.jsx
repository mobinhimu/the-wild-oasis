import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get("sortBy") || options.at(0).name;

  function handleChange(eve) {
    searchParams.set("sortBy", eve.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={value}
    />
  );
}

export default SortBy;

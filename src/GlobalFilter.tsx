import { Input } from "@chakra-ui/react";

function GlobalFilter(props: { column: any }) {
  const { filterValue, setFilter } = props.column;
  return (
    <Input
      h={5}
      fontSize={12}
      placeholder={"Search..."}
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
}
export default GlobalFilter;

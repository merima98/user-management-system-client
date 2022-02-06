import React from "react";
import { useTable, useFilters, useGlobalFilter, useSortBy } from "react-table";
import { ChevronDown, ChevronUp } from "react-feather";
import {
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Text,
  useColorModeValue,
  Tbody,
  Td,
  Center,
  Box,
} from "@chakra-ui/react";
import { map } from "ramda";

import GlobalFilter from "../GlobalFilter";

type props = {
  size?: "sm" | "md" | "lg";
  columns: any;
  data: any;
};

function UserTable(props: props) {
  const tableHeadBackgroundColor = useColorModeValue("white", "gray.800");
  const { size = "sm", columns, data } = props;
  const defaultColumn: any = React.useMemo(
    () => ({
      Filter: GlobalFilter,
    }),
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
      },
      useFilters,
      useGlobalFilter,
      useSortBy
    );

  return (
    <Center>
      <ChakraTable
        size={size}
        {...getTableProps()}
        mt={20}
        w={{ base: "100vw", md: "70vw" }}
        mb={8}
      >
        <Thead
          position={"sticky"}
          top={"2.5rem"}
          bg={tableHeadBackgroundColor}
          zIndex={3}
        >
          {map(
            (group) => (
              <Tr
                display={{ base: "flex", md: "table-row" }}
                flexDirection={{ base: "column", md: "row" }}
                {...group.getHeaderGroupProps()}
                key={group.getHeaderGroupProps().key}
              >
                {map(
                  (column: any) => (
                    <Th
                      zIndex={2}
                      p={5}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={column.getHeaderProps().key}
                    >
                      <Box
                        mb={3}
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"center"}
                      >
                        {column.render("Header")}
                        <Text>
                          {column.canFilter &&
                          column.render("Header") !== "Actions" ? (
                            column.isSortedDesc ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronUp size={16} />
                            )
                          ) : (
                            ""
                          )}
                        </Text>
                      </Box>
                      <Text>
                        {column.canFilter &&
                        column.render("Header") !== "Actions" &&
                        column.render("Header") !== "Status"
                          ? column.render("Filter")
                          : null}
                      </Text>
                    </Th>
                  ),
                  group.headers
                )}
              </Tr>
            ),
            headerGroups
          )}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {map((row) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                key={row.getRowProps().key}
                display={{ base: "flex", md: "table-row" }}
                flexDirection={{ base: "column", md: "row" }}
              >
                {map((cell) => {
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={cell.getCellProps().key}
                      textAlign={"center"}
                      display={{ base: "flex", md: "table-cell" }}
                      flexDirection={"row"}
                      justifyContent={"center"}
                    >
                      {cell.render("Cell")}
                    </Td>
                  );
                }, row.cells)}
              </Tr>
            );
          }, rows)}
        </Tbody>
      </ChakraTable>
    </Center>
  );
}

export default UserTable;

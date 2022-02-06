import React from "react";
import { useTable, useFilters, useGlobalFilter, useSortBy } from "react-table";
import { ArrowDown, ArrowUp } from "react-feather";

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
  hiddenColumns?: string[];
};

function UserTable(props: props) {
  const tableHeadBackgroundColor = useColorModeValue("white", "gray.800");

  const { size = "sm", columns, data, hiddenColumns = [] } = props;
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
        initialState: {
          hiddenColumns,
        },
      },
      useFilters,
      useGlobalFilter,
      useSortBy
    );

  return (
    <Center>
      <ChakraTable size={size} {...getTableProps()} mt={20} w={"70vw"} mb={8}>
        <Thead
          position={"sticky"}
          top={"2.5rem"}
          bg={tableHeadBackgroundColor}
          zIndex={3}
        >
          {map(
            (group) => (
              <Tr
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
                              <ArrowDown />
                            ) : (
                              <ArrowUp />
                            )
                          ) : (
                            ""
                          )}
                        </Text>
                      </Box>
                      <Text>
                        {column.canFilter &&
                        column.render("Header") !== "Actions"
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
              <Tr {...row.getRowProps()} key={row.getRowProps().key}>
                {map((cell) => {
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={cell.getCellProps().key}
                      textAlign={"center"}
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

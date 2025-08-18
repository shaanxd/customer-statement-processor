import type { FC, PropsWithChildren } from "react";

type TableProps = {
  headers: string[];
};

const Table: FC<PropsWithChildren<TableProps>> = ({ headers, children }) => {
  return (
    <div className="overflow-x-auto border border-base-content/5 rounded-sm  bg-base-100">
      <table className="table table-zebra mt-0 mb-0">
        <thead>
          <tr>
            {headers.map((header) => (
              <th className="p-2" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;

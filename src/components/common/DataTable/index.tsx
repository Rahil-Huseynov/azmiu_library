import PaginationButtons from "../Pagination";
import "./index.scss";

export interface Column {
    key: string;
    label: string;
    downFilterIcon?: string;
}

interface PaginationProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
}

interface DataTableProps<T> {
    columns: Column[];
    data: T[];
    pagination?: PaginationProps;
}

const DataTable = <T extends Record<string, any>>({
    columns,
    data,
    pagination,
}: DataTableProps<T>) => {
    const handleColumnClick = (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
        const thElement = e.currentTarget.querySelector('.table_thead_tr_th_down_filter');
        thElement?.classList.toggle('rotate');
    };

    return (
        <>
            <table className="table">
                <thead className="table_thead">
                    <tr className="table_thead_tr">
                        {columns?.map((col, index) => (
                            <th 
                                className="table_thead_tr_th" 
                                onClick={handleColumnClick} 
                                key={index}>
                                {col.label}
                                {col.downFilterIcon && (
                                    <img 
                                        src={col.downFilterIcon} 
                                        className="table_thead_tr_th_down_filter" 
                                        alt="down_filter" 
                                    />
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>{item[col.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {pagination && (
              <div className="table_PaginationContainer">
                <PaginationButtons 
                  count={pagination.count} 
                  page={pagination.page} 
                  onChange={pagination.onChange} 
                />
              </div>
            )}
        </>
    );
};

export default DataTable;

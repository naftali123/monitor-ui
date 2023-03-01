import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ActivityHistory } from "../types/ActivityHistory";
import TablePagination from '@mui/material/TablePagination/TablePagination';
import { useState } from 'react';
import Chip from '@mui/material/Chip/Chip';

interface ActivityDataProps {
    label: string;
    data: ActivityHistory[];
}

export default function ActivityData(props: ActivityDataProps) {
    const { label, data } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if (!data) return null;
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper>
            <TableContainer>
                {data && data.length > 0 &&
                    (<Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {Object.keys(data[0]).map((key, i) => (
                                    data[0][key as keyof typeof data[0]] !== undefined && typeof data[0][key as keyof typeof data[0]] === 'number'
                                        ? <TableCell key={label + i} align="right">{key}</TableCell>
                                        : <TableCell key={label + i}>{key}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...data]
                                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: ActivityHistory) => (
                                    <TableRow
                                        key={label + row.responseTime + row.date}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="right">
                                            {row.active
                                                ? <Chip label="Active" color="success" />
                                                : <Chip label="Inactive" color="error" />
                                            }
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {new Date(row.date).toLocaleString()}
                                        </TableCell>
                                        <TableCell align="right">{row.info}</TableCell>
                                        <TableCell align="right">{row.responseTime}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>)}
            </TableContainer>
            {data && data.length && <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}
        </Paper>
    );
}


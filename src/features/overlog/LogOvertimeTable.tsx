import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemButton, ListItemText, Collapse, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../app/store/configureStore";
import { logOvertimeSelectors } from "./overtimeSlice";


interface Props {
    staffId : number,
    date: Date
}


function LogOvertimeTable({staffId, date} : Props) {
    const [open, setOpen] = useState(true);

    const dispatch = useAppDispatch();


    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary="(4*) Diễn giải chi tiết ngày làm thêm (VND)" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ bgcolor: "#F2F2F2" }}>
                            <TableRow>
                                <TableCell align="center" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Nội dung</TableCell>
                                <TableCell align="center" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Số ngày làm thêm giờ</TableCell>
                                <TableCell align="center" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Số giờ làm thêm giờ</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>Lương làm thêm giờ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0' }}>Row 1, Column 1</TableCell>
                                <TableCell align="center" style={{ borderRight: '1px solid #e0e0e0' }}>Row 1, Column 2</TableCell>
                                <TableCell align="center" style={{ borderRight: '1px solid #e0e0e0' }}>Row 1, Column 3</TableCell>
                                <TableCell align="center">Row 1, Column 3</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Collapse>
        </>
    );
}

export default LogOvertimeTable;
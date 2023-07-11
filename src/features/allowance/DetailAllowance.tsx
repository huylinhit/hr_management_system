import { ConstructionOutlined, ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemButton, ListItemText, Collapse, TableContainer, TableRow, TableCell, Table, TableBody, TableHead, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import axios from "axios";
import LoadingComponent from "../../app/layout/LoadingComponent";
import Contract from "../../app/models/contract";
import { Allowance } from "../../app/models/allowance";

interface Props {
    allowances: Allowance[],
    totalAllowance: number
}
function DetailAllowance({ allowances, totalAllowance }: Props) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary="(1*) Diễn giải chi tiết phúc lợi (VND)" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ bgcolor: "#F2F2F2" }}>
                            <TableRow>
                                <TableCell align="right" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Nội dung</TableCell>
                                <TableCell align="right" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Ghi Chú</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bold" }}>Số tiền</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allowances.length !== 0 && (
                                allowances.map(item => (
                                    <TableRow key={item.allowanceId}>
                                        <TableCell align="right" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0' }}>{item.allowanceType.allowanceName}</TableCell>
                                        <TableCell align="right" style={{ borderRight: '1px solid #e0e0e0' }}>{item.allowanceType.allowanceDetailSalary}</TableCell>
                                        <TableCell align="right">+ {item.allowanceSalary.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))
                            )}
                            <TableRow>
                                <TableCell align="right" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Tổng cộng</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>+ {totalAllowance.toLocaleString()}</TableCell>
                            </TableRow>


                        </TableBody>
                    </Table>
                </TableContainer>
            </Collapse>
        </>
    );
}

export default DetailAllowance;
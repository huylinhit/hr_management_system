import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemButton, ListItemText, Collapse, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useState } from "react";
import { LogLeave } from "../../../app/models/logLeave";
import moment from "moment";

interface Props {
    logLeavesStaff: LogLeave[],
    unpaidLeaveDays: number,
    unpaidLeaveHours: number,
    paidLeaveDays: number,
    paidLeaveHours: number,
    now: Date
}

function LogLeaveTable({ logLeavesStaff, unpaidLeaveDays, paidLeaveDays, unpaidLeaveHours, paidLeaveHours, now }: Props) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary="(2*) Diễn giải chi tiết ngày nghỉ" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ bgcolor: "#F2F2F2" }}>
                            <TableRow>
                                <TableCell align="center" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Nội dung</TableCell>
                                <TableCell align="center" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Bắt đầu</TableCell>
                                <TableCell align="center" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Kết thúc</TableCell>
                                <TableCell align="center" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Số ngày</TableCell>
                                <TableCell align="center" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Số giờ</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>Tiền khấu trừ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {logLeavesStaff.length !== 0 && (
                                logLeavesStaff.map(item => (
                                    <TableRow key={item.leaveLogId}>
                                        <TableCell align="center" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0' }}>{item.leaveType.leaveTypeName}</TableCell>
                                        <TableCell align="center" style={{ borderRight: '1px solid #e0e0e0' }}>{moment(item.leaveStart).format("DD-MM-YYYY")}</TableCell>
                                        <TableCell align="center">{moment(item.leaveEnd).format("DD-MM-YYYY")}</TableCell>
                                        <TableCell align="center">{item.leaveDays}</TableCell>
                                        <TableCell align="center">{item.leaveHours}</TableCell>
                                        <TableCell align="center">- {item.amount.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))
                            )}

                            <TableRow>
                                <TableCell align="center" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Tổng cộng</TableCell>
                                <TableCell align="center" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>{moment(now).startOf("month").format("DD-MM-YYYY")}</TableCell>
                                <TableCell align="center" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>{moment(now).endOf("month").format("DD-MM-YYYY")}</TableCell>
                                <TableCell align="center" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>{unpaidLeaveDays + paidLeaveDays}</TableCell>
                                <TableCell align="center" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>{unpaidLeaveHours + paidLeaveHours}</TableCell> 
                                <TableCell align="center" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>- {logLeavesStaff.reduce((total, item) => total + item.amount, 0).toLocaleString()}</TableCell> 
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Collapse>
        </>
    );
}

export default LogLeaveTable;
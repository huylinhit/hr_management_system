import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemButton, ListItemText, Collapse, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../app/store/configureStore";
import { LogOt } from "../../app/models/logOt";
import moment from "moment";


interface Props {
    logOts: LogOt[],
    totalLogOtDays: number,
    totalLogOtHours: number,
    totalLogOtSalary: number,
    now: Date
}


function LogOvertimeTable({ logOts, totalLogOtDays, totalLogOtHours, totalLogOtSalary, now }: Props) {
    const [open, setOpen] = useState(true);

    const dispatch = useAppDispatch();

    console.log("here: ",now.getMonth());

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
                                <TableCell align="right" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Nội dung</TableCell>
                                <TableCell align="right" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Bắt đầu</TableCell>
                                <TableCell align="right" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Kết thúc</TableCell>
                                <TableCell align="right" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Số ngày</TableCell>
                                <TableCell align="right" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Số giờ</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bold" }}>Lương làm thêm</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {logOts.length !== 0 && logOts.map(item => (
                                <TableRow key={item.otLogId}>
                                    <TableCell align="right" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0' }}>{item.otType.typeName}</TableCell>
                                    <TableCell align="right" style={{ borderRight: '1px solid #e0e0e0' }}>{moment(item.logStart).format("DD-MM-YYYY")}</TableCell>
                                    <TableCell align="right" style={{ borderRight: '1px solid #e0e0e0' }}>{moment(item.logEnd).format("DD-MM-YYYY")}</TableCell>
                                    <TableCell align="right" style={{ borderRight: '1px solid #e0e0e0' }}>{item.days}</TableCell>
                                    <TableCell align="right" style={{ borderRight: '1px solid #e0e0e0' }}>{item.logHours}</TableCell>
                                    <TableCell align="right">+ {item.amount.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell align="right" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Tổng cộng</TableCell>
                                <TableCell align="right" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>{moment(now).startOf("month").format("DD-MM-YYYY")}</TableCell>
                                <TableCell align="right" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>{moment(now).endOf("month").format("DD-MM-YYYY")}</TableCell>
                                <TableCell align="right" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>{totalLogOtDays.toLocaleString()}</TableCell>
                                <TableCell align="right" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>{totalLogOtHours.toLocaleString()}</TableCell>
                                <TableCell align="right" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>+ {totalLogOtSalary.toLocaleString()}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Collapse>
        </>
    );
}

export default LogOvertimeTable;
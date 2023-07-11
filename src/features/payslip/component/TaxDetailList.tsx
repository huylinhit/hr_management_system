import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemButton, ListItemText, Collapse, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useState } from "react";
import { TaxDetail } from "../../../app/models/taxDetail";

interface Props {
    taxDetails: TaxDetail[]
}

function TaxDetailList({
    taxDetails
}: Props) {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary="(3*) Chi tiết thuế thu nhập cá nhân (VND)" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ bgcolor: "#F2F2F2" }}>
                            <TableRow>
                                <TableCell align="right" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Mức chịu thuế</TableCell>
                                <TableCell align="right" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Thuế suất</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bold" }}>Tiền nộp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {taxDetails.map(item => (
                                <TableRow>
                                    <TableCell align="right" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0' }}>{item.taxLevelNavigation.description}</TableCell>
                                    <TableCell align="right" style={{ borderRight: '1px solid #e0e0e0' }}>{item.taxLevelNavigation.taxPercentage}%</TableCell>
                                    <TableCell align="right">- {item.amount.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell align="right" component="th" scope="row" style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>Tổng cộng</TableCell>
                                <TableCell align="right" ></TableCell>
                                <TableCell align="right" style={{ fontWeight: "bold" }}>- {taxDetails.reduce((total, item) => total + item.amount, 0).toLocaleString()}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Collapse>
        </>
    );
}

export default TaxDetailList;
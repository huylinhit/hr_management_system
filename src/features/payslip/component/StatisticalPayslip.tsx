import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemButton, ListItemText, Collapse, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface Props {
    actualGross: number
    standardWorkDays: number
    otDays: number
    paidLeaveDays: number
    unpaidLeaveDays: number
    actualWorkDays: number
    actualNet: number
}


function StatisticalPayslip({
    actualGross,
    standardWorkDays,
    otDays,
    paidLeaveDays,
    unpaidLeaveDays,
    actualWorkDays,
    actualNet
}: Props) {
    const style = {
        fontSize: "16px",
        border: "1px solid black",
        px: "40px"
    }
    return (
        <>
            <Typography mb="8px" fontWeight="bold" fontSize="24px">Tổng quan lương (VND)</Typography>
            <Grid container>
                <Grid item xs={6} sx={{ border: "1px solid black" }}>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>Lương Gross thực tế</Typography>
                    <Typography align="right" sx={style}>Số ngày công chuẩn</Typography>
                    <Typography align="right" sx={style}>Số ngày làm thêm</Typography>
                    <Typography align="right" sx={style}>Số ngày nghỉ phép có lương</Typography>
                    <Typography align="right" sx={style}>Số ngày nghỉ phép không lương</Typography>
                    <Typography align="right" sx={style}>Số ngày công thực tế</Typography>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>Lương Net thực Tế</Typography>
                </Grid>
                <Grid item xs={6} sx={{ border: "1px solid black" }}>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>{actualGross.toLocaleString()}</Typography>
                    <Typography align="right" sx={style}>{standardWorkDays}</Typography>
                    <Typography align="right" sx={style}>{otDays}</Typography>
                    <Typography align="right" sx={style}>{paidLeaveDays}</Typography>
                    <Typography align="right" sx={style}>{unpaidLeaveDays}</Typography>
                    <Typography align="right" sx={style}>{actualWorkDays}</Typography>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>{actualNet.toLocaleString()}</Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default StatisticalPayslip;
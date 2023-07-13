import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemButton, ListItemText, Collapse, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Grid, Typography } from "@mui/material";
import { useState } from "react";


interface Props {
    actualGrossSalaryCompany: number
    bhxhComp: number
    bhytComp: number
    bhtnComp: number
    otSalary: number
    actualNetSalaryCompany: number
}

function CompanyPaid({
    actualGrossSalaryCompany,
    bhxhComp,
    bhytComp,
    bhtnComp,
    otSalary,
    actualNetSalaryCompany
}: Props) {
    const style = {
        fontSize: "16px",
        border: "1px solid black",
        px: "40px"
    }

    return (
        <>

            <Typography mt="32px" mb="8px" fontWeight="bold" fontSize="24px">Người sử dụng lao động trả (VND)</Typography>
            <Grid container>
                <Grid item xs={6} sx={{ border: "1px solid black" }}>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>Lương Gross thực tế</Typography>
                    <Typography align="right" sx={style}>Bảo hiểm xã hội (17.5%)</Typography>
                    <Typography align="right" sx={style}>Bảo hiểm y tế (3%)</Typography>
                    <Typography align="right" sx={style}>Bảo hiểm thất nghiệp (1%)</Typography>
                    <Typography align="right" sx={{ ...style}}>Lương làm thêm giờ</Typography>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>Lương Net thực tế</Typography>
                </Grid>
                <Grid item xs={6} sx={{ border: "1px solid black" }}>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>{actualGrossSalaryCompany.toLocaleString()}</Typography>
                    <Typography align="right" sx={style}>{bhxhComp.toLocaleString()}</Typography>
                    <Typography align="right" sx={style}>{bhytComp.toLocaleString()}</Typography>
                    <Typography align="right" sx={style}>{bhtnComp.toLocaleString()}</Typography>
                    <Typography align="right" sx={{ ...style}}>{otSalary.toLocaleString()}</Typography>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>{actualNetSalaryCompany.toLocaleString()}</Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default CompanyPaid;
import { Grid, Typography } from "@mui/material";

interface Props {
    negotiableGrossSalaryEmployee : number
    totalAllowance : number
    payCut : number
    actualGrossSalaryEmployee : number
    bhxhEmp : number
    bhytEmp : number
    bhtnEmp : number
    salaryBeforeTax : number
    personalDeduction : number
    familyDedection : number
    taxableIncome : number
    personalIncomeTax : number
    negotiableNetSalaryEmployee : number
    overtimeSalary : number
    actualNetSalaryEmployee : number
}

function PayslipDetailSalary({
    negotiableGrossSalaryEmployee,
    totalAllowance,
    payCut,
    actualGrossSalaryEmployee,
    bhxhEmp,
    bhytEmp,
    bhtnEmp,
    salaryBeforeTax,
    personalDeduction,
    familyDedection,
    taxableIncome,
    personalIncomeTax,
    negotiableNetSalaryEmployee,
    overtimeSalary,
    actualNetSalaryEmployee
}: Props) {
    const style = {
        fontSize: "16px",
        border: "1px solid black",
        px: "40px"
    }
    return (
        <>
            <Typography mt="32px" mb="8px" fontWeight="bold" fontSize="24px">Chi tiết lương (VND)</Typography>

            <Grid container>
                <Grid item xs={6} sx={{ border: "1px solid black" }}>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>Lương Gross thỏa thuận</Typography>
                    <Typography align="right" sx={style}>Tổng phúc lợi (1*)</Typography>
                    <Typography align="right" sx={style}>Khấu trừ ngày nghỉ (2*)</Typography>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>Lương Gross thực tế</Typography>
                    <Typography align="right" sx={style}>Bảo Hiểm Xã Hội (8%)</Typography>
                    <Typography align="right" sx={style}>Bảo Hiểm Y Tế (1.5%)</Typography>
                    <Typography align="right" sx={style}>Bảo Hiểm Thất Nghiệp (1%)</Typography>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>Thu Nhập Trước Thuế</Typography>
                    <Typography align="right" sx={style}>Giảm trừ gia cảnh bản thân</Typography>
                    <Typography align="right" sx={style}>Giảm trừ gia cảnh người phụ thuộc</Typography>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>Thu Nhập Chịu Thuế</Typography>
                    <Typography align="right" sx={style}>Thuế thu nhập cá nhân (3*)</Typography>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>Lương Net thỏa thuận</Typography>
                    <Typography align="right" sx={style}>Lương làm thêm giờ (4*)</Typography>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>Lương Net thực tế</Typography>


                </Grid>
                <Grid item xs={6} sx={{ border: "1px solid black" }}>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>{negotiableGrossSalaryEmployee}</Typography>
                    <Typography align="right" sx={style}>{totalAllowance}</Typography>
                    <Typography align="right" sx={style}>{payCut}</Typography>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>{actualGrossSalaryEmployee}</Typography>
                    <Typography align="right" sx={style}>{bhxhEmp}</Typography>
                    <Typography align="right" sx={style}>{bhytEmp}</Typography>
                    <Typography align="right" sx={style}>{bhtnEmp}</Typography>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>{salaryBeforeTax}</Typography>
                    <Typography align="right" sx={style}>{personalDeduction}</Typography>
                    <Typography align="right" sx={style}>{familyDedection}</Typography>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>{taxableIncome}</Typography>
                    <Typography align="right" sx={style}>{personalIncomeTax}</Typography>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>{negotiableNetSalaryEmployee}</Typography>
                    <Typography align="right" sx={style}>{overtimeSalary}</Typography>
                    <Typography align="right" sx={{ ...style, fontWeight: "bold", bgcolor: "#ccc" }}>{actualNetSalaryEmployee}</Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default PayslipDetailSalary;
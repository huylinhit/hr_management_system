import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { useEffect, useState } from "react";
import DetailAllowance from "../../allowance/DetailAllowance";
import LogLeaveTable from "../../detail_leavelog/component/LogLeaveTable";
import PayslipInfo from "./PayslipInfo";
import StatisticalPayslip from "./StatisticalPayslip";
import { fetchPayslipAsync, fetchPayslipsAsync, payslipSelectors } from "../payslipSlice";
import CompanyPaid from "./CompanyPaid";
import PayslipDetailSalary from "./PayslipDetailSalary";
import TaxDetailList from "./TaxDetailList";
import { contractSelectors, fetchContractValidDetailASync } from "../../detail_contract/contractSlice";
import NotFound from "../../../app/errors/NotFound";
import LogOvertimeTable from "../../overlog/LogOvertimeTable";

function PayslipDetail() {
    const { payslipId, staffId } = useParams();

    const dispatch = useAppDispatch();

    const payslip = useAppSelector(state => payslipSelectors.selectById(state, parseInt(payslipId!)));

    useEffect(() => {
        if (!payslip && payslipId && staffId) {
            dispatch(fetchPayslipAsync({ payslipId: parseInt(payslipId), staffId: parseInt(staffId) }));
        }
    }, [dispatch, payslipId, staffId])



    const date = new Date(payslip?.createAt!);
    console.log(date.getFullYear());

    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Box>
            <Box textAlign="center" sx={{ py: "20px" }}>
                <Typography variant="h4" fontWeight="bold">Phiếu lương</Typography>
                <Typography fontWeight="bold">{date.getDay()}-{date.getMonth()}-{date.getFullYear()}</Typography>
                <PayslipInfo />
            </Box>
            <Typography align="center" variant="h4" fontWeight="bold">Nội dung</Typography>

            <Grid
                container
                sx={{ px: "32px", py: "12px" }}
            >
                {/* Left Container */}
                <Grid item xs={6} pr="12px">
                    <StatisticalPayslip
                        actualGross={payslip?.actualSalary!}
                        standardWorkDays={payslip?.standardWorkDays!} // Need Change
                        otDays={payslip?.actualSalary!} // Need Change
                        paidLeaveDays={payslip?.actualSalary!} // Need Change
                        unpaidLeaveDays={payslip?.actualSalary!} // Need Change
                        actualWorkDays={payslip?.actualWorkDays!}
                    />

                    <PayslipDetailSalary
                        negotiableGrossSalaryEmployee={payslip?.grossSalary!}
                        totalAllowance={payslip?.totalAllowance!}
                        payCut={payslip?.grossSalary!} // Need Change
                        actualGrossSalaryEmployee={payslip?.actualSalary!}
                        bhxhEmp={payslip?.bhxhemp!}
                        bhytEmp={payslip?.bhytemp!}
                        bhtnEmp={payslip?.bhtnemp!}
                        salaryBeforeTax={payslip?.salaryBeforeTax!}
                        personalDeduction={payslip?.selfAllowances!}
                        familyDedection={payslip?.familyAllowances!}
                        taxableIncome={payslip?.salaryTaxable!} // Need Change
                        personalIncomeTax={payslip?.personalIncomeTax!}
                        negotiableNetSalaryEmployee={payslip?.netSalary!}
                        overtimeSalary={payslip?.grossSalary!} // Need Change
                        actualNetSalaryEmployee={payslip?.netSalary!} // Need Change 
                    />

                    <CompanyPaid
                        actualGrossSalaryCompany={payslip?.actualSalary!}
                        bhxhComp={payslip?.bhxhcomp!}
                        bhytComp={payslip?.bhytcomp!}
                        bhtnComp={payslip?.bhtncomp!}
                        actualNetSalaryCompany={payslip?.bhxhcomp!} // Need Change 
                    />
                </Grid>




                {/* Right Container */}
                <Grid item xs={6} pl="12px">
                    <DetailAllowance
                        staffId={parseInt(staffId!)}
                    />

                    <LogLeaveTable
                    
                    />
                    <TaxDetailList 
                        taxDetails={payslip?.taxDetails!}
                    />
                    <LogOvertimeTable
                        staffId={parseInt(staffId!)}
                        date={date}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default PayslipDetail;
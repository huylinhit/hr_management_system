import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { useEffect } from "react";
import DetailAllowance from "../../allowance/DetailAllowance";
import LogLeaveTable from "../../detail_leavelog/component/LogLeaveTable";
import PayslipInfo from "./PayslipInfo";
import StatisticalPayslip from "./StatisticalPayslip";
import { fetchPayslipsAsync, payslipSelectors } from "../payslipSlice";
import CompanyPaid from "./CompanyPaid";
import PayslipDetailSalary from "./PayslipDetailSalary";
import TaxDetailList from "./TaxDetailList";
import LogOvertimeTable from "../../overlog/LogOvertimeTable";
import { fetchLogLeavesAsync, logleaveSelectors } from "../../detail_leavelog/logleaveSlice";
import moment from "moment";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Allowance } from "../../../app/models/allowance";
import { fetchLogOtsAsync, logOvertimeSelectors } from "../../overlog/overtimeSlice";
import { contractSelectors, fetchContractValidDetailASync } from "../../../app/store/contract/contractSlice";

function PayslipDetail() {
    const { payslipId, staffId } = useParams();


    //payslip
    const dispatch = useAppDispatch();
    const payslips = useAppSelector(payslipSelectors.selectAll);
    const payslip = payslips.find(c => c.payslipId === parseInt(payslipId!));
    const { payslipsLoaded, status: payslipStatus } = useAppSelector(state => state.payslip);

    //allowances 
    const contracts = useAppSelector(contractSelectors.selectAll);
    const { contractsLoaded, status: contractStatus } = useAppSelector(state => state.contract);
    const contract = contracts.find(c =>
        c.staffId === parseInt(staffId!) &&
        c.contractStatus === true
    );

    const allowances: Allowance[] = contract ? contract.allowances : [];
    const totalAllowances = allowances?.reduce((total, item) => total + item.allowanceSalary, 0);

    //log Ot 
    const logots = useAppSelector(logOvertimeSelectors.selectAll);
    const { logOtLoaded, status: logOtStatus } = useAppSelector(state => state.logot);
    const logotsStaff = logots
        .filter(c => {
            const start = moment(c.logStart).month();
            const end = moment(c.logEnd).month();
            const now = moment(date).month()

            return c.staffId === parseInt(staffId!) &&
                c.status === 'approved' &&
                start <= now &&
                now <= end;
        })
    const totalLogotSalary = logotsStaff.reduce((total, item) => total + item.amount, 0);
    const totalLogotDays = logotsStaff
        .reduce((total, item) => total +
            (moment(item.logEnd).days() -
                moment(item.logStart).days() + 1), 0)
    const totalLogotHours = logotsStaff.reduce((total, item) => total + item.logHours, 0);

    //log Leave
    const date = payslip?.createAt;
    console.log(date);
    const logLeaves = useAppSelector(logleaveSelectors.selectAll);
    const logLeavesStaff = logLeaves.filter(c => {
        const start = moment(c.leaveStart).month();
        const end = moment(c.leaveEnd).month();
        const now = moment(date).month()

        return c.staffId === parseInt(staffId!) &&
            c.status === 'approved' &&
            start <= now &&
            now <= end;
    });
    const { logleavesLoaded, status: logleaveStatus } = useAppSelector(state => state.logleave);
    const unpaidLeaveDays = logLeavesStaff
        .filter(c => c.leaveTypeId === 3)
        .reduce((total, item) => total + item.leaveDays, 0);

    const unpaidLeaveHours = logLeavesStaff
        .filter(c => c.leaveTypeId === 1)
        .reduce((total, item) => total + item.leaveHours, 0);
    //Need Change
    // const unpaidLeaveDaySalary = logLeavesStaff.reduce((total, item) =>{
    //     return total + item.amount;
    // }, 0)
    const paidLeaveDays = logLeavesStaff
        .filter(c => c.leaveTypeId === 1 || c.leaveTypeId === 2)
        .reduce((total, item) => {
            return total + item.leaveDays;
        }, 0);

    const paidLeaveHours = logLeavesStaff
        .filter(c => c.leaveTypeId === 3)
        .reduce((total, item) => total + item.leaveHours, 0)

    //useEffect Contract
    useEffect(() => {
        if (!contractsLoaded)
            dispatch(fetchContractValidDetailASync(parseInt(staffId!)));
    }, [contractsLoaded])

    //useEffect Log Ot
    useEffect(() => {
        if (!logOtLoaded)
            dispatch(fetchLogOtsAsync());
    }, [logOtLoaded]);

    //useEffect Log Leave
    useEffect(() => {
        if (!logleavesLoaded) {
            dispatch(fetchLogLeavesAsync());
        }
    }, [logleavesLoaded]);

    //useEffect Payslip
    useEffect(() => {
        if (!payslipsLoaded && payslipId && staffId) {
            dispatch(fetchPayslipsAsync());
        }
    }, [payslipsLoaded, payslipId, staffId])

    if (payslipStatus.includes('pending')) return <LoadingComponent message="Loading Payslip" />

    if (logOtStatus.includes('pending')) return <LoadingComponent message="Loading Log Overtime" />

    if (logleaveStatus.includes('pending')) return <LoadingComponent message="Loading Log Leaves" />;

    if (contractStatus.includes('pending')) return <LoadingComponent message="Loading Contract" />

    return (
        <>
            {payslip && (
                <Box>
                    <Box textAlign="center" sx={{ py: "20px" }}>
                        <Typography variant="h4" fontWeight="bold">Phiếu lương</Typography>
                        <Typography fontWeight="bold">{moment(date).format("DD-MM-YYYY")}</Typography>
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
                                standardWorkDays={payslip?.standardWorkDays!}
                                otDays={totalLogotDays}
                                paidLeaveDays={paidLeaveDays}
                                unpaidLeaveDays={unpaidLeaveDays}
                                actualWorkDays={payslip?.actualWorkDays!}
                            />

                            <PayslipDetailSalary
                                negotiableGrossSalaryEmployee={payslip?.grossSalary!}
                                totalAllowance={totalAllowances}
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
                                overtimeSalary={totalLogotSalary}
                                actualNetSalaryEmployee={payslip?.netSalary!} // Need Change 
                            />

                            <CompanyPaid
                                actualGrossSalaryCompany={payslip?.actualSalary!}
                                bhxhComp={payslip?.bhxhcomp!}
                                bhytComp={payslip?.bhytcomp!}
                                bhtnComp={payslip?.bhtncomp!}
                                actualNetSalaryCompany={payslip?.totalPaid!} // Need Change 
                            />
                        </Grid>

                        {/* Right Container */}
                        <Grid item xs={6} pl="12px">
                            <DetailAllowance
                                allowances={allowances}
                                totalAllowance={totalAllowances}
                            />

                            <LogLeaveTable
                                logLeavesStaff={logLeavesStaff}
                                unpaidLeaveDays={unpaidLeaveDays}
                                unpaidLeaveHours={unpaidLeaveHours}
                                paidLeaveDays={paidLeaveDays}
                                paidLeaveHours={paidLeaveHours}
                                now={new Date(date!)}
                            />

                            <TaxDetailList
                                taxDetails={payslip?.taxDetails!}
                            />
                            <LogOvertimeTable
                                logOts={logotsStaff}
                                totalLogOtDays={totalLogotDays}
                                totalLogOtHours={totalLogotHours}
                                totalLogOtSalary={totalLogotSalary}
                                now={new Date(date!)}
                            />
                        </Grid>
                    </Grid>
                </Box>
            )}
        </>

    );
}

export default PayslipDetail;
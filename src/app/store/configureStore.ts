import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../../features/account/accountSlice";
import { departmentSlice } from "../../features/department/departmentSlice";
import { userInforSlice } from "../../features/department/userInforSlice";
import { ticketSlice } from "../../features/othertypes/ticketSlice";
import { ticketTypeSlice } from "../../features/othertypes/ticketTypeSlice";
import { staffSkillSlice } from "../../features/skills/staffSkillSlice";
import { payslipSlice } from "../../features/payslip/payslipSlice";
import { logotSlice } from "../../features/overlog/overtimeSlice";
import { logleaveSlice } from "../../features/detail_leavelog/logleaveSlice";
import { employeeSlice } from "./employee/employeeSlice";
import { candidateSlice } from "../../features/candidate/candidateSlice";
import { candidateSkillSlice } from "../../features/candidate/candidateSkillSlice";
import { headerSlice } from "../layout/headerSlice";
import { contractSlice } from "./contract/contractSlice";
import { allowanceTypeSlice } from "./allowanceType/allowanceTypeSlice";
import { leaveDayDetailSlice } from "../../features/detail_leavelog/leaveDayDetailSlice";

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        contract: contractSlice.reducer,
        department: departmentSlice.reducer,
        userInfor: userInforSlice.reducer,
        ticket: ticketSlice.reducer,
        ticketType: ticketTypeSlice.reducer,
        staffSkill: staffSkillSlice.reducer,
        payslip: payslipSlice.reducer,
        logot: logotSlice.reducer,
        logleave: logleaveSlice.reducer,
        candidateSkill: candidateSkillSlice.reducer,
        employee: employeeSlice.reducer,
        candidate: candidateSlice.reducer,
        header: headerSlice.reducer,
        allowanceType: allowanceTypeSlice.reducer,
        leaveDayDetail: leaveDayDetailSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
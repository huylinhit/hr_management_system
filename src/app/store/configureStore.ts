import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../../features/account/accountSlice";
import { departmentSlice } from "../../features/department/departmentSlice";
import { userInforSlice } from "../../features/department/userInforSlice";
import { ticketSlice } from "../../features/othertypes/ticketSlice";
import { ticketTypeSlice } from "../../features/othertypes/ticketTypeSlice";
import { staffSkillSlice } from "../../features/skills/staffSkillSlice";
<<<<<<< HEAD
import { payslipSlice } from "../../features/payslip/payslipSlice";
import { logotSlice } from "../../features/overlog/overtimeSlice";
import { contractSlice } from "../../features/detail_contract/contractSlice";
import { logleaveSlice } from "../../features/detail_leavelog/logleaveSlice";
=======
import { employeeSlice } from "./employee/employeeSlice";
import { candidateSlice } from "../../features/candidate/candidateSlice";
import { candidateSkillSlice } from "../../features/candidate/candidateSkillSlice";
>>>>>>> f6ad5b096476f042cdb239011ecbd4f13fa9abb6

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        contract: contractSlice.reducer,
        department: departmentSlice.reducer,
        userInfor: userInforSlice.reducer,
        ticket: ticketSlice.reducer,
        ticketType: ticketTypeSlice.reducer,
        staffSkill: staffSkillSlice.reducer,
<<<<<<< HEAD
        payslip: payslipSlice.reducer,
        logot: logotSlice.reducer,
        logleave: logleaveSlice.reducer
=======
        candidateSkill: candidateSkillSlice.reducer,
        employee: employeeSlice.reducer,
        candidate: candidateSlice.reducer
>>>>>>> f6ad5b096476f042cdb239011ecbd4f13fa9abb6
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../../features/account/accountSlice";
import { departmentSlice } from "../../features/department/departmentSlice";
import { userInforSlice } from "../../features/department/userInforSlice";
import { ticketSlice } from "../../features/othertypes/ticketSlice";
import { ticketTypeSlice } from "../../features/othertypes/ticketTypeSlice";
import { staffSkillSlice } from "../../features/skills/staffSkillSlice";
import { candidateSlice } from "../../features/candidate/candidateSlice";
import { candidateSkillSlice } from "../../features/candidate/candidateSkillSlice";

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        department: departmentSlice.reducer,
        userInfor: userInforSlice.reducer,
        ticket: ticketSlice.reducer,
        ticketType: ticketTypeSlice.reducer,
        staffSkill: staffSkillSlice.reducer,
        candidateSkill: candidateSkillSlice.reducer,
        candidate: candidateSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
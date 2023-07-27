import { ResponsiveLine } from "@nivo/line";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect } from "react";
import { fetchPayslipsAsync, payslipSelectors } from "../payslip/payslipSlice";
import { Box } from "@mui/material";
import { Payslip } from "../../app/models/payslip";
import dayjs from "dayjs";
import moment from "moment";
function comparePayday(a: Payslip, b: Payslip): number {
  const paydayA = new Date(a.payday);
  const paydayB = new Date(b.payday);
  return paydayA.getTime() - paydayB.getTime();
}
interface PayslipSummary {
  payday: Date;
  totalNetActualSalary: number;
  totalGrossSalary: number;
  totalCompanyPaid: number;
  totalCompanyInsured: number;
  count: number;
}
export default function MyResponsiveLine() {
  const { payslipsLoaded, status, filtersLoaded, departments, payslipParams, metaData } =
    useAppSelector((state) => state.payslip);
  const payslips = useAppSelector(payslipSelectors.selectAll)
 
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!payslipsLoaded) dispatch(fetchPayslipsAsync());
  }, [payslipsLoaded, payslips, dispatch]);

  const payslipsByPayday: {
    [key: string]: PayslipSummary;
  } = payslips.reduce((acc: any, payslip) => {
    const payday = payslip.payday;

    if (!acc[dayjs(payday).get("month")]) {
      acc[dayjs(payday).get("month")] = {
        payday,
        totalNetActualSalary: 0,
        totalGrossSalary: 0,
        totalCompanyPaid: 0,
        totalCompanyInsured: 0,
        count: 0,
      };
    }
    acc[dayjs(payday).get("month")].totalNetActualSalary += payslip.netActualSalary;
    acc[dayjs(payday).get("month")].totalGrossSalary += payslip.grossActualSalary;
    acc[dayjs(payday).get("month")].totalCompanyPaid += payslip.totalCompPaid;
    acc[dayjs(payday).get("month")].totalCompanyInsured += payslip.totalCompInsured;
    acc[dayjs(payday).get("month")].count += 1;
    return acc;
  }, {});

  const payslipData = [
    {
      id: "Lương Net",
      data: Object.values(payslipsByPayday).map((entry) => ({
        x: moment(entry.payday).format("L"),
        y: entry.totalNetActualSalary,
      })),
    },
    {
      id: "Lương Gross",
      data: Object.values(payslipsByPayday).map((entry) => ({
        x: moment(entry.payday).format("L"),
        y: entry.totalGrossSalary,
      })),
    },
    {
      id: "Công ty trả",
      data: Object.values(payslipsByPayday).map((entry) => ({
        x: moment(entry.payday).format("L"),
        y: entry.totalCompanyPaid,
      })),
    },
  ];
  return (
    <>
      <Box height={"50vh"} border={`1px solid #CFCFCF`} borderRadius="4px">
        <ResponsiveLine
          data={payslipData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",

            reverse: false,
          }}
          yFormat=" >-.2f"
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
      
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
     
            legendOffset: -40,
            legendPosition: "middle",
          }}
          axisTop={null}
          axisRight={null}
          curve="natural"
          colors={{ scheme: "category10" }}
          lineWidth={3}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </>
  );
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

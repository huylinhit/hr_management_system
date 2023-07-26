import { ResponsiveLine } from "@nivo/line";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect } from "react";
import { fetchPayslipsAsync, payslipSelectors } from "../payslip/payslipSlice";
import { Box } from "@mui/material";

export default function MyResponsiveLine() {
  const { payslipsLoaded, status, filtersLoaded, departments, payslipParams, metaData } =
    useAppSelector((state) => state.payslip);
  const payslips = useAppSelector(payslipSelectors.selectAll);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!payslipsLoaded) dispatch(fetchPayslipsAsync());
  }, [payslipsLoaded, payslips, dispatch]);

  const payslipInforData = Object.values(payslips).map((payslip) => {
    return {
      netActualSalary: payslip.netActualSalary,
      payday: payslip.payday,
    };
  });
  const data = payslips.map((payslip) => ({
    id: payslip.payday, // Assuming 'payday' is the x-axis value
    data: [
      {
        x: payslip.createAt,
        y: payslip.netActualSalary, // Assuming 'netActualSalary' is the y-axis value
      },
    ],
  }));
  return (
    <>
      <Box height={"50vh"}  >
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "transportation",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
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

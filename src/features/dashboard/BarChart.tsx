import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchUserInforsAsync, userInforSelectors } from "../department/userInforSlice";
import { useEffect } from "react";

export default function BarChart() {
  // -------------------------- VAR -----------------------------
  const dispatch = useAppDispatch();

  // -------------------------- REDUX ---------------------------
  const { userInforsLoaded, userInforAdded } = useAppSelector((state) => state.userInfor);
  const userInfors = useAppSelector(userInforSelectors.selectAll);
  const maleUsersCount = userInfors.filter((c) => c.gender).length;
  const femaleUsersCount = userInfors.filter((c) => !c.gender).length;

  //#region -------------------------- EFFECT --------------------------
  useEffect(() => {
    if (!userInforsLoaded) dispatch(fetchUserInforsAsync());
  }, [dispatch, userInforsLoaded]);
  const userInforData = Object.values(userInfors).map((userInfor) => {
    return {
      fullName: userInfor.fullName,
      Nam: maleUsersCount,
      Nữ: femaleUsersCount,
      hireDate: userInfor.hireDate,
    };
  });
  console.log(userInforData);
  if (!userInfors) return <></>;
  return (
    <ResponsiveBar
      data={userInforData}
      keys={["Nam", "Nữ"]}
      indexBy="hireDate"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.5}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.7]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
    />
  );
}

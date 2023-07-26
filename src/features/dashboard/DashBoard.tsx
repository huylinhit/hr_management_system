import { Box, Card, Grid, Typography } from "@mui/material";
import BarChart from "./BarChart";
import MyResponsiveLine from "./LineChart";
const cardStyle = {
  border: "1px solid #CFCFCF",
  borderRadius: "8px",
  padding: "3% 4%",
  mb: "20px",
  boxShadow: "none",
};
const fontStyle = "Mulish";
export default function DashBoard() {
  return (
    <>
      <Grid container xs={12} spacing={3} sx={{ pl: "30px" }}>
        <Grid item xs={3}>
          <Card sx={cardStyle}>
            <Typography sx={{ fontFamily: fontStyle, fontWeight: "800", color: "242424" }}>
              Chứng chỉ Google Ads
            </Typography>

            <Typography sx={{ fontFamily: fontStyle, fontWeight: "700", color: "#6D6D6D" }}>
              Võ Minh Hoàng
            </Typography>
            <Typography sx={{ fontFamily: fontStyle, fontWeight: "500", color: "#929292" }}>
              Phòng phát triển sản phẩm
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={cardStyle}>
            <Typography sx={{ fontFamily: fontStyle, fontWeight: "800", color: "242424" }}>
              Chứng chỉ Google Ads
            </Typography>

            <Typography sx={{ fontFamily: fontStyle, fontWeight: "700", color: "#6D6D6D" }}>
              Võ Minh Hoàng
            </Typography>
            <Typography sx={{ fontFamily: fontStyle, fontWeight: "500", color: "#929292" }}>
              Phòng phát triển sản phẩm
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={cardStyle}>
            <Typography sx={{ fontFamily: fontStyle, fontWeight: "800", color: "242424" }}>
              Chứng chỉ Google Ads
            </Typography>

            <Typography sx={{ fontFamily: fontStyle, fontWeight: "700", color: "#6D6D6D" }}>
              Võ Minh Hoàng
            </Typography>
            <Typography sx={{ fontFamily: fontStyle, fontWeight: "500", color: "#929292" }}>
              Phòng phát triển sản phẩm
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={cardStyle}>
            <Typography sx={{ fontFamily: fontStyle, fontWeight: "800", color: "242424" }}>
              Chứng chỉ Google Ads
            </Typography>

            <Typography sx={{ fontFamily: fontStyle, fontWeight: "700", color: "#6D6D6D" }}>
              Võ Minh Hoàng
            </Typography>
            <Typography sx={{ fontFamily: fontStyle, fontWeight: "500", color: "#929292" }}>
              Phòng phát triển sản phẩm
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card sx={cardStyle}>
            <Typography sx={{ fontFamily: fontStyle, fontWeight: "800", color: "242424" }}>
              Chứng chỉ Google Ads
            </Typography>

            <Typography sx={{ fontFamily: fontStyle, fontWeight: "700", color: "#6D6D6D" }}>
              Võ Minh Hoàng
            </Typography>
            <Typography sx={{ fontFamily: fontStyle, fontWeight: "500", color: "#929292" }}>
              Phòng phát triển sản phẩm
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <MyResponsiveLine />
        </Grid>
      </Grid>
    </>
  );
}

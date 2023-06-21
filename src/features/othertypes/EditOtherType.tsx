import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const headerStyle = {
  fontWeight: 'bold'
}
const styles = {
  marginBottom: '10px',
};



function EditOtherType({ open, handleClose, handleChange }: any) {
  const { id } = useParams<{ id: string }>();
  
  console.log(id);

  useEffect(() => {

  }, [id])

  return (
    <>
        <Container >
          <Typography variant="h4" sx={headerStyle} style={styles}>
            Phản hồi đơn
          </Typography>
          <Container component={Paper} maxWidth={false} sx={{ padding: '12px' }}>
          <Grid container >
            <Grid item xs={24} sx={{ py: '8px', border: '4px' }}>
              <Grid container spacing={2}>
                <Grid item xs={3}><Typography sx={headerStyle}>Mã đơn</Typography></Grid>
                <Grid item xs={9}><Typography >HR12345</Typography></Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container >
            <Grid item xs={24} sx={{ py: '8px', border: '4px' }}>
              <Grid container spacing={2}>
                <Grid item xs={3}><Typography sx={headerStyle}>Mã số nhân viên</Typography></Grid>
                <Grid item xs={9}><Typography >100001</Typography></Grid>

              </Grid>
            </Grid>
          </Grid>
          <Grid container >
            <Grid item xs={24} sx={{ py: '8px', border: '4px' }}>
              <Grid container spacing={2}>
                <Grid item xs={3}><Typography sx={headerStyle}>Tên nhân viên</Typography></Grid>
                <Grid item xs={9}><Typography >Nguyễn Hồng Ngọc</Typography></Grid>

              </Grid>
            </Grid>
          </Grid>
          <Grid container >
            <Grid item xs={24} sx={{ py: '8px', border: '4px' }}>
              <Grid container spacing={2}>
                <Grid item xs={3}><Typography sx={headerStyle}>Loại đơn</Typography></Grid>
                <Grid item xs={9}><Typography >Thay đổi thông tin liên lạc</Typography></Grid>

              </Grid>
            </Grid>
          </Grid>
          <Grid container >
            <Grid item xs={24} sx={{ py: '8px', border: '4px' }}>
              <Grid container spacing={2}>
                <Grid item xs={3}><Typography sx={headerStyle}>Nội dung đơn</Typography></Grid>
                <Grid item xs={9}><TextField  fullWidth label="Nhập nội dung" id="fullWidth" variant="outlined" size= 'medium' /></Grid>

              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
            <Grid container spacing={2}>
              <Grid item xs={3}><Typography sx={headerStyle}>Trạng thái</Typography></Grid>
              <Grid item xs={5}><Grid item xs={5}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="demo-simple-select-label">Chọn</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Chọn"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Chờ duyệt</MenuItem>
                    <MenuItem value={20}>Chấp nhận</MenuItem>
                    <MenuItem value={30}>Từ chối</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container >
            <Grid item xs={24} sx={{ py: '8px', border: '4px' }}>
              <Grid container spacing={2}>
                <Grid item xs={3}><Typography sx={headerStyle}>Ngày gửi đơn</Typography></Grid>
                <Grid item xs={9}><Typography >17/06/2023</Typography></Grid>

              </Grid>
            </Grid>
          </Grid>
          <Grid container >
            <Grid item xs={24} sx={{ py: '8px', border: '4px' }}>
              <Grid container spacing={2}>
                <Grid item xs={3}><Typography sx={headerStyle}>Phản hồi</Typography></Grid>
                <Grid item xs={9}><TextField fullWidth label="Nhập" id="fullWidth" variant="outlined" /></Grid>

              </Grid>
            </Grid>
          </Grid>
          <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleClose} variant="outlined" >Hủy</Button>
            <Button onClick={handleClose} variant="contained" >Xác nhận</Button>
          </Container>
        </Container>
      </Container>
    </>
  );
}

export default EditOtherType;
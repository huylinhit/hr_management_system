
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { departmentSelectors, fetchDepartmentsAsync } from './departmentSlice';
import { useEffect } from 'react';
import { Button, Container, Grid, IconButton, InputAdornment, LinearProgress, TextField, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "./DepartmentList.css"
import { GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid-pro';
import { red } from '@mui/material/colors';
import { AccountCircle } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const columns: GridColDef[] = [
  { 
    field: 'id', 
    headerName: 'ID', 
    flex: 0.5,
  },
  {
    field: 'departmentName',
    headerName: 'Tên Phòng Ban',
    flex: 1,
    editable: true,
    headerClassName: 'custom-header-text',
  },
  {
    field: 'manager',
    headerName: 'Quản Lý',
    flex: 1,
    editable: true,
  },
  {
    field: 'numberOfStaff',
    headerName: 'Số Nhân Viên',
    flex: 1,
    editable: true,
  },
  {
    field: 'managerMail',
    headerName: 'Email',
    flex: 1,
    editable: true,
  },
  {
    field: 'managerPhone',
    headerName: 'Số Điện Thoại',
    flex: 1,
    editable: true,
  },
  {
    field: 'button',
    headerName: '',
    flex: 0.5,
    renderCell: (params) => (
      <IconButton onClick={() => handleButtonClick(params.row.id)}>
        <MoreHorizIcon />
      </IconButton>
    ),
  },
];
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
export default function DepartmentList() {
    const departments = useAppSelector(departmentSelectors.selectAll);
    const dispatch = useAppDispatch();
    const {departmentsLoaded, staffsLoaded, filtersLoaded} = useAppSelector(state => state.department);

    useEffect(() => {
        if(!departmentsLoaded) dispatch(fetchDepartmentsAsync());
    }, [dispatch, departmentsLoaded])

    return (
      <Container maxWidth="xl">
        <Typography sx={{fontSize: 30, fontWeight: 'bold',margin: '0 auto', color:'#333333', marginBottom: '2%'}}>Danh sách phòng ban</Typography>
        <Grid container justifyContent={'space-between'}>
          <TextField  
            id="standard-basic" 
            label="Search" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard" 
          />
           
          <Button 
            variant="text" 
            sx={{fontWeight:'bold', textTransform:'none', color:'#007FFF'}} 
            disableElevation={true}
            startIcon={<AddIcon />}
          >
              Thêm phòng ban
          </Button>
           
           
        </Grid>
         

        <Box sx={{ height: 400, width: '100%', margin: '0 auto' ,marginTop: '1%'}}>
          <DataGrid
            sx={{
              '.MuiDataGrid-columnHeaderTitle': { 
                fontWeight: 'bold !important',
                overflow: 'visible !important',
                color: '#007FFF',
              },
              '.MuiDataGrid-columnHeaders': { 
                backgroundColor: '#E0F0FF'
              }
            }}
            slots={{
              loadingOverlay: LinearProgress,
              toolbar: CustomToolbar,
            }}
            loading = {!departmentsLoaded}
              rows={departments}
              columns={columns}
              classes={{
                columnHeader:'custom-header'
              }}
              initialState={{
              pagination: {
                  paginationModel: {
                  pageSize: 5,
                  },
              },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              autoHeight
          />
        </Box>
      </Container>
         
    );
}

const handleButtonClick = (id: any) => {
    // Handle button click for the corresponding row ID
    console.log(`Button clicked for ID ${id}`);
  };

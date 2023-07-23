import { Box, Pagination, Typography } from "@mui/material";
import { MetaData } from "../../models/pagination";

interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
}

function AppPagination({ metaData, onPageChange }: Props) {
    const { currentPage, totalCount, totalPages, pageSize } = metaData;

    return (
        <Box display="flex" justifyContent="end" flexDirection="column" alignItems="end" >
            <Typography>
                Đang xem {(currentPage - 1) * pageSize + 1} -
                {currentPage * pageSize > totalCount
                    ? totalCount
                    : currentPage * pageSize} trên {totalCount} danh mục
            </Typography>
            <Box>
                <Pagination
                    // color="secondary"
                    // size="large"
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, page) => onPageChange(page)}
                />
            </Box>
        </Box>
    );
}

export default AppPagination;
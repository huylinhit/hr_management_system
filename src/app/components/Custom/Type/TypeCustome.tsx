import { Box, Typography } from '@mui/material';
import styles from './TypeCustome.module.scss'

interface Props {
    typeId: number,
    children: React.ReactNode
}
const colors = [
    "#34BBE1",
    "#CC941A",
    "#32A772",
    "#5945B5",
    "#DB3535",
    "#FF8C00",
    "#008080",
    "#800080",
    "#FF69B4",
    "#008000",
    "#FF0000",
    "#0000FF",
    "#800000",
    "#FF00FF",
    "#00FFFF",
    "#FFD700",
];

function TypeCustome({ typeId, children }: Props) {
    const rowIndex = typeId % colors.length;
    const dotColor = colors[rowIndex];

    return (
        <Box display={"flex"} alignItems={"center"}>
            <span style={{ marginRight: 10, fontSize: "15px", color: `${dotColor}`}}>●</span>
            <Typography sx={{
                textDecoration: "underline", 
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "Mulish",
                color: "#1C2A35",
            }}>
                {children}
            </Typography>
        </Box>
    );
}

export default TypeCustome;
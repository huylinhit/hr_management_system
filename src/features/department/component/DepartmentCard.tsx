import { Button, Card, CardActions, CardContent, CardHeader } from "@mui/material";

export default function DepartmentCard () {
    return (
        <Card sx={{}}>
            <CardHeader title="Title"/>
            <CardContent>
                Content of Card
                </CardContent>
            <CardActions>
            <Button size="small">Add to cart</Button>
            </CardActions>
        </Card>
    )
}
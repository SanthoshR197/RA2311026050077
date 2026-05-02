import { Card, CardContent, Typography } from "@mui/material";

type Props = {
item: any;
onClick: () => void;
};

function NotificationCard({ item, onClick }: Props) {
const getColor = () => {
if (item.Type === "Placement") return "red";
if (item.Type === "Result") return "orange";
if (item.Type === "Event") return "blue";
return "black";
};

return (
<Card
onClick={onClick}
sx={{
marginBottom: 2,
backgroundColor: item.r ? "#eee" : "#cce5ff",
cursor: "pointer"
}}
> <CardContent> <Typography variant="h6">{item.Message}</Typography>
<Typography sx={{ color: getColor() }}>
{item.Type} </Typography> <Typography>{item.r ? "read" : "new"}</Typography> </CardContent> </Card>
);
}

export default NotificationCard;

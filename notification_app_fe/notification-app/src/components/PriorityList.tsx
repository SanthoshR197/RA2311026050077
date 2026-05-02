import { Typography, Card, CardContent } from "@mui/material";

type Props = {
data: any[];
};

function PriorityList({ data }: Props) {
const top = [...data]
.sort((a, b) => {
if (b.p === a.p) {
return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
}
return b.p - a.p;
})
.slice(0, 3);

return ( <div> <Typography variant="h5">Top Notifications</Typography>


  {top.map((i) => (
    <Card key={i.ID} sx={{ marginTop: 1 }}>
      <CardContent>
        <Typography>{i.Message}</Typography>
        <Typography>{i.Type}</Typography>
      </CardContent>
    </Card>
  ))}
</div>


);
}

export default PriorityList;

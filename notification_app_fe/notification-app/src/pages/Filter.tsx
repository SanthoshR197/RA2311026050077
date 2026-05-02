import { useState } from "react";
import { Container, Typography, Select, MenuItem } from "@mui/material";

type Props = {
data: any[];
};

function Filter({ data }: Props) {
const [t, setT] = useState("");

const list = data.filter((i) =>
t ? i.Type === t : true
);

return ( <Container> <Typography variant="h4">Filter</Typography>


  <Select
    value={t}
    onChange={(e) => setT(e.target.value)}
    sx={{ marginTop: 2, marginBottom: 2 }}
  >
    <MenuItem value="">All</MenuItem>
    <MenuItem value="Placement">Placement</MenuItem>
    <MenuItem value="Result">Result</MenuItem>
    <MenuItem value="Event">Event</MenuItem>
  </Select>

  {list.map((i) => (
    <Typography key={i.ID}>{i.Message}</Typography>
  ))}
</Container>


);
}

export default Filter;

import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import { Button, Select, MenuItem, Card, CardContent, Typography } from "@mui/material";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  const handleClick = (id: string) => {
    setData(data.map((i) => i.ID === id ? { ...i, read: true } : i));
  };

  const filtered = filter === "All"
    ? data
    : data.filter((i) => i.Type === filter);

  return (
    <div style={{ padding: 20 }}>
      <h2>All Notifications</h2>

      <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Placement">Placement</MenuItem>
        <MenuItem value="Result">Result</MenuItem>
        <MenuItem value="Event">Event</MenuItem>
      </Select>

      {filtered.map((i) => (
        <Card key={i.ID} style={{ marginTop: 10, background: i.read ? "#eee" : "#fff" }}>
          <CardContent onClick={() => handleClick(i.ID)}>
            <Typography variant="h6">{i.Type}</Typography>
            <Typography>{i.Message}</Typography>
            <Typography variant="caption">{i.Timestamp}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
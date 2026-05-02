import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import { Card, CardContent, Typography } from "@mui/material";

export default function Priority() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData().then((d) => {
      const sorted = d.sort((a: any, b: any) => {
        if (b.p !== a.p) return b.p - a.p;
        return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
      });

      setData(sorted.slice(0, 5));
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Priority Notifications</h2>

      {data.map((i) => (
        <Card key={i.ID} style={{ marginTop: 10 }}>
          <CardContent>
            <Typography variant="h6">{i.Type}</Typography>
            <Typography>{i.Message}</Typography>
            <Typography variant="caption">{i.Timestamp}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
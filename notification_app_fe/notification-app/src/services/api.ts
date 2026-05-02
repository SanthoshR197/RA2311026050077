export const fetchData = async () => {
  const url = "http://localhost:5000/notifications";

  try {
    const r = await fetch(url);
    const res = await r.json();

    let d = [];

    if (Array.isArray(res)) {
      d = res;
    } else if (Array.isArray(res.notifications)) {
      d = res.notifications;
    } else {
      console.log("Unexpected API response:", res);
      return [];
    }

    const getPriority = (Type: string) => {
      if (Type === "Placement") return 3;
      if (Type === "Result") return 2;
      if (Type === "Event") return 1;
      return 0;
    };

    return d.map((i: any) => ({
      ID: i.ID,
      Message: i.Message,
      Type: i.Type,
      Timestamp: i.Timestamp,
      p: getPriority(i.Type),
      read: false
    }));

  } catch (err) {
    console.log("Fetch error:", err);
    return [];
  }
};
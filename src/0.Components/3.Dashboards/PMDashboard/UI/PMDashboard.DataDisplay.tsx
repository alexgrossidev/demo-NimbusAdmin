import { Grid } from "@mui/material";
import AGDataBox from "@/3.Theme/1.Molecules/AGDataBox";

export interface PMDashboardDataDisplayProps {
  data: {
    title: string;
    value: string;
    trend: {
      value: string;
      direction: "up" | "down" | "neutral";
    };
  }[];
  gridSize?: number;
  loading?: boolean;
  error?: string | null;
}

const PMDashboardDataDisplay = ({
  data,
  gridSize,
  loading,
  error,
}: PMDashboardDataDisplayProps) => (
  <Grid container spacing={2}>
    {loading ? (
      <Grid size={{ xs: 12 }}>
        <AGDataBox
          title="Caricamento dati..."
          value=""
          trend={{ value: "", direction: "neutral" }}
        />
      </Grid>
    ) : error ? (
      <Grid size={{ xs: 12 }}>
        <AGDataBox
          title="Errore"
          value={error || ""}
          trend={{ value: "", direction: "neutral" }}
        />
      </Grid>
    ) : (
      data.map((item, index) => (
        <Grid size={{ xs: 12, sm: 6, md: gridSize ?? 4 }} key={index}>
          <AGDataBox title={item.title} value={item.value} trend={item.trend} />
        </Grid>
      ))
    )}
  </Grid>
);

export default PMDashboardDataDisplay;

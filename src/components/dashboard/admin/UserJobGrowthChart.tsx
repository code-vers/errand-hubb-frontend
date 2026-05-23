import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const defaultData = [
  { month: "Jan", value: 820 },
  { month: "Feb", value: 880 },
  { month: "Mar", value: 1150 },
  { month: "Apr", value: 1050 },
  { month: "May", value: 1300 },
  { month: "Jun", value: 1550 },
];

const UserJobGrowthChart = ({
  data = defaultData,
  title = "User & Job Growth",
  subtitle = "Last 6 months",
}) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((d) => d.month),
        datasets: [
          {
            data: data.map((d) => d.value),
            backgroundColor: "#F4861A",
            borderRadius: 4,
            borderSkipped: false,
            barThickness: 36,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.parsed.y}`,
            },
          },
        },
        scales: {
          x: {
            display: true,
            grid: { display: false },
            border: { display: false },
            ticks: {
              color: "#aaaaaa",
              font: { size: 12 },
            },
          },
          y: {
            display: true,
            min: 0,
            max: 1600,
            grid: {
              color: "rgba(0,0,0,0.05)",
            },
            border: { display: false, dash: [4, 4] },
            ticks: {
              color: "#aaaaaa",
              font: { size: 12 },
              stepSize: 400,
              callback: (val) => val,
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{}}>
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "28px 32px 20px 28px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          width: "100%",
          boxSizing: "border-box",
        }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#111111",
              margin: 0,
            }}>
            {title}
          </h2>
          <span style={{ fontSize: "14px", color: "#999999" }}>{subtitle}</span>
        </div>

        {/* Chart */}
        <div style={{ position: "relative", height: "220px" }}>
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default UserJobGrowthChart;

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const defaultData = [
  { day: "Mon", value: 150 },
  { day: "Tue", value: 210 },
  { day: "Wed", value: 180 },
  { day: "Thu", value: 245 },
  { day: "Fri", value: 330 },
  { day: "Sat", value: 310 },
  { day: "Sun", value: 210 },
];

const WeeklyErrandActivity = ({
  data = defaultData,
  title = "Weekly Errand Activity",
  subtitle = "This week",
}) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, "rgba(244, 134, 26, 0.20)");
    gradient.addColorStop(1, "rgba(244, 134, 26, 0.00)");

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((d) => d.day),
        datasets: [
          {
            data: data.map((d) => d.value),
            borderColor: "#F4861A",
            borderWidth: 2.5,
            pointBackgroundColor: "#F4861A",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true,
            backgroundColor: gradient,
            tension: 0.4,
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
            display: false,
            grid: { display: false },
          },
          y: {
            display: false,
            min: 0,
            max: 400,
            grid: {
              display: true,
              color: "rgba(0,0,0,0.05)",
            },
            border: { display: false },
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

  const yLabels = [320, 240, 160, 80, 0];

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

        {/* Chart area */}
        <div style={{ display: "flex", gap: "0" }}>
          {/* Y-axis labels */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingBottom: "28px",
              marginRight: "12px",
              textAlign: "right",
              minWidth: "32px",
            }}>
            {yLabels.map((label) => (
              <span
                key={label}
                style={{ fontSize: "12px", color: "#aaaaaa", lineHeight: 1 }}>
                {label}
              </span>
            ))}
          </div>

          {/* Canvas + X labels */}
          <div style={{ flex: 1 }}>
            <div style={{ position: "relative", height: "180px" }}>
              <canvas ref={canvasRef} />
            </div>
            {/* X-axis labels */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
              }}>
              {data.map((item) => (
                <span
                  key={item.day}
                  style={{ fontSize: "12px", color: "#aaaaaa" }}>
                  {item.day}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyErrandActivity;

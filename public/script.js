const ctx = document.getElementById("windChart").getContext("2d");
let windChart;

async function loadData() {
  const lat = document.getElementById("lat").value;
  const lon = document.getElementById("lon").value;
  const model = document.getElementById("model").value;

  const res = await fetch(`/api/wind?lat=${lat}&lon=${lon}&model=${model}`);
  const data = await res.json();

  const times = data.hourly.time;
  const wind = data.hourly.wind_speed_10m;
  const gusts = data.hourly.wind_gusts_10m;

  if (windChart) windChart.destroy();

  windChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: times,
      datasets: [
        {
          label: `Wind Speed (mph) - ${model}`,
          data: wind,
          borderColor: "cyan",
          tension: 0.3
        },
        {
          label: `Wind Gusts (mph) - ${model}`,
          data: gusts,
          borderColor: "orange",
          borderDash: [5, 5],
          tension: 0.3
        }
      ]
    },
    options: {
      scales: {
        x: { title: { display: true, text: "Time" } },
        y: { title: { display: true, text: "Wind (mph)" } }
      },
      plugins: {
        legend: { position: "top" },
        title: {
          display: true,
          text: `10m Wind Forecast (${model})`
        }
      }
    }
  });
}

document.getElementById("load").addEventListener("click", loadData);

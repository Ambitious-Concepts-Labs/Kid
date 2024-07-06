export const lineOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
				text: "Chart.js Line Chart",
			},
		},
		scales: {
			x: {
				display: true,
				grid: {
					display: false,
				},
				border: {
					display: false,
				},
			},
			y: {
				display: true,
				grid: {},
				border: {
					display: false,
					dash: [2, 4],
				},
				ticks: {
					callback: function (value) {
						return "$" + value.toFixed(0);
					},
					maxTicksLimit: 6,
				},
			},
		},
		elements: {
			point: {
				radius: 0,
			},
		},
	};

export const studentLineOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
				text: "Chart.js Line Chart",
			},
		},
		scales: {
			x: {
				display: true,
				grid: {
					display: false,
				},
				border: {
					display: false,
				},
			},
			y: {
				display: true,
				grid: {},
				border: {
					display: false,
					dash: [2, 4],
				},
				ticks: {
					callback: function (value) {
						return value.toFixed(0);
					},
					maxTicksLimit: 6,
				},
			},
		},
		elements: {
			point: {
				radius: 0,
			},
		},
	};

export function studentDoughnutData(coures) {
	const userCoures = coures.map(course => course.course)
	return {
		labels: userCoures,
		datasets: [
			{
				label: "# of Votes",
				data: Array.from({ length: userCoures.length }, () => 1),
				backgroundColor: ["#109CF1", "#F38315", "#C33B4C"],
				borderWidth: 0,
			},
		],
	}
};

export const doughnutOptions = {
		cutout: 100,
		plugins: {
			legend: {
				position: "bottom",
				labels: {
					usePointStyle: true,
				},
			},
		},
	};

export const barOptions = {
		maintainAspectRatio: false,
		responsive: true,
		barPercentage: 0.5,
		categoryPercentage: 0.4,
		scales: {
			x: {
				display: true,
				grid: {
					display: false,
				},
				border: {
					display: false,
				},
			},
			y: {
				display: true,
				grid: {},
				border: {
					display: false,
					dash: [2, 4],
				},
				beginAtZero: true,
			},
		},
		plugins: {
			legend: {
				position: "bottom",
				labels: {
					usePointStyle: true,
				},
			},
		},
	};

export const studentBarData = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
		datasets: [
			{
				label: "Assements",
				data: [10, 10, 8, 7, 6, 5, 7, 8, 9, 10, 10, 10],
				backgroundColor: "#C33B4C",
				borderWidth: 0,
				borderRadius: 10,
			},
			{
				label: "Courses Taken",
				data: [10, 9, 7, 8, 8, 6, 6, 8, 9, 8, 10, 6],
				backgroundColor: "#F38315",
				borderWidth: 0,
				borderRadius: 10,
			},
			{
				label: "Tutoring Sessions",
				data: [0, 1, 1, 3, 0, 2, 0, 2, 1, 0, 2, 0],
				backgroundColor: "#3D5EE1",
				borderWidth: 0,
				borderRadius: 10,
			},
		],
	};

export const lineData = {
		labels: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		datasets: [
			{
				fill: false,
				lineTension: 0.5,
				data: [
					1500, 2000, 1100, 2500, 2000, 3500, 3000, 4500, 4000, 5500, 5000,
					4000,
				],
				borderColor: "#F38315",
				backgroundColor: "rgba(255, 255, 255, 1)",
				borderWidth: 2,
			},
			{
				fill: false,
				lineTension: 0.5,
				data: [
					7500, 5000, 4100, 5500, 5000, 6500, 6000, 7500, 7000, 8500, 8000,
					8000,
				],
				borderColor: "#C33B4C",
				backgroundColor: "rgba(255, 255, 255, 1)",
				borderWidth: 2,
			},
		],
	};

export const doughnutData = {
		labels: ["Total Female Students: 2", "Total Male Students: 1"],
		datasets: [
			{
				label: "# of Votes",
				data: [1.5, 0.5],
				backgroundColor: ["#109CF1", "#F38315", "#C33B4C"],
				borderWidth: 0,
			},
		],
	};

export const barData = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
		datasets: [
			{
				label: "Revenue",
				data: [1200, 1000, 800, 700, 600, 500, 700, 800],
				backgroundColor: "#C33B4C",
				borderWidth: 0,
				borderRadius: 10,
			},
			{
				label: "Course Stats",
				data: [1100, 900, 700, 600, 500, 400, 600, 700],
				backgroundColor: "#F38315",
				borderWidth: 0,
				borderRadius: 10,
			},
			{
				label: "New Signups",
				data: [0, 0, 0, 0, 0, 0, 0, 0],
				backgroundColor: "#3D5EE1",
				borderWidth: 0,
				borderRadius: 10,
			},
		],
	};
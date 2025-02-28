"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodeplotlib_1 = require("nodeplotlib");
var labels = ["Apple", "Banana", "Cherry", "Grape", "Orange"];
var values = [10, 20, 15, 30, 25];
var colors = ["#FF0000", "#FFD700", "#FF1493", "#6A0DAD", "#FFA500"];
var data = [
    {
        labels: labels,
        values: values,
        type: "pie",
        marker: { colors: colors },
        textinfo: "label+percent",
    },
];
// Chart Layout
var layout = {
    title: "Customized Fruit Pie Chart 🍎",
    showlegend: true,
};
// Plot the Pie Chart
(0, nodeplotlib_1.plot)(data, layout);

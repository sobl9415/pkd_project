"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plotChart = plotChart;
var nodeplotlib_1 = require("nodeplotlib");
var currentData = [];
// gör en funktion och importa
function plotChart(budget) {
    var labels = [];
    var values = [];
    labels.push("Savings", "Rent");
    values.push(budget.savings, budget.rent);
    for (var i = 0; i < budget.categories.length; i = i + 1) {
        labels.push(budget.categories[i].name);
        values.push(budget.categories[i].amount);
    }
    var colors = ["#FF0000", "#FFD700", "#FF1493", "#6A0DAD",
        "#FFA500", "#800080", "#A52A2A", "#00FF00",
        "#0000FF", "#00FFFF", "#000000", "#A52A2A"];
    currentData = [
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
        title: "Here is your budget displayed",
        showlegend: true,
    };
    // Plot the Pie Chart
    (0, nodeplotlib_1.plot)(currentData, layout);
}

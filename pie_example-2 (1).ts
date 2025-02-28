import { plot, Plot, Layout } from 'nodeplotlib';
import { UserBudget } from "./main"; // Anpassa sökvägen om det behövs

let currentData: Partial<Plot>[] = [];
// gör en funktion och importa
export function plotChart(budget: UserBudget) {
    const labels: string[] = [];
    const values: number[] = []; 

    labels.push("Savings", "Rent");
    values.push(budget.savings, budget.rent);

    for (let i = 0; i < budget.categories.length; i = i + 1) {
        labels.push(budget.categories[i].name)
        values.push(budget.categories[i].amount)
    }
    
    const colors: string[] = ["#FF0000", "#FFD700", "#FF1493", "#6A0DAD",
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
    const layout: Partial<Layout> = {
        title: "Here is your budget displayed",
        showlegend: true,
    };

    // Plot the Pie Chart
    plot(currentData, layout);
}

import { plot, Plot, Layout } from 'nodeplotlib';

// gör en funktion och importa
export function plotChart(budget: Array<number>) {
    const labels: string[] = [];
    const values: number[] = []; // hämta från main procent

    labels.push("Savings", "Rent");
    values.push(budget.savings, budget.rent);

    for (let i = 0; i < budget.categories.length; i = i + 1) {
        labels.push(budget.categories[i].name)
        values.push(budget.categories[i].amount)
    }


    const colors: string[] = ["#FF0000", "#FFD700", "#FF1493", "#6A0DAD", "#FFA500"];

    const data: Partial<Plot>[] = [
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
        title: "Din mamma",
        showlegend: true,
    };

    // Plot the Pie Chart
    plot(data, layout);

}

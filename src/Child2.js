import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.drawBarChart();
  }

  componentDidUpdate() {
    this.drawBarChart();
  }

  drawBarChart() {
    var data = this.props.data2;

    const groupedData = Array.from(
      d3.rollup(
        data,
        (v) => d3.mean(v, (d) => d.tip),
        (d) => d.day
      ),
      ([key, value]) => ({ key, value })
    );

    var margin = { top: 30, right: 30, bottom: 50, left: 50 },
      w = 700 - margin.left - margin.right,
      h = 350 - margin.top - margin.bottom;

    d3.select(".child2_svg").selectAll("*").remove();

    var svg = d3
      .select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var x = d3
      .scaleBand()
      .domain(groupedData.map((d) => d.key))
      .range([0, w])
      .padding(0.1);

    svg
      .append("g")
      .attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(x))
      .append("text")
      .attr("x", w / 2)
      .attr("y", 40)
      .attr("fill", "black")
      .text("Day")
      .style("text-anchor", "middle");

    var y = d3
      .scaleLinear()
      .domain([0, d3.max(groupedData, (d) => d.value)])
      .range([h, 0]);

    svg
      .append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -h / 2)
      .attr("y", -40)
      .attr("fill", "black")
      .text("Average Tip")
      .style("text-anchor", "middle");

    svg
      .selectAll("rect")
      .data(groupedData)
      .join("rect")
      .attr("x", (d) => x(d.key))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => h - y(d.value))
      .attr("fill", "#69b3a2");

    svg
      .append("text")
      .attr("x", w / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Average Tip by Day");
  }

  render() {
    return <svg className="child2_svg"></svg>;
  }
}

export default Child2;

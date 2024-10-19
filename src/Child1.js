import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.drawScatterPlot();
  }

  componentDidUpdate() {
    this.drawScatterPlot();
  }

  drawScatterPlot() {
    var data = this.props.data1;

    var margin = { top: 30, right: 30, bottom: 50, left: 50 },
      w = 700 - margin.left - margin.right,
      h = 350 - margin.top - margin.bottom;

    d3.select(".child1_svg").selectAll("*").remove();

    var svg = d3
      .select(".child1_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.total_bill)])
      .range([0, w]);

    svg
      .append("g")
      .attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(x))
      .append("text")
      .attr("x", w / 2)
      .attr("y", 40)
      .attr("fill", "black")
      .text("Total Bill")
      .style("text-anchor", "middle");

    var y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.tip)])
      .range([h, 0]);

    svg
      .append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -h / 2)
      .attr("y", -40)
      .attr("fill", "black")
      .text("Tips")
      .style("text-anchor", "middle");

    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d.total_bill))
      .attr("cy", (d) => y(d.tip))
      .attr("r", 3)
      .style("fill", "#69b3a2");

    svg
      .append("text")
      .attr("x", w / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Total Bill vs Tips");
  }

  render() {
    return <svg className="child1_svg"></svg>;
  }
}

export default Child1;

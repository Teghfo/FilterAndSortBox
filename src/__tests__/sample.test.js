import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../containers/App";

const waiting = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(), 30);
  });

Enzyme.configure({
  adapter: new Adapter()
});

const setup = () => mount(<App />);

let wrapper;
let table;
let tableBody;
let tableBodyRow;

describe("sample test complex table", () => {
  beforeEach(() => {
    wrapper = setup();
    table = wrapper.find("#players-table");
    tableBody = table.find("tbody");
    tableBodyRow = tableBody.find("tr");
  });

  test("sample_test_initial_row_item", () => {
    const cells = tableBodyRow.at(0).find("td");
    expect(cells.at(2).text()).toEqual("32");
  });

  test("sample_test_buttons_className_1", () => {
    let sortBoxBtn = wrapper.find("#sort-btn-age");
    expect(sortBoxBtn.hasClass("btn-outline-primary")).toEqual(true);
  });

  test("sample_test_buttons_className_2", () => {
    let ageSortButton = wrapper.find("#sort-btn-age");
    expect(ageSortButton.hasClass("btn-outline-primary")).toEqual(true);
    ageSortButton.simulate("click");
    let ageSortButton_RD = wrapper.find("#sort-btn-age");
    expect(ageSortButton_RD.hasClass("btn-success")).toEqual(true);
  });

  test("sample_test_data_changes_when_sort_button_clicked", async () => {
    let btn = wrapper.find("#sort-btn-value");
    btn.simulate("click");
    btn.simulate("click");
    table = wrapper.find("#players-table");
    tableBodyRow = table.find("tbody").find("tr");
    const tr = tableBodyRow.at(0);
    const cells = tr.find("td");
    await waiting();
    expect(cells.at(1).text()).toEqual("Pepe");
  });

  test("sample_test_filter_selected", async () => {
    let checkbox_1 = wrapper.find("#nationality-France");
    checkbox_1.simulate("change", {
      target: { checked: true, id: "nationality-France" }
    });
    let checkbox_2 = wrapper.find("#club-Juventus");
    checkbox_2.simulate("change", {
      target: { checked: true, id: "club-Juventus" }
    });
    table = wrapper.find("#players-table");
    tableBodyRow = table.find("tbody").find("tr");
    const cells = tableBodyRow.at(0).find("td");
    await expect(cells.at(1).text()).toEqual("B. Matuidi");
  });

  test("sample_test_filter_and_sort_selected", async () => {
    let checkbox_1 = wrapper.find("#club-Napoli");
    checkbox_1.simulate("change", {
      target: { checked: true, id: "club-Napoli" }
    });
    let btn = wrapper.find(`#sort-btn-value`);
    btn.simulate("click");
    table = wrapper.find("#players-table");
    tableBodyRow = table.find("tbody").find("tr");
    const cells = tableBodyRow.at(0).find("td");
    await waiting();
    expect(cells.at(1).text()).toEqual("K. Koulibaly");
    expect(cells.at(1).text()).toEqual("K. Koulibaly");
  });

  test("sample_test_collapse", () => {
    let clubCollapseBtn = wrapper.find("#btn-club-collapse");
    expect(
      clubCollapseBtn
        .closest(".card")
        .find(".collapse")
        .hasClass("show")
    ).toEqual(false);
  });
});

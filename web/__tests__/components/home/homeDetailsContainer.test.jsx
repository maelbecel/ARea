import React from "react";
import { createRoot } from 'react'
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";
import HomeDetailsContainer from "../../../components/HomePage/Container/HomeDetailsContainer.tsx";

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders with or without a name", () => {
    act(() => {
        render(<HomeDetailsContainer />, container)
    });
    expect(container.textContent).toBe("There are unlimited ways to save timeCross post to multiple social networksSave time by writing once and posting to multiple networks automatically.");
});

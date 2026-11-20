/**
 * @jest-environment jsdom
 */
const { addColor } = require("../../js/code.js");

describe("addColor", () => {
  let xhr;

  beforeEach(() => {
    document.body.innerHTML = `
      <input id="colorText" value="Blue">
      <span id="colorAddResult">Previous message</span>
    `;

    xhr = {
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      send: jest.fn(),
      readyState: 0,
      status: 0,
      onreadystatechange: null
    };

    jest.spyOn(window, "XMLHttpRequest").mockImplementation(function () {
      return xhr;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("sends the color and current user ID to AddColor.php", () => {
    addColor();

    expect(xhr.open).toHaveBeenCalledWith("POST", "LAMPAPI/AddColor.php", true);
    expect(xhr.setRequestHeader).toHaveBeenCalledWith(
      "Content-type",
      "application/json; charset=UTF-8"
    );
    expect(xhr.send).toHaveBeenCalledTimes(1);

    const payload = JSON.parse(xhr.send.mock.calls[0][0]);
    expect(payload).toEqual({ color: "Blue", userId: 0 });
    expect(document.getElementById("colorAddResult").textContent).toBe("");
  });

  test("displays a success message after an HTTP 200 response", () => {
    addColor();

    xhr.readyState = 4;
    xhr.status = 200;
    xhr.onreadystatechange();

    expect(document.getElementById("colorAddResult").textContent).toBe(
      "Color has been added"
    );
  });

  test("displays the error when sending the request throws", () => {
    xhr.send.mockImplementation(() => {
      throw new Error("Request failed");
    });

    addColor();

    expect(document.getElementById("colorAddResult").textContent).toBe(
      "Request failed"
    );
  });
});
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { shallowMount, mount, flushPromises } from "@vue/test-utils";
import App from "../../App.vue";
import axios from "axios";

// Mock the axios library
vi.mock("axios", () => {
    return {
      default: {
        get: vi.fn(),
      },
    };
  });

describe("Implementation Test for App.vue with Successful HTTP GET", () => {
  let wrapper = null;

  beforeEach(() => {
    const responseGet = {
      small: {
        highest: {
          availableLot: 10,
          parkNumber: 'HPN',
          lotType: 'A',
        },
        lowest: {
          availableLot: 6,
          parkNumber: 'LPN',
          lotType: 'C',
        },
      },
    };

    // Set the mock call to GET to return a successful GET response
    axios.get.mockResolvedValue(responseGet);

    // render the component
    wrapper = shallowMount(App);
  });

  afterEach(() => {
    axios.get.mockReset();
    wrapper.unmount();
  });
});

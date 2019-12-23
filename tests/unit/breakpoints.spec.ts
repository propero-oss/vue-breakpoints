import { VueBreakpoints } from "../../src/main";
import { shallowMount } from "@vue/test-utils";
import Vue from "vue";

Vue.use(VueBreakpoints);
const TestComponent = Vue.extend({
  template: `<div>
  <span id="current">{{$break.currentPoint}}</span>
  
  <span v-if="$break.above('xs')">above-xs</span>
  <span v-if="$break.above('s')">above-s</span>
  <span v-if="$break.above('m')">above-m</span>
  <span v-if="$break.above('l')">above-l</span>
  <span v-if="$break.above('xl')">above-xl</span>
  
  <span v-if="$break.below('xs')">below-xs</span>
  <span v-if="$break.below('s')">below-s</span>
  <span v-if="$break.below('m')">below-m</span>
  <span v-if="$break.below('l')">below-l</span>
  <span v-if="$break.below('xl')">below-xl</span>
  
  <span v-if="$break.aboveOr('xs')">aboveOr-xs</span>
  <span v-if="$break.aboveOr('s')">aboveOr-s</span>
  <span v-if="$break.aboveOr('m')">aboveOr-m</span>
  <span v-if="$break.aboveOr('l')">aboveOr-l</span>
  <span v-if="$break.aboveOr('xl')">aboveOr-xl</span>
  
  <span v-if="$break.belowOr('xs')">belowOr-xs</span>
  <span v-if="$break.belowOr('s')">belowOr-s</span>
  <span v-if="$break.belowOr('m')">belowOr-m</span>
  <span v-if="$break.belowOr('l')">belowOr-l</span>
  <span v-if="$break.belowOr('xl')">belowOr-xl</span>
</div>`
});

const width = (size: number) => {
  (window as any).innerWidth = size;
  window.dispatchEvent(new Event("resize"));
};

describe("breakpoints.ts", () => {
  const wrapper = shallowMount(TestComponent);
  const matching = (size: number, prefix: string) => {
    width(size);
    return "xs,s,m,l,xl"
      .split(",")
      .filter(it => wrapper.text().includes(prefix + it))
      .join(",");
  };
  const current = (size: number) => {
    width(size);
    return wrapper.element.querySelector("#current")!.textContent!;
  };

  it("shows the correct current point", () => {
    // xs480 s736 m980 l1280 xl1690
    expect(current(479)).toMatch("xs");
    expect(current(480)).toMatch("s");
    expect(current(736)).toMatch("m");
    expect(current(980)).toMatch("l");
    expect(current(1280)).toMatch("xl");
    expect(current(1690)).toMatch("xl");
  });

  it("displays elements above thresholds", () => {
    // xs480 s736 m980 l1280 xl1690
    expect(matching(479, "above-")).toEqual("");
    expect(matching(480, "above-")).toEqual("xs");
    expect(matching(736, "above-")).toEqual("xs,s");
    expect(matching(980, "above-")).toEqual("xs,s,m");
    expect(matching(1280, "above-")).toEqual("xs,s,m,l");
    expect(matching(1690, "above-")).toEqual("xs,s,m,l");
  });

  it("displays elements below thresholds", () => {
    // xs480 s736 m980 l1280 xl1690
    expect(matching(479, "below-")).toEqual("s,m,l,xl");
    expect(matching(480, "below-")).toEqual("m,l,xl");
    expect(matching(736, "below-")).toEqual("l,xl");
    expect(matching(980, "below-")).toEqual("xl");
    expect(matching(1280, "below-")).toEqual("");
    expect(matching(1690, "below-")).toEqual("");
  });

  it("displays elements above or at thresholds", () => {
    // xs480 s736 m980 l1280 xl1690
    expect(matching(479, "aboveOr-")).toEqual("xs");
    expect(matching(480, "aboveOr-")).toEqual("xs,s");
    expect(matching(736, "aboveOr-")).toEqual("xs,s,m");
    expect(matching(980, "aboveOr-")).toEqual("xs,s,m,l");
    expect(matching(1280, "aboveOr-")).toEqual("xs,s,m,l,xl");
    expect(matching(1690, "aboveOr-")).toEqual("xs,s,m,l,xl");
  });

  it("displays elements below or at thresholds", () => {
    // xs480 s736 m980 l1280 xl1690
    expect(matching(479, "belowOr-")).toEqual("xs,s,m,l,xl");
    expect(matching(480, "belowOr-")).toEqual("s,m,l,xl");
    expect(matching(736, "belowOr-")).toEqual("m,l,xl");
    expect(matching(980, "belowOr-")).toEqual("l,xl");
    expect(matching(1280, "belowOr-")).toEqual("xl");
    expect(matching(1690, "belowOr-")).toEqual("xl");
  });
});

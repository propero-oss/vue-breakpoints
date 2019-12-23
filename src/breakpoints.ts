import {
  BProp,
  Component,
  OnWindow,
  SProp
} from "@propero/vue-extra-decorators";
import Vue from "vue";
import { Watch } from "vue-property-decorator";

@Component({ data: () => ({ innerWidth: window.innerWidth }) })
export class Breakpoints extends Vue {
  @SProp({ default: "xs480 s736 m980 l1280 xl1690" }) breakpoints!: string;
  @BProp({ default: false }) addCssClasses!: boolean;
  public innerWidth!: number;

  public get breakpointsMap(): Record<string, number> {
    return Object.fromEntries(
      this.breakpoints
        .split(" ")
        .map(def => /([a-zA-Z]+)([0-9]+)/.exec(def)!)
        .filter(it => it)
        .map(([_, key, size]) => [key, +size])
    );
  }

  public get breakpointsArray(): [string, number][] {
    return this.breakpoints
      .split(" ")
      .map(def => /([a-zA-Z]+)([0-9]+)/.exec(def)!)
      .filter(it => it)
      .map(([_, key, size]) => [key, +size] as [string, number])
      .sort(([k1, value1], [k2, value2]) => value1 - value2);
  }

  public get breakpointsReverseMap(): Record<string, string> {
    return Object.fromEntries(
      Object.entries(this.breakpointsMap).map(it => it.reverse())
    );
  }

  public get current() {
    const { breakpointsArray: breakpoints, innerWidth } = this;
    const point = breakpoints.find(([_, value]) => value > innerWidth);
    return point != null ? point : breakpoints[breakpoints.length - 1];
  }

  public get currentSize() {
    return this.current[1];
  }

  public get currentPoint() {
    return this.current[0];
  }

  public above(point: string): boolean {
    return this.currentSize > this.breakpointsMap[point];
  }

  public aboveOr(point: string): boolean {
    return this.currentSize >= this.breakpointsMap[point];
  }

  public below(point: string): boolean {
    return this.currentSize < this.breakpointsMap[point];
  }

  public belowOr(point: string): boolean {
    return this.currentSize <= this.breakpointsMap[point];
  }

  public between(lower: string, upper: string) {
    return this.aboveOr(lower) && this.below(upper);
  }

  public outside(lower: string, upper: string) {
    return this.below(lower) && this.aboveOr(upper);
  }

  @OnWindow("resize")
  private onWindowResize() {
    if (this.innerWidth !== window.innerWidth)
      this.innerWidth = window.innerWidth;
  }

  @Watch("innerWidth", { immediate: true })
  private onInnerWidthChange() {
    if (!this.addCssClasses) return;
    const classes = document.body.classList;
    const breakClasses = classes.value
      .split(" ")
      .filter(it => /^breakpoint--/.test(it));
    const prev = breakClasses.find(name =>
      /^breakpoint--[a-zA-Z]+$/.test(name)
    );
    const newClasses = this.cssClasses;
    const [newer] = newClasses;
    if (prev === newer) return;
    classes.remove(...breakClasses);
    classes.add(...newClasses);
  }

  private get cssClasses() {
    const sizes = this.breakpointsArray;
    const [name, currentSize] = this.current;
    const classes: string[] = [name];
    for (let [name, size] of sizes)
      classes.push(size <= currentSize ? `above-${name}` : `below-${name}`);
    return classes.map(it => `breakpoint--${it}`);
  }
}

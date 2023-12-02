import { colord } from "colord";

export function getRgbOfColor(color: string) {
  return colord(color).toRgb();
}

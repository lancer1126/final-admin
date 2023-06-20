<template>
  <div class="fixed-center flex-col">
    <system-logo class="text-128px text-primary" />
    <div class="w-56px h-56px my-36px">
      <div class="relative h-full animate-spin">
        <div
          v-for="(item, index) in loadingClasses"
          :key="index"
          class="absolute w-16px h-16px bg-primary rounded-8px animate-pulse"
          :class="item"
        />
      </div>
    </div>
    <h2 class="text-28px font-500 text-#646464">{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">
import { getAppInfo } from "@/composables/system";
import { getRgbOfColor } from "@/utils/common/color";
import themeSettings from "@/settings/theme.json";

const { title } = getAppInfo();
const loadingClasses = [
  "left-0 top-o",
  "left-0 bottom-0 animate-delay-500",
  "right-0 top-0 animate-delay-1000",
  "right-0 bottom-0 animate-delay-1500"
];

function addThemeColorCssVars() {
  const defaultColor = themeSettings.themeColor;
  const { r, g, b } = getRgbOfColor(defaultColor);
  document.documentElement.style.cssText = `--primary-color: ${r},${g},${b}`;
}
addThemeColorCssVars();
</script>

<style scoped></style>

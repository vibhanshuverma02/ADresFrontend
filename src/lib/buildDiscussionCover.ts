// utils/coverBuilder.ts
export function buildDiscussionCover(title: string, tags: string[]) {
  const gradientColors = [
    ["#1A2980", "#26D0CE"],
    ["#7F00FF", "#E100FF"],
    ["#FF512F", "#F09819"],
    ["#4E54C8", "#8F94FB"],
    ["#11998E", "#38EF7D"],
  ];
  const rand = gradientColors[Math.floor(Math.random() * gradientColors.length)];

  const tag = tags?.[0] ?? "Forum";

  return `
    https://image.pollinations.ai/prompt/
    flat+minimal+discussion+cover+
    gradient+${encodeURIComponent(rand.join(","))}+
    title+${encodeURIComponent(title)}+
    tag+${encodeURIComponent(tag)}+
    centered+typography
  `;
}

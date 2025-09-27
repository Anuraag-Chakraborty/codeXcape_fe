// Drizzle effect utility component
export const createDrizzleEffect = () => {
  const drizzleContainer = document.createElement("div");
  drizzleContainer.style.position = "fixed";
  drizzleContainer.style.top = "0";
  drizzleContainer.style.left = "0";
  drizzleContainer.style.width = "100%";
  drizzleContainer.style.height = "100%";
  drizzleContainer.style.pointerEvents = "none";
  drizzleContainer.style.zIndex = "1000";
  document.body.appendChild(drizzleContainer);

  for (let i = 0; i < 20; i++) {
    const drop = document.createElement("div");
    drop.style.position = "absolute";
    drop.style.width = "2px";
    drop.style.height = "10px";
    drop.style.background =
      "linear-gradient(to bottom, hsl(180 100% 50%), transparent)";
    drop.style.left = Math.random() * 100 + "%";
    drop.style.top = "-10px";
    drop.style.animation = "drizzleFall 1s linear forwards";
    drop.style.animationDelay = Math.random() * 0.5 + "s";
    drizzleContainer.appendChild(drop);
  }

  setTimeout(() => {
    if (document.body.contains(drizzleContainer)) {
      document.body.removeChild(drizzleContainer);
    }
  }, 2000);
};
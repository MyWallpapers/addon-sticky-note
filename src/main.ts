import type { CanvasAddonMountContext } from "../generated/mywallpaper-runtime";
import { card, el } from "./ui";
import "./style.css";
export function mount(context: CanvasAddonMountContext) {
  const view = card(context, "Note"),
    text = el("div", "", "note");
  view.body.append(text);
  const render = (values: ReturnType<typeof context.layer.settings.get>) => {
    view.header.textContent = String(values.title || "Note");
    text.textContent = String(values.text ?? "");
    view.section.style.boxShadow =
      "0 20px 45px #0004,inset 0 1px 0 " +
      String(values.accent ?? "#b3c3a9") +
      "50";
    view.caption.textContent = "Une pensée, simplement.";
  };
  render(context.layer.settings.get());
  const stop = context.layer.settings.subscribe(render);
  return () => {
    stop();
    view.section.remove();
  };
}

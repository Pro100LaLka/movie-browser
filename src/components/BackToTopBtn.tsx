import { useEffect, useState } from "react";
import clsx from "clsx";

function BackToTopBtn() {
  const [visible, setVisible] = useState(false);

  function scrollUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={scrollUp}
      tabIndex={-1}
      className={clsx(
        "text-on-primary bg-primary hover:bg-primary-hover active:bg-primary-active fixed right-8 bottom-8 z-100 size-15 rounded-full text-3xl shadow-[0_0_10px] shadow-black transition-opacity duration-200",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      &uarr;
    </button>
  );
}

export default BackToTopBtn;

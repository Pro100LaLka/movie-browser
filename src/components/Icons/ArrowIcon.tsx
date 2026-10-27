const rotateAngles = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
};

function ArrowIcon({
  direction,
}: {
  direction: "right" | "left" | "up" | "down";
}) {
  return (
    <svg
      style={{ rotate: `${rotateAngles[direction]}deg` }}
      className="size-[1.15em] text-inherit"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 640"
    >
      <path d="M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z" />
    </svg>
  );
}

export default ArrowIcon;

export function HomeBackground() {
  return (
    <div className="">
      <div className="bg-background absolute inset-0 -z-30 size-full"></div>

      <img
        src="https://image.tmdb.org/t/p/original/qeQJx07rK2xm8SD2sJxFKhE7gs0.jpg"
        alt="hero poster"
        className="absolute -top-1/5 right-0 -z-20 w-4/5"
      />

      <div className="from-background absolute inset-0 -z-10 size-full bg-linear-to-t from-45% to-transparent to-70%"></div>
      <div className="from-background absolute inset-0 -z-10 size-full bg-linear-to-tr from-45% to-transparent to-70%"></div>
      <div className="from-background absolute inset-0 -z-10 size-full bg-linear-110 from-20% to-transparent to-40%"></div>
    </div>
  );
}

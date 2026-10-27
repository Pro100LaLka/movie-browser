function LoadingDotsIcon() {
  return (
    <div className="flex gap-1">
      <div className="bg-foreground animate-loading-dot size-1.5 rounded-full brightness-25"></div>
      <div className="bg-foreground animate-loading-dot size-1.5 rounded-full brightness-25 [animation-delay:0.15s]"></div>
      <div className="bg-foreground animate-loading-dot size-1.5 rounded-full brightness-25 [animation-delay:0.3s]"></div>
    </div>
  );
}

export default LoadingDotsIcon;

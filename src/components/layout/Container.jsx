
function Container({
  children,
  as: Component = "div",
  size = "xl",
  className = "",
  ...props
}) {
  const sizes = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-none",
  };

  const containerSize = sizes[size] ?? sizes.xl;

  const classes = [
    "mx-auto w-full px-4 sm:px-6 lg:px-8",
    containerSize,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

export default Container;

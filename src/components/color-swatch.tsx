interface Props {
  color: string;
}

const ColorSwatch = ({ color, ...props }: Props) => {
  return (
    <div
      className="h-96 w-96"
      {...props}
      style={{ backgroundColor: '#' + color }}
    />
  );
};

export default ColorSwatch;

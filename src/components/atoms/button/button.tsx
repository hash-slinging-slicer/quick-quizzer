export interface ButtonProps {
  warna: string;
  teks: string;
  onClick: () => void;
}

const Button = (props: ButtonProps): JSX.Element => {
  const { warna, teks, onClick } = props;
  return (
    <>
      <button
        className={`flex-1 p-3 rounded-md ${warna} text-gray-600 mx-2`}
        onClick={onClick}
      >
        {teks}
      </button>
    </>
  );
};

export default Button;

interface SubmitButtonProps {
  buttonText: string;
  onSubmit: (e: React.SyntheticEvent) => void;
}

export default function SubmitButton({
  buttonText,
  onSubmit,
}: SubmitButtonProps) {
  return (
    <button
      onClick={onSubmit}
      type="submit"
      className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
    >
      {buttonText}
    </button>
  );
}

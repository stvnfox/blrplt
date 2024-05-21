import { WaitingListFormFieldProps } from "@/types/form";

const FormField: React.FC<WaitingListFormFieldProps> = ({
    type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber,
}) => (
    <>
        <input
            type={type}
            placeholder={placeholder}
            {...register(name, { valueAsNumber })}
        />
        {error && <span className="error-message">{error.message}</span>}
    </>
);
export default FormField;
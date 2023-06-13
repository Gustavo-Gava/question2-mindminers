import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, errorMessage, name, ...rest }, ref) => {
		return (
			<div className="w-full">
				<label htmlFor={name} className="text-base font-semibold">
					{label}
				</label>

				<div className="w-full border-2 border-gray-950 p-1 px-2 shadow-sm">
					<input className="w-full outline-none" id={name} name={name} ref={ref} {...rest} />
				</div>

				{errorMessage && <p className="text-red-600">{errorMessage}</p>}
			</div>
		);
	}
);

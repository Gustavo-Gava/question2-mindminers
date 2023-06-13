import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	errorMessage?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, InputProps>(
	({ label, errorMessage, name, placeholder, ...rest }, ref) => {
		return (
			<div className="w-full">
				<label htmlFor={name} className="text-base font-semibold">
					{label}
				</label>

				<div className="flex w-full gap-2">
					<input
						className="outline-none"
						type="checkbox"
						id={name}
						name={name}
						ref={ref}
						{...rest}
					/>

					<span>{placeholder}</span>
				</div>

				{errorMessage && <p className="text-red-600">{errorMessage}</p>}
			</div>
		);
	}
);

import * as yup from "yup";
import { Input } from "./components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { Checkbox } from "./components/Checkbox";

const schema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email().required(),
	message: yup.string().required(),
	checkbox: yup.boolean().required(),
});

type FormData = yup.InferType<typeof schema>;

export const Form = () => {
	const [submitted, setSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState(false);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: FormData) => {
		try {
			await axios.post("/some-url", data);

			setSubmitError(false);
			setSubmitted(true);
		} catch (error) {
			setSubmitError(true);
		}
	};

	if (submitError) {
		return (
			<div className="m-auto max-w-lg">
				<div>Erro ao enviar o formulário, tente novamente mais tarde.</div>
			</div>
		);
	}

	if (submitted) {
		return (
			<div className="m-auto max-w-lg">
				<div>Formulário enviado com sucesso!</div>
			</div>
		);
	}

	return (
		<div className="m-auto max-w-lg">
			<h1>Form</h1>

			<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
				<Input
					label="Name"
					placeholder="Digite seu nome aqui..."
					errorMessage={errors.name?.message}
					{...register("name")}
				/>

				<Input
					label="Email"
					placeholder="Digite seu email aqui..."
					errorMessage={errors.email?.message}
					{...register("email")}
				/>

				<Input
					label="Message"
					placeholder="Digite sua mensagem aqui..."
					errorMessage={errors.message?.message}
					{...register("message")}
				/>

				<Checkbox
					label="Checkbox"
					type="checkbox"
					placeholder="Você concorda em receber nossos emails?"
					errorMessage={errors.checkbox?.message}
					{...register("checkbox")}
				/>

				<button type="submit" className="mt-2 bg-blue-500 py-1 font-semibold text-white shadow-sm ">
					Enviar
				</button>
			</form>
		</div>
	);
};
